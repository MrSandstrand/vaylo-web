// Vaylo lead intake: validates, stores in Supabase, optionally emails a notification.
const ROLES = ["Homeowner","Plumber","Property / HOA","Student housing","Insurer","Distributor","Investor","Other"];
const clip = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const crypto = require("crypto");
const { welcomeEmail } = require("./_welcome");
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false }); }
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: pretend success for bots

  const lead = {
    kind: clip(b.message, 4000) ? "inquiry" : "signup",
    role: ROLES.includes(b.role) ? b.role : "Other",
    name: clip(b.name, 120),
    email: clip(b.email, 200).toLowerCase(),
    zip: clip(b.zip, 12) || null,
    org: clip(b.org, 160) || null,
    message: clip(b.message, 4000) || null,
    consent: b.consent === true,
    source: clip(b.source, 200) || "direct",
    page: clip(b.page, 300) || null,
    confirm_token: crypto.randomUUID(),
  };
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || !lead.consent) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_PUBLISHABLE_KEY;
  try {
    const r = await fetch(url + "/rest/v1/leads", {
      method: "POST",
      headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(lead),
    });
    if (!r.ok) { console.error("supabase", r.status, await r.text()); return res.status(502).json({ ok: false }); }
  } catch (e) { console.error("supabase", e); return res.status(502).json({ ok: false }); }

  // E-mails via Resend: internal notification + welcome/confirmation to the person who signed up.
  if (process.env.RESEND_API_KEY) {
    const from = process.env.NOTIFY_FROM || "Vaylo <noreply@getvaylo.io>";
    const send = body => fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(async r => { if (!r.ok) console.error("resend", r.status, await r.text()); }).catch(e => console.error("resend", e));
    const jobs = [];
    if (process.env.NOTIFY_TO) {
      const rows = [["Role", lead.role], ["Name", lead.name], ["Email", lead.email], ["ZIP", lead.zip], ["Company", lead.org], ["Message", lead.message], ["Source", lead.source]]
        .filter(r => r[1]).map(r => `<tr><td style="padding:4px 12px 4px 0;color:#4E6273">${r[0]}</td><td style="padding:4px 0">${esc(r[1])}</td></tr>`).join("");
      jobs.push(send({
        from, to: process.env.NOTIFY_TO.split(",").map(s => s.trim()), reply_to: lead.email,
        subject: `New Vaylo ${lead.kind}: ${lead.role} – ${lead.name}`,
        html: `<p style="font-family:Arial,sans-serif">New ${lead.kind} from getvaylo.io</p><table style="font-family:Arial,sans-serif;font-size:14px">${rows}</table>`,
      }));
    }
    const base = process.env.SITE_URL || "https://getvaylo.io";
    const w = welcomeEmail({ name: lead.name, role: lead.role, confirmUrl: `${base}/api/confirm?t=${lead.confirm_token}` });
    jobs.push(send({ from, to: [lead.email], reply_to: process.env.REPLY_TO || "hello@getvaylo.io", subject: w.subject, html: w.html, text: w.text }));
    await Promise.all(jobs);
  }
  return res.status(200).json({ ok: true });
};
