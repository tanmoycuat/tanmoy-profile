# Tanmoy Santra — Profile

A dependency-free personal profile site built from the supplied CV. It can be deployed directly to GitHub Pages, Vercel, or Cloudflare Pages.

## Preview locally

Open `index.html` directly in a browser, or serve the folder with any static web server.

## Deploy

### GitHub Pages

1. Push this folder to a GitHub repository.
2. Open **Settings → Pages**.
3. Set the source to **Deploy from a branch**, choose the main branch and `/ (root)`.

### Vercel

Import the repository and select **Other** as the framework preset. No build command or output directory is required.

### Cloudflare Pages

Connect the repository, leave the build command empty, and set the output directory to `/`.

## Update content

- Profile copy and project details: `index.html`
- Visual design: `styles.css`
- CV file: replace `Tanmoy_Stockholm_V4_1.pdf` and update its filename in `index.html` if needed