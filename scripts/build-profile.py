"""Generate the readable public profile from the portfolio's existing content."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / 'index.html').read_text()
schema = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', source, re.S)[1])
person = next(item for item in schema['@graph'] if item['@type'] == 'Person')
schema = {'@context': 'https://schema.org', '@type': 'ProfilePage',
          '@id': 'https://stevenleehans.github.io/profile/#profile',
          'url': 'https://stevenleehans.github.io/profile/',
          'name': 'Hans Lee — professional profile and portfolio',
          'inLanguage': 'en-AU', 'mainEntity': person}

sections = []
for section_id in ('intro', 'resume', 'achievements', 'projects'):
    match = re.search(r'<section\b[^>]*\bid="' + section_id + r'"[^>]*>(.*?)</section>', source, re.S)
    if match is None:
        raise ValueError(f'Missing portfolio section: {section_id}')
    content = match[1]
    content = re.sub(r'<a class="close-panel".*?</a>', '', content, flags=re.S)
    content = re.sub(r'<div class="project-controls">[^\n]*</div>', '', content)
    content = re.sub(r'<p id="project-count".*?</p>', '', content, flags=re.S)
    content = re.sub(r'<p id="empty-results".*?</p>', '', content, flags=re.S)
    # Standalone page resources are one directory below the original homepage.
    content = re.sub(r'(href|src)="(assets/|research/)', r'\1="../\2', content)
    content = content.replace('href="profile/"', 'href="../"').replace('Read full profile', 'Interactive portfolio')
    content = content.replace("Hello, I'm Hans.", 'About Hans Lee')
    sections.append(f'<section class="profile-section" id="{section_id}">{content}</section>')

html = '''<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hans Lee — Kaggle Competition Expert, AI and Enterprise Data</title>
<meta name="description" content="Hans Lee's professional profile: Melbourne-based Kaggle Competition Expert, Monash researcher, enterprise data warehouses, self-service BI and machine learning projects.">
<meta name="author" content="Hans Lee"><meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="https://stevenleehans.github.io/profile/">
<meta property="og:type" content="profile"><meta property="og:title" content="Hans Lee — professional profile">
<meta property="og:description" content="Kaggle Competition Expert · AI, machine learning and enterprise data · Melbourne, Australia">
<meta property="og:url" content="https://stevenleehans.github.io/profile/">
<meta property="og:image" content="https://stevenleehans.github.io/assets/social-preview.png">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="https://stevenleehans.github.io/assets/social-preview.png">
<link rel="icon" href="../assets/favicon.svg"><link rel="stylesheet" href="../styles.css?v=20261014-discovery">
<script type="application/ld+json">SCHEMA</script>
</head><body class="public-profile">
<a class="skip-link" href="#profile-content">Skip to profile</a><div class="backdrop" aria-hidden="true"></div>
<div class="profile-document"><header class="profile-header"><a class="wordmark" href="../" aria-label="Hans Lee portfolio home">HL<span class="wordmark-dot">.</span></a><a class="text-link" href="../">Interactive portfolio ↗</a></header>
<main id="profile-content"><div class="profile-heading"><div><p class="eyebrow">PROFESSIONAL PROFILE · MELBOURNE, AUSTRALIA</p><h1>Hans Lee</h1>
<p class="lead">Kaggle Competition Expert · AI, machine learning and enterprise data</p></div><img class="profile-photo" src="../assets/hans-portrait.jpg" width="768" height="1024" alt="Hans Lee smiling while holding his dog"></div>
<nav class="profile-navigation" aria-label="Profile sections"><a href="#intro">About</a><a href="#resume">Experience</a><a href="#achievements">Recognition</a><a href="#projects">Projects</a></nav>
SECTIONS
</main><footer class="profile-footer"><a href="https://www.linkedin.com/in/hans-l-16176885/" rel="me">LinkedIn</a><a href="https://www.kaggle.com/stevenleehans" rel="me">Kaggle</a><a href="https://github.com/stevenleehans" rel="me">GitHub</a><a href="mailto:stevenleehans@yahoo.com">Email Hans</a><p>Last updated 14 October 2026.</p></footer></div>
</body></html>'''
html = html.replace('SCHEMA', json.dumps(schema, indent=2, ensure_ascii=False)).replace('SECTIONS', '\n'.join(sections))
(ROOT / 'profile').mkdir(exist_ok=True)
(ROOT / 'profile/index.html').write_text(html)
print('Generated visible, script-independent profile page from current portfolio content.')
