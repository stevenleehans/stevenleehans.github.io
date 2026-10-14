# Hans Lee Portfolio

Personal portfolio for [stevenleehans.github.io](https://stevenleehans.github.io/), built with HTML, CSS and JavaScript for GitHub Pages.

The site includes an introduction, professional experience and education, competition achievements, seven selected projects, and contact links. Project search and category filters run in the browser. No analytics, account system or backend is required.

## Local preview

Run a static HTTP server from this directory, then open its local address in a browser.

```sh
python3 -m http.server 8080
```

## Updating content

- Edit profile, experience, achievements and project descriptions in `index.html`.
- Edit colours and layout in `styles.css`.
- Project cards use `data-category` and `data-search` attributes for filtering.
- Replace `assets/Hans-Lee-Resume.pdf` and its editable Word counterpart when updating the résumé.
- GitHub Pages publishes the root of the `main` branch. The `.nojekyll` file keeps the site buildless.

## Evidence and scope

ROGII results are linked to the public solution repository. CUHK-X Top 15 recognition and the invitation to a poster presentation are based on Hans's confirmed account; the site does not claim Top 6 participation. Recommendation results are held-out model evaluations. The thesis uses synthetic conditions; the student-health classification project is a Kaggle benchmark.

## Design

Inspired by the full-screen introduction and section navigation of Louis Owen's portfolio. The implementation, styling, graphics and content here are original. No third-party template code or personal assets are copied.
