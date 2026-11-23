// Newsletter double opt-in: /api/confirm?t=<token> marks the lead as opted in, then redirects to a thank-you page.
module.exports = async (req, res) => {
  const t = String((req.query && req.query.t) || "");
  const ok = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(t);
  let confirmed = false;
  if (ok) {
    const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_PUBLISHABLE_KEY;
    try {
      const r = await fetch(url + "/rest/v1/rpc/confirm_newsletter", {
        method: "POST",
        headers: { apikey: key, Authorization: "Bearer " + key, "Content-Type": "application/json" },
        body: JSON.stringify({ p_token: t }),
      });
      confirmed = r.ok && (await r.json()) === true;
      if (!r.ok) console.error("confirm", r.status, await r.text());
    } catch (e) { console.error("confirm", e); }
  }
  res.setHeader("Cache-Control", "no-store");
  res.writeHead(303, { Location: confirmed ? "/confirmed" : "/confirmed?e=1" });
  res.end();
};
