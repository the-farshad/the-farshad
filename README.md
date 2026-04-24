# thefarshad.com

Source for my personal site, served via GitHub Pages from this repo.

- **Site:** [thefarshad.com](https://thefarshad.com)
- **Stack:** static HTML/CSS/JS (no build step)
- **Deploy:** push to `master`; GitHub Pages serves it on the `CNAME` domain

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Layout

```
index.html      entry page
blog/           blog index and posts (plain HTML)
  index.html    list of posts
  posts/        one HTML file per post
styles/         CSS
scripts/        JS
assets/         images and icons
_config.yml     Jekyll theme used by GitHub Pages
CNAME           custom domain
```

## Adding a blog post

1. Copy an existing file in `blog/posts/` and rename it (e.g. `my-post.html`).
2. Edit the title, date, and body.
3. Add a new `<li>` to `blog/index.html` linking to it.

## Contact

[me@thefarshad.com](mailto:me@thefarshad.com) ·
[LinkedIn](https://www.linkedin.com/in/farshadghorbani/) ·
[Twitter](https://twitter.com/FarshadGhorbani)
