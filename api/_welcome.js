// Welcome / waitlist confirmation e-mail. Table layout + inline styles for Gmail, Outlook and Apple Mail.
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const SITE = "https://getvaylo.io";
const PRO_ROLES = { "Plumber": "plumber", "Property / HOA": "property manager", "Student housing": "housing operator", "Insurer": "insurer", "Distributor": "distributor", "Investor": "investor" };

function welcomeEmail({ name, role, confirmUrl }) {
  const first = esc((name || "").trim().split(/\s+/)[0] || "there");
  const pro = PRO_ROLES[role];
  const proLine = pro
    ? `<tr><td style="padding:0 40px 8px"><p style="margin:0;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:#4E6273">As a ${pro}, you'll also hear from us personally. We'd love to understand what you need from Vaylo.</p></td></tr>`
    : "";
  const row = (n, title, text) => `
    <tr><td style="padding:0 0 18px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
        <td width="44" valign="top" style="padding-top:1px"><div style="width:30px;height:30px;border-radius:15px;background:#E3ECF8;color:#2A73C9;font:700 13px/30px Arial,Helvetica,sans-serif;text-align:center">${n}</div></td>
        <td valign="top"><p style="margin:0 0 2px;font:700 16px/1.4 Arial,Helvetica,sans-serif;color:#13263A">${title}</p><p style="margin:0;font:400 15px/1.55 Arial,Helvetica,sans-serif;color:#4E6273">${text}</p></td>
      </tr></table>
    </td></tr>`;

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<title>You're on the Vaylo list</title>
<style>@media (max-width:620px){.wrap{width:100%!important}.px{padding-left:24px!important;padding-right:24px!important}.h1{font-size:30px!important}}</style>
</head>
<body style="margin:0;padding:0;background:#FAF8F4">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">You're in. One more tap to get sneak peeks while you wait.&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAF8F4"><tr><td align="center" style="padding:28px 12px 40px">
<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#FFFFFF;border-radius:20px;overflow:hidden">

  <tr><td class="px" style="padding:28px 40px 22px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td><a href="${SITE}" style="text-decoration:none"><img src="${SITE}/img/email-logo.png" width="110" height="32" alt="Vaylo" style="display:block;border:0;width:110px;height:auto"></a></td>
      <td align="right"><span style="display:inline-block;padding:6px 12px;border-radius:999px;background:#F7F2EA;font:700 11px/1 Arial,Helvetica,sans-serif;letter-spacing:1.6px;color:#B08D57;text-transform:uppercase">Early access</span></td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:0 16px"><a href="${SITE}"><img src="${SITE}/img/email-hero.jpg" width="568" alt="A mother laughing with her toddler at bath time" style="display:block;width:100%;max-width:568px;height:auto;border:0;border-radius:14px"></a></td></tr>

  <tr><td class="px" style="padding:32px 40px 8px">
    <p style="margin:0 0 10px;font:700 12px/1 Arial,Helvetica,sans-serif;letter-spacing:2px;color:#B08D57;text-transform:uppercase">You're on the list</p>
    <h1 class="h1" style="margin:0 0 14px;font:800 34px/1.12 Arial,Helvetica,sans-serif;letter-spacing:-0.5px;color:#13263A">Welcome, ${first}.<br>Splashing is allowed. Floods are not.</h1>
    <p style="margin:0 0 8px;font:400 16px/1.6 Arial,Helvetica,sans-serif;color:#4E6273">Thanks for joining Vaylo early access. You're in line for the first units when we launch in 2027, starting in Florida. You'll hear from us before anyone else.</p>
  </td></tr>
  ${proLine}

  <tr><td class="px" style="padding:20px 40px 8px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#13263A;border-radius:16px"><tr><td style="padding:26px 26px 28px">
      <p style="margin:0 0 6px;font:700 12px/1 Arial,Helvetica,sans-serif;letter-spacing:2px;color:#CDB9A6;text-transform:uppercase">One more tap</p>
      <p style="margin:0 0 8px;font:700 20px/1.3 Arial,Helvetica,sans-serif;color:#FFFFFF">Want sneak peeks while you wait?</p>
      <p style="margin:0 0 20px;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:#C9D3DE">Product news, behind-the-scenes and early-bird offers. A handful of emails before launch. No spam, unsubscribe anytime.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:999px;background:#5FA3F0">
        <a href="${esc(confirmUrl)}" style="display:inline-block;padding:15px 28px;font:700 14px/1 Arial,Helvetica,sans-serif;letter-spacing:1px;color:#0E1A24;text-decoration:none;border-radius:999px">YES, KEEP ME POSTED &rarr;</a>
      </td></tr></table>
      <p style="margin:14px 0 0;font:400 13px/1.5 Arial,Helvetica,sans-serif;color:#93A1B3">Skip it and we'll only email you about your early-access spot.</p>
    </td></tr></table>
  </td></tr>

  <tr><td class="px" style="padding:34px 40px 6px">
    <p style="margin:0 0 6px;font:700 12px/1 Arial,Helvetica,sans-serif;letter-spacing:2px;color:#B08D57;text-transform:uppercase">A little teaser</p>
    <p style="margin:0 0 22px;font:800 24px/1.2 Arial,Helvetica,sans-serif;color:#13263A">Physical AI that knows your home.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${row(1, "Learns what normal looks like", "A long shower is fine. A slow leak under the sink is not. Vaylo knows the difference, room by room.")}
      ${row(2, "Asks before it acts", "A friendly ping first. If nobody answers and the water keeps coming, the main valve closes in seconds.")}
      ${row(3, "Works with what you already use", "Alexa, Google Home, Apple Home and SmartThings. Protection runs locally, even when the internet is down.")}
    </table>
  </td></tr>

  <tr><td style="padding:4px 16px 0"><img src="${SITE}/img/email-kit.jpg" width="568" alt="The Vaylo Control Unit, Smart Valve and sensors" style="display:block;width:100%;max-width:568px;height:auto;border:0;border-radius:14px"></td></tr>

  <tr><td class="px" align="center" style="padding:28px 40px 36px">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:999px;border:1.5px solid #13263A">
      <a href="${SITE}/?utm_source=welcome-email&amp;utm_medium=email" style="display:inline-block;padding:14px 26px;font:700 14px/1 Arial,Helvetica,sans-serif;letter-spacing:1px;color:#13263A;text-decoration:none;border-radius:999px">EXPLORE GETVAYLO.IO</a>
    </td></tr></table>
    <p style="margin:18px 0 0;font:400 14px/1.6 Arial,Helvetica,sans-serif;color:#4E6273">Questions? Just reply to this email.</p>
  </td></tr>

</table>

<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px"><tr><td class="px" style="padding:24px 40px 0;text-align:center">
  <p style="margin:0 0 6px;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:#8A949B">Vaylo&trade; &middot; Water peace of mind &middot; made by Gorilla Forge</p>
  <p style="margin:0;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:#8A949B">You're getting this because you signed up for early access at getvaylo.io. Didn't sign up? Ignore this email and you won't hear from us. <a href="${SITE}/privacy" style="color:#8A949B">Privacy</a></p>
</td></tr></table>

</td></tr></table>
</body></html>`;

  const text = `Welcome, ${(name || "").trim().split(/\s+/)[0] || "there"}. You're on the Vaylo list.

Thanks for joining Vaylo early access. You're in line for the first units when we launch in 2027, starting in Florida.
${pro ? `\nAs a ${pro}, you'll also hear from us personally.\n` : ""}
ONE MORE TAP: want sneak peeks while you wait? Product news, behind-the-scenes and early-bird offers. No spam.
Yes, keep me posted: ${confirmUrl}

A little teaser: physical AI that knows your home.
1. Learns what normal looks like. A long shower is fine. A slow leak is not.
2. Asks before it acts. If nobody answers, the main valve closes in seconds.
3. Works with Alexa, Google Home, Apple Home and SmartThings. Runs locally, even offline.

Explore: ${SITE}
Questions? Just reply to this email.

You're getting this because you signed up at getvaylo.io. Didn't sign up? Ignore this email.`;

  return { subject: "You're on the list 💧 One more tap?", html, text };
}

module.exports = { welcomeEmail };
