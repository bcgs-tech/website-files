# Deploying BrightCorner to Cloudflare Pages

A complete walkthrough, from zip file to `brightcorner.in`. Allow about an hour for the
first run, most of which is waiting for DNS.

**What you'll end up with:** the site live on a global network with data centres in India,
free HTTPS, no monthly hosting bill, and a setup where publishing a change means committing
a file to GitHub and waiting sixty seconds.

**What you need before starting:** the `brightcorner-site.zip` file, access to wherever
`brightcorner.in` is registered, and an email address you can check.

---

## Step 1 — Create a GitHub account and repository

GitHub stores the files. Cloudflare watches GitHub and republishes whenever something
changes.

1. Go to [github.com](https://github.com) and sign up if you don't have an account.
2. Click the **+** in the top right, then **New repository**.
3. Name it `brightcorner-site`.
4. Choose **Public**. (Private works, but public is simpler, and it lets me read your
   current files directly instead of you re-uploading zips each time.)
5. Leave every "Initialize this repository with" box **unticked**. You want it empty.
6. Click **Create repository**.

---

## Step 2 — Upload the site files

Unzip `brightcorner-site.zip`. Inside is a folder called `bc`.

> **The one mistake that breaks everything:** upload the *contents* of `bc`, not the folder
> itself. `index.html` must sit at the top level of the repository. If you end up with
> `bc/index.html`, the site will show a 404 and the cause is not obvious.

1. On your new empty repository page, click **uploading an existing file**.
2. Open the `bc` folder on your computer, select everything inside it, and drag it into the
   browser. That's all the `.html` files, `robots.txt`, `sitemap.xml`, `_headers`,
   `_redirects`, `PHOTO-GUIDE.md`, and the `assets` folder.
3. Scroll down, type a message like `Initial site`, and click **Commit changes**.

You should now see `index.html` listed on the repository's front page. If you see a `bc`
folder instead, delete everything and re-upload from inside the folder.

---

## Step 3 — Create a Cloudflare account

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up.
2. Verify your email address when the message arrives.

You do **not** need to transfer your domain to Cloudflare, and you do not need a paid plan.

---

## Step 4 — Connect the repository

1. In the Cloudflare sidebar, click **Workers & Pages**.
2. Click **Create**, then the **Pages** tab, then **Connect to Git**.
3. Authorise Cloudflare to access GitHub. When asked which repositories, you can grant
   access to just `brightcorner-site`.
4. Select `brightcorner-site` and click **Begin setup**.

---

## Step 5 — Configure the build

Cloudflare will ask how to build the site. This is plain HTML, so there is nothing to
build. Getting this screen right is the difference between a working deploy and a confusing
error.

| Field | What to enter |
|---|---|
| Project name | `brightcorner-site` |
| Production branch | `main` |
| Framework preset | **None** |
| Build command | **leave completely empty** |
| Build output directory | `/` (a single forward slash) |

Cloudflare may suggest a default build command. Delete it. If a build command is set, the
deploy will fail with an error about a missing script.

Click **Save and Deploy**.

---

## Step 6 — Check the preview URL

After about a minute you'll get a URL like `brightcorner-site.pages.dev`. Open it and check:

- [ ] Every page loads from the navigation
- [ ] The hero slider advances, and the arrows and dots work
- [ ] The mobile menu opens (resize the window narrow, or use your phone)
- [ ] WhatsApp and phone links open correctly **on a phone**, not just a laptop
- [ ] `brightcorner-site.pages.dev/nosuchpage` shows your branded 404 page
- [ ] The site looks right on an actual phone over mobile data

Test on a real phone. Most of your visitors will be parents on a phone, and a laptop
browser window made narrow is not the same test.

---

## Step 7 — Point brightcorner.in at the site

1. In your Pages project, go to the **Custom domains** tab.
2. Click **Set up a domain** and enter `brightcorner.in`.
3. Cloudflare shows you the DNS records to add.
4. Log in wherever `brightcorner.in` is registered and add those records.
5. Repeat for `www.brightcorner.in` if you want both to work.

> **Protect your email.** If your domain registrar also handles `info@brightcorner.in`,
> change **only** the records Cloudflare asks for. Do not touch the **MX** records. Deleting
> or replacing MX records will silently stop all email to that address, and you may not
> notice for days.

HTTPS is issued automatically and free — you don't buy or install a certificate. DNS
propagation takes anywhere from ten minutes to a few hours. The site stays reachable at the
`.pages.dev` address the whole time.

---

## Step 8 — Activate the enquiry form

1. Sign up at [formspree.io](https://formspree.io) and create a new form for BrightCorner.
   (If you already use Formspree for another site, make a **separate** form so the
   submissions don't mix.)
2. Copy the endpoint id — the part after `/f/`. For `https://formspree.io/f/abcdwxyz` the
   id is `abcdwxyz`.
3. In GitHub, open `contact.html`, click the pencil icon, and use Ctrl+F to find `FORM_ID`.
   Replace it with your id. Commit.
4. Wait a minute for the redeploy, then **submit the form once yourself from the live
   site**. Formspree keeps an endpoint dormant until its first real submission.
5. Confirm the verification email Formspree sends to your destination address.
6. Check that the submission arrives — and check the spam folder if it doesn't.

While you're in `contact.html`, confirm the `_next` field points at your real domain:
`https://brightcorner.in/thanks.html`.

---

## Step 9 — Add your photos

Follow `PHOTO-GUIDE.md` for which image goes where.

1. **Compress everything first** through [squoosh.app](https://squoosh.app). Aim for under
   300 KB per image. A photo straight off a phone is around 4 MB and 4000 px wide — eight of
   those will make the site unusable for a parent on mobile data.
2. Export the seven hero collages at **5:4** (1500×1200 works well).
3. In GitHub, open the `assets` folder, click **Add file → Upload files**, and drag your
   images in. Commit.
4. Edit each HTML file to swap the placeholder `<div>` for an `<img>`, as described in the
   photo guide. Commit.

Cloudflare redeploys automatically within a minute of each commit. After the initial setup
you never open Cloudflare again.

---

## Making changes from now on

The whole workflow is: edit the file in GitHub → commit → wait a minute → it's live.

For small edits (a phone number, a line of text) you can edit directly in GitHub's web
interface with the pencil icon. No software to install.

Every commit is saved, so if something breaks you can look at the history and see exactly
which change did it, and restore the previous version.

---

## If something goes wrong

**The deploy failed.** Check the build log in Cloudflare. The usual cause is a build command
that should have been empty. Go to Settings → Builds and deployments, clear it, and retry.

**The site shows a 404 at the root.** `index.html` is probably inside a `bc` folder in the
repository instead of at the top level.

**The styling is missing and the page looks like plain text.** The `assets` folder didn't
upload, or uploaded to the wrong place. `assets/styles.css` must exist in the repository.

**The custom domain isn't working after a few hours.** Check the DNS records match what
Cloudflare showed exactly. Some registrars add the domain name automatically, which can
produce `brightcorner.in.brightcorner.in`.

**A change doesn't appear.** Check the deploy finished in Cloudflare, then hard-refresh
(Ctrl+Shift+R, or Cmd+Shift+R on Mac). The `_headers` file caches `/assets/` aggressively,
so a replaced image may be cached in your browser — rename the file to force it through.

**Form submissions aren't arriving.** Confirm you verified the Formspree email, that the
endpoint id is right, and check spam.

---

## Before you announce the site

- [ ] Every placeholder photo replaced, or the section hidden
- [ ] Alt text edited to match what's actually in each image
- [ ] Enquiry form tested end to end from a phone
- [ ] Phone number, email and address checked on every page
- [ ] The "150+ families" figure confirmed as accurate
- [ ] Privacy policy and terms reviewed by your lawyer
- [ ] Written parental consent on file for every child whose face appears
- [ ] `sitemap.xml` submitted to Google Search Console
