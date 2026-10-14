# Hans Lee Portfolio

Personal portfolio for [stevenleehans.github.io](https://stevenleehans.github.io/), built with HTML, CSS and JavaScript for GitHub Pages.

The site includes an introduction, professional experience and education, competition achievements, twelve selected projects, and contact links. Project search and category filters run in the browser. A Gemini 2.5 Flash portfolio assistant uses the separate Vercel backend in `assistant-api/`; the static portfolio remains hosted on GitHub Pages.

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

The food-delivery visualisation is hosted as a separate [live D3.js project](https://stevenleehans.github.io/food-delivery-visualisation/) with [public source and data notes](https://github.com/stevenleehans/food-delivery-visualisation). It demonstrates interactive charts and scrollytelling with historical inputs and estimates.

Nutrifood industry case studies cover the warehouse designed and built from scratch, the migration of 100+ reports from QlikView to Tableau, and the related application-data integration for ATL/BTL market research. The research use case is explicitly part of the warehouse build. Descriptions use Hans’s confirmed scope and existing résumé facts. Industry work can be filtered separately; the cards link to professional experience and contact rather than internal company assets.

The Adaptive Nudge Loop research card links to `research/adaptive-nudge-loop/`, an eight-step animation adapted from Hans’s supplied HTML. It contains a thesis-grounded explanation of traceability, frequency adaptation, automation and bounded results. The walkthrough has no connection to the research system’s APIs and uses synthetic demo identities and interaction examples.

Hans subsequently confirmed Oracle ERP as a source, 10M+ rows processed daily, 400+ distributors and 1M+ customers. Daily processing volume is distinct from new-row ingestion. The market-research use case compares ATL TV/non-TV activity and BTL promotions, supporting marketing ROI and distribution-channel decisions with SQL Server and Tableau. These scale and role details come from Hans’s account; public corporate campaign pages are context, not evidence of his personal work or measured ROI uplift. LinkedIn’s public profile exposed certifications but not detailed job responsibilities during the check.

CUHK-X work is linked to the public [automated source repository](https://github.com/stevenleehans/cuhk-x-large-model-solution), containing pipeline modules, training recipes and 11 passing regression/fixture tests. It is a curated code portfolio, separate from the private archive and ranked verification package.

Earned credentials are shown first in the résumé panel, with Tableau Desktop Specialist first, Databricks Fundamental (Aug 2026), IELTS Academic 7.5 (Jan 2022) and Kaggle Competition Expert. Planned PL-300, Azure cloud and further Databricks certification goals are explicitly separate. Hotel Accor Kitchen Steward starts Sep 2026. The datathon notebook link resolves from Hans’s LinkedIn recap and is verified through the Kaggle CLI as `hanifnoerrofiq/momo-s-solution`; attribution remains to Team Lord Momo.
