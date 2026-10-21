# Leonard E. Moore — Software & Product Portfolio

[**View the live portfolio**](https://mooreliving777.github.io/leonard-moore-portfolio/)

A responsive, public-safe software engineering and product-development portfolio built with HTML, CSS, and vanilla JavaScript. Its black, midnight-navy, and gold visual style reflects Leonard E. Moore's brand.

## Featured work

**Leonard E. Moore Business Command Center** is a separately maintained **private** Node.js / Express / SQLite application for small-business operations. This site describes its verified architecture, lead → project → tasks → invoice → recorded-payment workflow, authentication and organization boundaries, and tests. It does **not** publish the private source code, database, or credentials. The payment-recording functionality does not collect or process online payments.

**Code Comprehension Lab** in `samples/` is a separate, clearly labeled **educational** JavaScript exercise created with AI assistance; it is not copied from the private application. Run its seven dependency-free tests with:

```bash
node --test samples/invoice.test.mjs
```

## Local preview

Open `index.html` in a browser, or use `python -m http.server 8000` and visit `http://localhost:8000`. There is no backend or build step.

## Publishing

GitHub Pages is configured to deploy this repository's `main` branch from `/ (root)`. Publication and cache propagation may take time after a push. See the repository's Actions tab for the latest build status.

## Boundaries

- Dashboard visualization: illustrative UI and representative numbers, not business records.
- Private Command Center source: **not included**.
- The site does not claim production SaaS readiness or affiliation with Google.
- Contact email is public on the website by the account owner's request.
- Project engineering facts were checked against the private Command Center `main` branch on October 20, 2026.

© 2026 Leonard E. Moore.
