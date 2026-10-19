# Hans Lee Portfolio

Personal portfolio for [stevenleehans.github.io](https://stevenleehans.github.io/), built with HTML, CSS and JavaScript for GitHub Pages.

The site includes an introduction, professional experience and education, competition achievements, fourteen selected projects, and contact links. Project search and category filters run in the browser. A Gemini 2.5 Flash portfolio assistant uses the separate Vercel backend in `assistant-api/`; the static portfolio remains hosted on GitHub Pages.

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

ROGII results are linked to the public solution repository. CUHK-X Top 15 recognition is supported by the official Finalist Award in `assets/CUHKX-2026-Large-Model-Finalist-Award.pdf`; the poster invitation is based on Hans's confirmed account; the site does not claim Top 6 participation. Recommendation results are held-out model evaluations. The thesis uses synthetic conditions; the student-health classification project is a Kaggle benchmark.

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

The introduction features Hans’s Kaggle Competition Expert profile, active competition work and Chelsea FC interest. Competition profile ranks are a user-supplied snapshot dated 14 October 2026: 3,312 of 217,449, personal best 3,307. The Nutrifood Tableau case study emphasises governed self-service platform foundations, covering security, users, version history, master data and schemas; 100+ report migration is supporting scale.

The dark navy palette uses a locally generated SVG starfield with white and blue stars, a diffuse galaxy band and a subtle orbital glow. The background is static; no animation or external image requests are needed. Content panels retain opaque navy surfaces for readability.

## Search discovery and homepage design previews

`profile/` is a fully visible, static HTML version of the professional profile, experience, recognition and project evidence. It requires no JavaScript. After updating homepage content, run `python3 scripts/build-profile.py` and review the generated page before publishing. The generator reuses the current homepage copy to keep role attribution, evaluation limits and credentials consistent.

The homepage and profile carry canonical URLs, metadata and JSON-LD linking Hans Lee to his public LinkedIn, Kaggle and GitHub profiles. Open Graph and social-card tags use `assets/social-preview.png`. The sitemap covers the homepage, profile, research walkthrough and separately hosted food delivery visualisation. Update `lastmod` only when a page changes substantially. Public search crawling remains allowed, including OAI-SearchBot; source implementation paths are excluded from crawling. Existing training-crawler preferences are unchanged.

Indexing is not confirmed by publishing these files. Verify the URL-prefix property `https://stevenleehans.github.io/` in Google Search Console, submit `https://stevenleehans.github.io/sitemap.xml`, and use URL Inspection to request the homepage and profile if appropriate. A verified Search Console account is required. There is no promise of indexing, rankings, rich results or AI citations. References: [Google profile markup](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features), [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots).

`design-previews/` contains three distinct, responsive homepage concepts: Orbital Portfolio, Mission Control and Stellar Editorial. They are reviewable previews, with `noindex` metadata and excluded from the sitemap. Their assistant links open the existing working assistant. Hans subsequently chose the Aura ML Engineer Portfolio template as the design direction for the live scrolling homepage.

## Current portfolio design and AI companion

Hans selected [Aura’s ML Engineer Portfolio template](https://www.aura.build/templates/act-like-a-profession-76), by BEREKET Tade, as the visual direction. The portfolio uses an original local implementation of that scrolling-page structure, adapted to Hans’s navy starfield, actual project evidence and supplied photograph. It keeps the existing section anchors and 14 project cards, with responsive navigation and filters. `portfolio.css` supplies the new presentation over the shared styles used by the readable profile.

The supplied portrait is published as `assets/hans-portrait.jpg` with compressed image pixels preserved and metadata removed. The AI assistant appears as a locally drawn astronaut-dog mascot. It opens a non-modal speech-bubble panel with keyboard close, focus return and reduced-motion support. Existing backend-only Gemini credentials, plain-text model rendering, source-link restrictions and rate limits remain in place. The assistant profile now includes the confirmed Databricks and Amazon S3 lakehouse POC and Hans’s interest in space.

## Technical Arsenal and RSNA learning project

The Technical Arsenal groups Hans-confirmed tools into AI/ML, GenAI/LLMs, full-stack, data/databases and deployment cards. The enterprise warehouse/governance panel retains the Databricks and Amazon S3 medallion POC and Nutrifood impact figures. Additional toolkit items were confirmed directly by Hans on 15 October 2026; LinkedIn separately corroborates his enterprise data tools.

The RSNA Knee project describes ongoing learning with Hugging Face Transformers, pretrained vision checkpoints, DICOM preprocessing, grouped validation and notebook inference. The public work link points to Hans’s already-published Kaggle report-label dataset. Private experiment notebooks, checkpoints and competition data are not published by this website update. The project credits the public community baselines and makes no clinical deployment or medal claim.

The lakehouse project now has a dedicated card linked to the public `stevenleehans/databricks-fraud-lakehouse` source package. Its reviewed code covers Delta medallion tables, Unity Catalog, MLflow, serving and monitoring; PaySim and financial impact remain explicitly synthetic/simulated. The ROGII project and recognition section feature Hans’s supplied 158th-place Kaggle write-up URL.

## Lakehouse case study and screenshots

`projects/payment-fraud-lakehouse/` is the standalone project page. The homepage card and readable profile link to the case study and public GitHub source. Four unmodified workspace screenshots in `assets/lakehouse/` come from Hans’s original project report, captured 13 August 2026: successful job, Unity Catalog, drift dashboard and inference response. They show recorded evidence, not current endpoint health. Original screenshots are retained for full-size viewing; no customer transaction data or credentials are included. The page keeps synthetic-data, batch-ingestion, S3 storage-context and simulation boundaries explicit.

The CUHK-X achievement also records ACM UbiComp / ISWC 2026 conference attendance on 13–15 October 2026, verified from a certificate issued to Hans Lee. Conference attendance is separate from competition-stage participation. A flattened, redacted certificate is published at `assets/CUHK-UbiComp-ISWC-2026-Attendance-Redacted.pdf`; its home address and registration confirmation number have been permanently removed.

The official CUHK-X 2026 Large Model Track Finalist Award confirms a Top 15 private-leaderboard finish and qualification for reproduction-code and live-verification stages. Qualification does not establish completion of those stages.
