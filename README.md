# Hans Lee Portfolio

Personal portfolio for [stevenleehans.github.io](https://stevenleehans.github.io/), built with HTML, CSS and JavaScript for GitHub Pages.

The site includes an introduction, professional experience and education, competition achievements, eight selected projects, and contact links. Project search and category filters run in the browser. A Gemini 2.5 Flash portfolio assistant uses the separate Vercel backend in `assistant-api/`; the static portfolio remains hosted on GitHub Pages.

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

## Portfolio assistant

`assistant.js` calls the public Vercel `/api/chat` endpoint. The backend holds `GEMINI_API_KEY` as a sensitive production environment variable. No API key belongs in browser code, repository files, URLs or build variables. Update the public knowledge in `assistant-api/lib/profile.js` alongside future résumé or project changes.

The assistant accepts bounded questions and short conversation context, uses the model `gemini-2.5-flash`, and returns plain-text answers grounded in the public profile. It checks browser origin, handles preflight, applies request limits and keeps a small cache. Its in-memory traffic counters are per running function instance, not a durable global quota. Conversations are held only in the current page; submitted questions and recent context are sent to Google for generation. The app does not persist conversations or log their content.

Deploy `assistant-api/` as the separate Vercel project; redeploy production after updating its source or secrets. Run its checks with `node --test test/chat.test.mjs`.

## Evidence and scope

ROGII results are linked to the public solution repository. CUHK-X Top 15 recognition and the invitation to a poster presentation are based on Hans's confirmed account; the site does not claim Top 6 participation. Recommendation results are held-out model evaluations. The thesis uses synthetic conditions; the student-health classification project is a Kaggle benchmark.

The Inter-Uni Datathon 2026 result is attributed to Team Lord Momo. Hans's linked competition recap describes the team as the highest-ranked eligible team on the Stream 3 Kaggle leaderboard and a finalist after the presentation stage. The linked team repository documents the gas sensor drift method and its updated leaderboard score separately from the presentation outcome.

Competition links are verified from the Kaggle CLI's entered-competition listing. Silver and Bronze recognition links point to Hans's public Kaggle medal profile; the datathon recognition link points to his public recap. The CUHK organizer page is labelled as recognition criteria, not a personal certificate.

## Design

Inspired by the full-screen introduction and section navigation of Louis Owen's portfolio. The implementation, styling, graphics and content here are original. No third-party template code or personal assets are copied.
