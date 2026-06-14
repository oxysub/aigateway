# SEO & Google Search Console — aigateway.my

Guide to verify the site with Google and submit the sitemap. **You must complete the Search Console steps yourself** (Google login required).

---

## What is already in the repo

| Item | URL / location |
|------|----------------|
| Sitemap | `https://aigateway.my/sitemap.xml` |
| Robots | `https://aigateway.my/robots.txt` |
| Structured data | Organization + WebSite JSON-LD in `components/seo/JsonLd.tsx` |
| Page metadata | `app/layout.tsx` + per-page `metadata` exports |
| Canonical base | `metadataBase` → `https://aigateway.my` |

### Pages in sitemap

- `/` (home)
- `/about`
- `/oil-gas`
- `/staff-augmentation`
- `/training`

---

## Step 1 — Deploy SEO changes

After code changes, deploy to FastComet:

```bash
make deploy MSG="Add SEO sitemap, robots, structured data"
# cPanel → Node.js App → RESTART
```

Verify these load in a browser:

- https://aigateway.my/sitemap.xml
- https://aigateway.my/robots.txt

---

## Step 2 — Add property in Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console)
2. Click **Add property**
3. Choose **URL prefix**: `https://aigateway.my`
4. Click **Continue**

---

## Step 3 — Verify ownership (HTML tag — recommended)

1. In Search Console, select **HTML tag** verification
2. Copy the `content` value from the meta tag, e.g.:
   ```html
   <meta name="google-site-verification" content="ABC123xyz..." />
   ```
3. Add to **cPanel → Node.js App → Environment variables**:
   ```
   GOOGLE_SITE_VERIFICATION=ABC123xyz...
   ```
4. Restart the Node.js app in cPanel
5. Click **Verify** in Search Console

**Alternative methods** (if HTML tag fails):

- **DNS TXT record** — add via FastComet/cPanel DNS for `aigateway.my`
- **HTML file upload** — upload Google's file to `public/` and redeploy

---

## Step 4 — Submit sitemap

1. Search Console → **Sitemaps** (left menu)
2. Enter: `sitemap.xml`
3. Click **Submit**

Full URL submitted: `https://aigateway.my/sitemap.xml`

---

## Step 5 — Request indexing (optional, speeds up first crawl)

1. Search Console → **URL inspection**
2. Enter `https://aigateway.my`
3. Click **Request indexing**
4. Repeat for key pages:
   - `https://aigateway.my/oil-gas`
   - `https://aigateway.my/about`
   - `https://aigateway.my/staff-augmentation`
   - `https://aigateway.my/training`

---

## Step 6 — Bing Webmaster Tools (optional)

1. [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site `https://aigateway.my`
3. Import from Google Search Console (easiest) or verify separately
4. Submit the same sitemap URL

---

## Ongoing SEO checklist

- [ ] `GOOGLE_SITE_VERIFICATION` set in cPanel env vars
- [ ] Sitemap submitted and status **Success**
- [ ] No crawl errors in Search Console → **Pages**
- [ ] Contact form SMTP configured (`SMTP_*` env vars) for lead capture
- [ ] Redeploy and re-request indexing after major content changes

---

## Target keywords (configured in `lib/constants.ts`)

Primary focus:

- Enterprise AI Malaysia
- Industrial IoT Malaysia
- Oil & Gas digital transformation
- Predictive maintenance
- HSE / safety management systems
- AI readiness assessment
- Petronas vendor technology
- IT staff augmentation Malaysia

---

## Support contacts

| Item | Value |
|------|--------|
| Site | https://aigateway.my |
| Company | AI Gateway Sdn Bhd |
| Email | subra@aigateway.my |

---

*Last updated: June 2026*
