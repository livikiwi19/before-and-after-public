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

## Using this widget for multiple projects (recommended workflow)

You do **not** need a separate copy of this widget for every project. Host
**one copy** on GitHub Pages, and pass each project's images in through the
iframe's URL. This way, updating the design once (e.g. changing the handle
color) updates every project at once, and adding a new project can never
break an existing page.

### 1. Organize your images in one repo

```
your-repo/
├── index.html
├── style.css
├── script.js
└── images/
    ├── proiect-1/
    │   ├── before.jpg
    │   └── after.jpg
    ├── proiect-2/
    │   ├── before.jpg
    │   └── after.jpg
    └── proiect-3/
        ├── before.jpg
        └── after.jpg
```

### 2. Point each project's iframe at the same widget, with different images

The widget reads its images from URL parameters, so each page just needs a
different URL — same file, same design, different content:

```
Project 1:
https://YOUR_USERNAME.github.io/YOUR_REPO/?before=images/proiect-1/before.jpg&after=images/proiect-1/after.jpg

Project 2:
https://YOUR_USERNAME.github.io/YOUR_REPO/?before=images/proiect-2/before.jpg&after=images/proiect-2/after.jpg
```

Supported parameters (all optional — omit any you don't need):

| Parameter     | Purpose                                   | Example                  |
|---------------|--------------------------------------------|---------------------------|
| `before`      | path/URL to the "before" image             | `images/proiect-2/before.jpg` |
| `after`       | path/URL to the "after" image              | `images/proiect-2/after.jpg`  |
| `position`    | initial handle position (0–100)            | `40`                      |
| `ratio`       | frame aspect ratio, overrides the default  | `16/9`                    |
| `labelBefore` | overrides the left label text              | `PLAN VECHI`              |
| `labelAfter`  | overrides the right label text             | `PLAN NOU`                |

Full example with everything customized:

```
https://YOUR_USERNAME.github.io/YOUR_REPO/?before=images/proiect-2/before.jpg&after=images/proiect-2/after.jpg&position=40&ratio=16/9
```

### 3. Adding a new project later

1. Upload the new pair of images into a new `images/proiect-X/` folder in
   the repo (via GitHub's web uploader — no code changes needed).
2. Build the iframe URL for that project using the pattern above.
3. Paste that URL into the new Google Sites page's embed block.

Existing pages are untouched because they each point to their own images —
nothing is shared between projects except the widget's code and styling.

### Alternative: manually editing `index.html` per project

If you'd rather not deal with URL parameters, you can instead duplicate the
whole folder per project and just swap `before.jpg`/`after.jpg` (this is
what the two demo folders shared earlier do). This works too, but every
future style change then has to be repeated across every folder — the
URL-parameter approach above avoids that maintenance burden.

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
