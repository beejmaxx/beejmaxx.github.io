# bijan's notes

A minimalist technical blog with retained work, case-study, and about pages.
The homepage lists Markdown posts in reverse chronological order.

The site is published at [beejmaxx.github.io](https://beejmaxx.github.io/).

## Primary content

- selected systems and implementation evidence;
- engineering case studies with constraints and explicit limitations;
- an Aikido system overview and subsystem dossiers;
- a downloadable résumé at `/resume.pdf`.

## Add a post

Create a Markdown file in `content/posts` with this frontmatter:

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
