# Before / After Comparison Component

A self-contained, vanilla HTML/CSS/JS before-after image slider, built for embedding
in Google Sites via an `<iframe>`.

## Files

- `index.html` — markup
- `style.css` — styling (minimalist, editorial, hairline border, no radius/shadows)
- `script.js` — drag logic (mouse + touch, via Pointer Events)
- `before.jpg`, `after.jpg` — placeholder demo images (replace with your own)

## Using your own images

Replace `before.jpg` and `after.jpg` with your own images (same filenames, or
edit the `src` attributes in `index.html`). For best results:

- Use two images with the **same aspect ratio** and framing (same camera angle).
- The frame's aspect ratio is set to `3 / 2` in `style.css` (`.compare__frame`).
  Change the `aspect-ratio` value there to match your images (e.g. `16 / 9`, `4 / 3`).
- The "PLAN INIȚIAL" (before) image is automatically rendered in black & white
  via `filter: grayscale(100%)` on `.compare__img--before` in `style.css`.

## Changing the initial handle position

In `index.html`, edit:

```html
<div class="compare" id="compare" data-position="65">
```

`data-position` accepts any value from 0–100 (percent).

## Publishing on GitHub

1. Push this folder to a GitHub repository.
2. Enable **GitHub Pages** (Settings → Pages → deploy from `main` branch).
3. Your component will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Embedding in Google Sites

1. In Google Sites, click **Insert → Embed → By URL**.
2. Paste your GitHub Pages URL.
3. Resize the embed box to match your desired aspect ratio.

Because the component is fully responsive (percentage-based layout and
`aspect-ratio`), it will scale correctly at any iframe width.
