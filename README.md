# Change — change4u.in

Static site for **Change**, a wellness wash brand for boys. Plain HTML/CSS/JS — no build step, no framework. Ready to push straight to GitHub and deploy.

## File structure

```
/
├── index.html              Homepage
├── shop.html                All products
├── about.html                Brand story / values
├── account.html              Login / signup (front-end only)
├── cart.html                 Cart (localStorage-based demo)
├── contact.html               Contact form
├── privacy-policy.html        Placeholder legal copy
├── terms-of-service.html      Placeholder legal copy
├── css/style.css              All styling (single stylesheet)
├── js/main.js                 Mobile nav, cart logic, forms
└── assets/                    Logo + favicons
```

## Deploying to GitHub Pages

1. Create a new repo, add these files, push to `main`.
2. Repo → **Settings → Pages** → Source: `main` branch, `/ (root)`.
3. Once it's live, go to **Settings → Pages → Custom domain**, enter `change4u.in`, and add these DNS records at your domain registrar:
   - `A` records for the apex domain pointing to GitHub's IPs (185.199.108.153, .109.153, .110.153, .111.153)
   - or a `CNAME` record for `www` pointing to `yourusername.github.io`
4. Check "Enforce HTTPS" once the certificate provisions (can take a few hours).

## Things to know before you launch

- **Product photography is missing.** The original design referenced local image files (hero-product, face-wash, toner, serum, moisturizer, brand-story) that weren't included in what you sent me — only the HTML markup and two logo files were uploaded. I've used clean icon-based placeholders in your brand color so nothing looks broken, but you'll want to drop real product photos into `assets/` and swap the `<div class="ph">...</div>` placeholder blocks for `<img>` tags (the CSS classes `.product-media img.real` are already set up for this).
- **The full wordmark logo has a typo.** `chnage_fullo_logo.jpg` reads "CHNAGE" instead of "CHANGE" — I didn't use it anywhere live on the site. I used your icon mark (the arrow "C") next to real "CHANGE" text instead, matching how the original design actually worked (it rendered "CHANGE" as styled text, not as an image). The original file is still saved at `assets/change-wordmark-original.png` in case you want it for anything, but I'd get a corrected version made before using it publicly.
- **Cart, login, and checkout are front-end demos.** Adding to cart works and persists via `localStorage`, and the cart page is fully functional (quantity, remove, totals). Login/signup/checkout show a placeholder alert since there's no backend — you'll need something like Shopify, a headless commerce API, or a custom backend to actually process orders and payments.
- **Privacy Policy / Terms** are placeholder legal text — have a professional review them before publishing.
- Colors, fonts (Poppins + Montserrat), spacing, and copy are matched to your original build exactly.
