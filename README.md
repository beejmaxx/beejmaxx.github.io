# Bijan — technical portfolio

A static portfolio and case-study site for systems engineering work: agent
infrastructure, developer tooling, stateful execution systems, market
infrastructure, and operational interfaces.

The public homepage is intentionally selective. The repository retains older
book and note routes as source material, but they are not part of the primary
navigation.

## Primary content

- selected systems and implementation evidence;
- engineering case studies with constraints and explicit limitations;
- an Aikido system overview and subsystem dossiers;
- a downloadable résumé at `/resume.pdf`.

## Retained notes

Markdown notes remain in `content/posts` and can still be rendered when needed:

```md
---
title: A clear title
date: 2026-08-11
excerpt: One sentence used on the blog index and in search previews.
tags: process, rust, experiment
---

Write the post in Markdown here.
```

The file name becomes the URL. For example, `my-new-note.md` is published at `/blog/my-new-note`.

## Update the project inventory

Public projects are listed in `content/projects.json`. The archive supports search and filters original work from forks.

## Local development

```bash
npm install
npm run dev
```

## Publish

Push to the `main` branch of `beejmaxx/beejmaxx.github.io`. The included GitHub Actions workflow builds the static site and deploys `dist/client` to GitHub Pages. In the repository’s **Settings → Pages**, set the source to **GitHub Actions** once.
