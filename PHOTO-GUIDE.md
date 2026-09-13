# BrightCorner website — where to add photos

Every grey or tinted box on the site is a photo slot. This file lists all of them, what
goes in each, and the exact line to paste.

---

## How to swap a photo in (the general method)

1. Put your image files in the `assets/` folder, next to `logo.png` and `styles.css`.
   Use lowercase names with no spaces: `hero-1.jpg`, `bright-play.jpg`, `founder.jpg`.
2. Open the HTML file, use Ctrl+F to find the placeholder text quoted below.
3. Replace **the whole `<div>`** (from `<div class="ph">` to `</div>`) with:

   ```html
   <img src="assets/your-file.jpg" alt="Short description of what is in the photo">
   ```

4. Save and refresh the browser.

The `alt` text matters. Write what is actually happening — "Children painting at Bright Buds"
— not "photo1". Google reads it, and so do screen readers.

### Before you upload anything

- **Resize.** Nothing should go up wider than 1600px. A phone photo straight off the
  camera is 4000px wide and will make the page crawl on mobile data.
- **Compress.** Run every image through [squoosh.app](https://squoosh.app) or
  [tinypng.com](https://tinypng.com). Aim for under 300 KB each. This is the single
  biggest thing you can do for page speed.
- **Get permission.** Written consent from a parent before any child's face goes on the
  public site. Keep a record of who has consented and who has not, and re-check it
  yearly. If a parent withdraws consent, the photo comes down the same day.

---

## index.html — Home

| Where | Placeholder text to search for | What to shoot | Size |
|---|---|---|---|
| Hero slider ×5 | `Slide 1 — the most important photo` … `Slide 5` | See "The hero slider" below. | 1600×1000 each |
| Program card ×4 | `Photo — Bright Play` (and Buds, Junior, Senior) | One per classroom. Show the age group clearly — a toddler at the sensory table reads differently from a UKG child writing. | 800×560 |
| Founder | `Photo — Subhashini R` | Head and shoulders, warm, looking at camera. Plain or classroom background. Crops to a circle, so leave room around the head. | 600×600 |
| Testimonial video | `Replace with a YouTube embed` | See "Adding videos" below. | — |
| Gallery ×10 | `Featured — classroom`, `Art`, `Festival`, `Outdoor`, `Teacher`, `Craft`, `Class` | Mixed set. The two `wide` slots are landscape, the rest are square. | 800×800 (wide: 1200×600) |
| Blog teaser ×3 | `Post thumbnail` | Pulls from the blog automatically once posts exist. | 800×500 |

---

## programs.html — Programs

| Where | Placeholder text | What to shoot | Size |
|---|---|---|---|
| Bright Play | `Photo — Bright Play classroom` | Wide shot of the room in use. These sit alongside the text and scroll with it, so landscape works best. | 900×700 |
| Bright Buds | `Photo — Bright Buds classroom` | Same, showing an activity typical of that stage. | 900×700 |
| Bright Junior | `Photo — Bright Junior classroom` | Same. | 900×700 |
| Bright Senior | `Photo — Bright Senior classroom` | Same. | 900×700 |

Use different photos here from the four on the homepage. Repeating them makes the site
feel thinner than it is.

---

## why-us.html — Why us

| Where | Placeholder text | What to shoot | Size |
|---|---|---|---|
| Founder | `Photo — Subhashini R` | Same image as the homepage is fine here. | 600×600 |
| Cognitive | `Photo — Cognitive` | A child concentrating on a puzzle, sorting task or blocks. Hands and face, close in. | 800×900 |
| Physical | `Photo — Physical` | The large play area in use — climbing, running, balancing. The easiest of the five. | 800×900 |
| Emotional | `Photo — Emotional` | A teacher crouched at child height, talking with one child. Warmth, not a posed hug. | 800×900 |
| Creative | `Photo — Creative` | Paint, dough or origami mid-process. Messy hands beat finished artwork. | 800×900 |
| Cultural, social & moral | `Photo — Cultural, social and moral` | A festival day, or a group of children sharing materials. | 800×900 |

These five are portrait-ish and alternate left and right down the page. Cognitive and
Emotional are the hard ones to photograph without looking generic — if a good shot proves
difficult, an illustrated panel in the dimension's colour works just as well in the slot.

---

## contact.html — Contact

| Where | Placeholder text | What goes there |
|---|---|---|
| Map | `Google Map embed goes here` | Not a photo. Go to Google Maps, search "BrightCorner Global School Shaikpet", click **Share → Embed a map**, copy the `<iframe>`, and paste it in place of the whole `<div class="mapslot">`. |

---

## blog.html and blog-post.html — Blog

| Where | Placeholder text | Size |
|---|---|---|
| Featured post | `Featured post image` | 1200×800 |
| Post thumbnails | `Post thumbnail` | 800×500 |
| Post header | `Post header image` | 1600×900 |
| In-article image | `In-article image` | 1200×700 |
| Author photo | `Photo — Subhashini R` | 400×400 |

Once the blog runs on WordPress, all of these come from each post's **Featured image** —
you set it in the editor and the listing fills itself. No HTML editing.

---

## The hero slider

Seven slides, each one of your collages. The slider auto-advances every 5 seconds, pauses
on hover and on keyboard focus, supports arrow keys, dots and swipe, and stops
auto-playing for anyone whose device is set to reduce motion.

**Export every collage at 5:4** — 1500×1200 px is a good size. The slider frame is locked
to 5:4 and images use `object-fit: contain`, so nothing is ever cropped. If a collage is a
different shape it will still display in full, just with a white margin at the sides.

**The seven themes, in order:**

| # | Theme | Caption on the slide |
|---|---|---|
| 1 | Academics | Strong foundations, built through play |
| 2 | Physical exercise | Room to move, climb and grow |
| 3 | Festivals & celebrations | Traditions we celebrate together |
| 4 | Festivals & celebrations | Culture, colour and community |
| 5 | Activities | Creative hearts, every single day |
| 6 | Story telling | Where curiosity begins |
| 7 | Outdoors | Learning never stays indoors |

**To add a collage**, open `index.html`, find the slide's comment block, and replace the
`<div class="slide-ph">…</div>` with the `<img>` line written in that comment. The alt text
is already drafted for you.

### About the alt text

Each slide has SEO-friendly alt text naming the activity, the school and Shaikpet,
Hyderabad. Use it as written if the collage matches the theme.

One caveat worth knowing: alt text is meant to describe what is actually in the image, both
for Google and for anyone using a screen reader. The drafts are written generically because
a collage spans several occasions — but if a collage turns out to be mostly outdoor play
rather than academics, edit the alt text to match. Alt text that doesn't describe the image
is worse than none.

Keep each one under about 125 characters, mention Shaikpet or Hyderabad where it reads
naturally, and never start with "Image of" or "Photo of".

**Changing the number of slides:** add or delete a whole slide block. The dots build
themselves, so nothing else needs updating. Keep `is-active` on the first slide only.

**Changing the speed:** edit `data-interval="5000"` on the carousel (milliseconds).

**Slide one matters most.** Most visitors scroll before slide two appears, so the Academics
collage should be your strongest.

---

## Adding videos from your YouTube channel

On the homepage, find `Replace with a YouTube embed`. Replace the whole
`<div class="vslot">…</div>` with:

```html
<div class="vslot">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID"
          title="Parent story — BrightCorner"
          allowfullscreen loading="lazy"></iframe>
</div>
```

`VIDEO_ID` is the part after `v=` in the video's URL. For
`youtube.com/watch?v=aB3dEf7Gh` the ID is `aB3dEf7Gh`.

---

## Photos worth taking that you probably don't have yet

Shoot these on one bright morning and the whole site fills up at once:

- One wide establishing shot of each of the four classrooms in use
- The large play area with children on it (this sells the school on its own)
- A teacher sitting at child height, mid-conversation with one child
- Snack time as a group
- Art and origami in progress — hands and materials, not finished pieces
- The entrance and gate, so a new parent recognises the building
- Subhashini's portrait
- A festival day, whichever comes next

Avoid: rows of children lined up for the camera, empty rooms, and anything blurry. One
good photograph does more than six mediocre ones.

---

## Where the colours live

All brand colours are in one block at the top of `assets/styles.css`, under
`BRAND SETTINGS`. Change a hex value there and it updates everywhere on every page.

The background pattern is also in `assets/styles.css`, in the `BACKGROUND PATTERN`
section. To remove it entirely, delete the `background-image` line on `body`.
