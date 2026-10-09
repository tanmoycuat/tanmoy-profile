# Tanmoy Santra — Profile

A dependency-free personal portfolio site, redesigned with a flip-card hero,
filterable projects, a grouped tech stack, and a contact form. It can be
deployed directly to Cloudflare Pages, GitHub Pages, or Vercel.

## Structure

- Flip-card hero with monogram, social links, and a rotating tagline
- About and principles
- Experience timeline
- Filterable Projects grid (All / AI Agents / Data Platform / Automation / Document Intelligence)
- Training & Enablement
- Tech Stack grouped into category cards
- Education
- Contact form (opens a pre-filled email — no backend required)

## Preview locally

Open `index.html` directly in a browser, or serve the folder with any static
web server, for example:

```powershell
python -m http.server 8080
```

Then visit http://localhost:8080.

## Deploy to Cloudflare Pages (git-connected)

1. Push this repository to GitHub (already configured as `origin`).
2. In the [Cloudflare dashboard](https://dash.cloudflare.com/0911d60aecd437bc6b1ede64d946318a/workers-and-pages),
   go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the `tanmoy-profile` repository and the `main` branch.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
5. Click **Save and Deploy**. Every push to `main` then triggers an automatic deploy.

Security and caching headers are configured in [`_headers`](./_headers).

## Other hosts

### GitHub Pages
Settings → Pages → Deploy from a branch → `main` / `root`.

### Vercel
Import the repository, framework preset **Other**, no build command or output directory.

## Update content

- Copy, stack, education: `index.html`
- Visual design: `styles.css`
- Interactions (flip card, filters, rotating text, form): `script.js`

### Add a project later

Projects and their filter pills are generated from the `PROJECTS` array in
[`script.js`](./script.js) — no HTML editing required. To add one, append an
object like this:

```js
{
  type: "Short label shown above the title",
  title: "Project name",
  description: "One or two sentences describing the work and impact.",
  categories: ["ai-agents", "automation"], // keys from the CATEGORIES map
  tags: ["Tool", "Tool", "Tool"],
}
```

Filter pills appear automatically for every category used by at least one
project. To introduce a brand-new category, add a key/label to the
`CATEGORIES` map above the array, then reference that key in a project's
`categories`.