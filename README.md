# PhytoScan — AI setup

The app now does two readings per photo:

1. **Local pixel heuristic** (unchanged) — runs entirely in the browser, always works, needs no setup.
2. **AI vision reading** — calls `/api/diagnose`, a serverless function that forwards the photo to Claude. This is what makes the description text vary naturally between scans instead of repeating the same four fixed sentences, and gives a second, more visually-grounded opinion than color/shape alone.

If the AI call fails or times out for any reason (no connection, rate limit, cold region, etc.), the app **silently falls back to the pixel heuristic alone** — nothing breaks, the user just doesn't notice a difference.

## Deploying (Vercel)

1. Push this folder to a GitHub repo.
2. Import the repo in Vercel ("Add New Project").
3. In Project Settings → Environment Variables, add:
   ```
   ANTHROPIC_API_KEY = sk-ant-...
   ```
   Get a key from https://console.anthropic.com/settings/keys — **never** put this key in `app.js`, `index.html`, or anything that ships to the browser.
4. Deploy. Vercel auto-detects `/api/diagnose.js` as a serverless function — no extra config needed for a static site like this one.

`fetch('/api/diagnose')` in `app.js` works as-is on Vercel because the function is served from the same domain as the site.

## Deploying elsewhere

- **Netlify**: move `api/diagnose.js` to `netlify/functions/diagnose.js`, adapt the handler signature (see the comment at the bottom of the file), and change the fetch URL in `app.js` to `/.netlify/functions/diagnose`.
- **Cloudflare Pages/Workers**: adapt to the Workers `fetch(request, env)` signature (see the comment at the bottom of the file) and bind `ANTHROPIC_API_KEY` as a Worker secret.

## Important — before this is publicly reachable

- **Rate limit the endpoint.** Right now anyone who finds `/api/diagnose` could hammer it and run up your API bill. Vercel/Cloudflare both offer easy rate limiting (e.g. Vercel Firewall rules, or a simple IP-based counter using KV/Upstash). Do this before sharing the link widely.
- **Don't advertise a specific accuracy percentage.** Confidence scores shown per-scan are the model's own estimate for that photo, not a validated accuracy rate for the tool as a whole — nobody has measured this against a labeled dataset of confirmed diagnoses. The existing "Field Notes" section already frames this as a heuristic aid, not a clinical diagnosis — keep that framing intact.
- **Cost**: each scan now costs one API call (a small image + short response). Budget accordingly if this gets real traffic.

## Leaf-only detection

Every scan is checked first: `/api/diagnose` returns `{ "isLeaf": false }` when the photo isn't a leaf, and the app shows "No leaf detected. Please scan a leaf…" (EN/TL) instead of a diagnosis. Non-leaf scans are not saved to Scan History.

If the AI endpoint can't be reached, the app falls back to a loose green-pixel check so obviously non-plant photos are still rejected.
