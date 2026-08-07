# AHS Zone — Website

The official website for **AHS Zone**, a Bangladesh-based holding company.
Built as a single, dependency-free static site (plain HTML + CSS + a little JS) so it
is cheap to host (free on GitHub Pages) and easy to edit without a build step.

Live site: https://<your-username>.github.io/ahs-zone/  (set after first deploy)
Custom domain (later): ahs-zone.com

---

## Project structure

```
ahs-zone/
├── index.html              # The entire website (content + styles + scripts)
├── assets/
│   └── logo.png            # Brand logo used in header and footer
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deploys to GitHub Pages on every push to main
├── .gitignore
└── README.md               # This file
```

Everything lives in `index.html`. There is **no build step, no frameworks, no npm**.
To change the site, you edit `index.html` (and drop new images in `assets/`).

---

## How to edit the website

Open `index.html` in any text editor (VS Code, Notepad++, even Notepad). The file is
organised into clearly labelled sections. Search for these markers to find what you want:

| You want to change…            | Search for this comment / text                          |
|--------------------------------|----------------------------------------------------------|
| Top navigation links           | `<!-- ===== NAV =====` or `<nav class="links">`         |
| Hero headline / sub-text       | `class="cover-title"` / `class="cover-sub"`             |
| The "Founded / Mandate / Now"  | `class="cover-meta"`                                    |
| About the Group section        | `id="about-group"`                                       |
| Companies list                | `id="companies"` (cards with `company-card`)            |
| News & Updates                | `id="news"`                                              |
| Contact form email            | `ahszone.info@gmail.com`                                |
| Colours / fonts               | `:root{` near the top of the `<style>` block            |

After editing, commit and push (see "Updating after publish" below). The site
redeploys automatically within ~30–60 seconds.

### Logo
The logo is `assets/logo.png`. Replace that file (same name) to swap the logo.
It is placed with `mix-blend-mode: multiply` so its white background disappears into
the beige page. If you ever add a dark section, give the logo a transparent background
instead, or it will vanish.

---

## Contact form (free, sends to your Gmail)

The form currently points at Formspree (free tier) and falls back to opening the
visitor's email app if Formspree isn't configured yet. It sends to **ahszone.info@gmail.com**.

To activate real delivery (no purchase needed):

1. Go to https://formspree.io and sign up (free).
2. Create a new form. Set the **destination email** to `ahszone.info@gmail.com` and verify it.
3. Formspree gives you an ID that looks like `xxyyzzzz`.
4. In `index.html`, find:
   `action="https://formspree.io/f/YOUR_FORM_ID"`
   and replace `YOUR_FORM_ID` with your real ID.
5. Commit and push.

That's it — submissions now arrive in your Gmail inbox. (Free tier: ~50/month.)

Alternative free services: getform.io, or just leave the mailto fallback as-is.

---

## Deploying to GitHub Pages

Deployment is automatic via the workflow in `.github/workflows/deploy.yml`.
You only need to do the one-time setup below.

### One-time setup
1. Create a GitHub repo named exactly `ahs-zone`.
2. Push this project to it (see commands below).
3. In the repo: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
4. Wait ~1 minute. The site goes live at `https://<username>.github.io/ahs-zone/`.

### Connect a custom domain later (ahs-zone.com) — no rebuild needed
The site is deployed with GitHub Actions, so the domain is a *setting*, not baked into
the code. You can change it any time without touching the project:

1. Buy `ahs-zone.com` from any registrar (Namecheap, Google Domains reseller, Cloudflare, etc.).
   You do NOT need to do this now.
2. In the repo: **Settings → Pages → Custom domain**, type `ahs-zone.com`, and Save.
   GitHub will show it as "unverified" until DNS is pointed (normal).
3. In your domain registrar's DNS settings, add these records:
   - **A records** (apex domain) pointing to GitHub Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** for `www` → `<username>.github.io`
4. Wait for DNS to propagate (minutes to 48h) and for GitHub to issue the free
   SSL certificate (a few hours). GitHub adds/commits a `CNAME` file automatically.
5. Done. The site now serves at `https://ahs-zone.com`. No code changes required.

(You can instead use Cloudflare for the domain and set SSL to "Full".)

---

## Updating the website after it is published

From a terminal in this folder:

```bash
# 1. make your edits to index.html (and/or assets/)

# 2. save, then commit
git add .
git commit -m "Describe your change"

# 3. push — this triggers the automatic redeploy
git push origin main
```

Within ~30–60 seconds the live site reflects your change. You can watch the deploy
progress under the repo's **Actions** tab.

If you prefer a visual tool, install **GitHub Desktop**, clone the repo, edit
`index.html`, and click **Commit → Push**. Same result.

---

## Local preview

No server required, but to preview like the live site:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

---

## Notes / things you may want later
- **Real stats:** the "200+ students / 15 countries" figures read against "Founded 2026".
  Either keep them (if they reflect prior work) or soften the wording.
- **More companies:** add a new `<div class="company-card">…</div>` inside `id="companies"`.
- **Blog/News:** add a new `<div class="clause">…</div>` inside `id="news"`.
