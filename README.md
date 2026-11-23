# Vaylo website (getvaylo.io)

Static site + one serverless function, hosted on Vercel.

- `index.html` – the site. `privacy.html` – privacy page.
- `img/` – all images. To swap a product photo, replace the file with the same name (keep transparent PNG/WebP for cut-outs).
- `api/lead.js` – early-access / inquiry form. Saves to Supabase table `leads` (project `vaylo-web`) and, if configured, emails a notification via Resend.

## Environment variables (Vercel → Project → Settings → Environment Variables)
- `SUPABASE_URL` – https://sikriqmzltsymwbwkccr.supabase.co
- `SUPABASE_PUBLISHABLE_KEY` – publishable key (insert-only via RLS)
- `RESEND_API_KEY` – optional, enables email notifications
- `NOTIFY_TO` – e.g. cato.sandstrand@getvaylo.io (comma-separate several)
- `NOTIFY_FROM` – e.g. Vaylo <noreply@getvaylo.io> (domain must be verified in Resend)

## Reading leads
Supabase dashboard → project `vaylo-web` → Table editor → `leads`. Set `status` to contacted/closed as you follow up.
