# bijan — portfolio and field notes

A static portfolio, complete public project archive, and Markdown blog built for `beejmaxx.github.io`.

## Add a blog post

Create a Markdown file in `content/posts`:

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
