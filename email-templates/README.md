# TheUrbanNet waitlist email templates

This folder holds the React Email templates for the waitlist emails. It was copied from the
reference templates in `the-urban-net` repo, so the waitlist emails match the rest of
TheUrbanNet's email design.

It is a separate project from the waitlist site: it has its own `package.json` and its own
install, and nothing in here affects the site or its Vercel deploy.

## Which template to use

**Start every new email from `emails/template-2/template-2.2.tsx`.** It's the reference
design: a light peach background, Instrument Serif headings, and images from the company's
Canva designs.

Keep these three parts exactly as they are in template-2.2, on every email:

- **The header** at the top.
- **The brown tip box** near the end: a short heading, one or two lines of text and a button.
  Use it for a tip on how to get the best out of TheUrbanNet.
- **The footer:** the about line, the social icons, the company details and the unsubscribe
  link. Don't add anything else to it.

## Run it

```bash
npm install
npm run dev      # opens a preview at http://localhost:3000
npm run build    # checks for errors and exports HTML to dist/html/
```

Run these from inside this `email-templates` folder, not the repo root.

## The waitlist emails

| Email                 | File                                         | Sent when                        |
| --------------------- | -------------------------------------------- | -------------------------------- |
| Customer confirmation | `emails/template-2/customer-confirmation.tsx` | A customer joins the waitlist    |
| Business confirmation | `emails/template-2/business-confirmation.tsx` | A business joins the waitlist    |

The original confirmation copy, from the retired Vercel backend, is archived in
`legacy/vercel-backend-confirmation.js`. Use it as the starting copy.

## Build a new template, step by step

1. **Make a branch.** Start from `email/templates`, for example
   `git switch -c email/customer-confirmation`.
2. **Copy the reference.** Duplicate `emails/template-2/template-2.2.tsx` in the same folder
   and give it a clear name, like `customer-confirmation.tsx`. Keeping it in this folder means
   it uses 2.2's colours, fonts and phone styles automatically.
3. **Rename the component.** Change `Template22` to a name that matches your email, like
   `CustomerConfirmation`. Update the name in the `PreviewProps` line and the
   `export default` line too.
4. **Write your content.** Swap the headings, text and links for your own. Keep one main
   action per email, and keep links worded as actions ("Explore TheUrbanNet →").
5. **Add your images.**
   - Resize them first. Hero images are 1280px wide, feature images 840px wide.
   - Save them as JPEG at about 80% quality. Aim for under 200 KB each.
   - Give them clear names (`waitlist-hero.jpg`, not `image_3.jpg` or `photo(2).jpg`).
   - Put them in `emails/static/template-2/` and use them with `image('your-file.jpg')`.
   - Give every image `alt` text that describes it. If the image has words in it, include
     those words.
6. **Use the colour names, not hex codes.** Write `text-fg`, `text-fg-2`, `text-link` and so
   on. They're defined in `emails/template-2/theme-2.2.ts`.
7. **Check it on a phone.** In the preview, switch to the mobile view. For phone-only
   styling, use the `mob-*` classes from `emails/template-2/theme.ts` (like `mob-px-6` or
   `mob-block`).
8. **Add it to the build.** Add a line for your file in `scripts/render-all.ts`, but only
   once the file exists. Then run `npm run build`. It should finish with "Done" and no errors.
9. **Commit and open a pull request** into `email/templates`. Include a desktop and a
   phone screenshot, and list any files you deleted or renamed.

## Before you open a pull request

- [ ] Previewed at desktop and phone width
- [ ] Header, brown tip box and footer match template-2.2
- [ ] `npm run build` passes
- [ ] `git diff` only shows the files you meant to change
- [ ] Screenshots attached

There is no pre-commit check in this repo, so `npm run build` is the only thing that catches
errors before they're pushed.

## Things that will trip you up

- **`mobile:` classes don't work here.** With this project's package versions they end up
  applying on desktop too. Use the `mob-*` classes instead. If you need a new one, copy an
  existing rule in `emails/template-2/theme.ts`.
- **Custom fonts only show in Apple Mail and iOS Mail.** Gmail and Outlook fall back to
  Georgia and Helvetica, so make sure your email still looks right with those.
- **Words inside images disappear when images are blocked,** which Gmail and Outlook often
  do. Put anything important in real text as well.
- **Images need a public address for real sends.** In the preview they load from
  `emails/static/`. Before rendering HTML to send, set `EMAIL_ASSET_BASE_URL` to wherever the
  `static/` folder is hosted.

## Not connected yet

Confirmation emails are sent by the Google Apps Script, through Resend. Changes here
only reach inboxes once the Apps Script is updated with the newly rendered HTML from
`dist/html/`. The Vercel backend (`feat/vercel-backend`)
that used to send them has been retired.

## Folder guide

```
emails/
  template-2/          the templates, plus their theme and font files
  static/template-2/   the compressed images the templates use
src/
  lib/assetUrl.ts      builds image links (set EMAIL_ASSET_BASE_URL for real sends)
  tokens/company.ts    legal line, address, website and unsubscribe link
scripts/render-all.ts  the list of templates `npm run build` exports
legacy/                the old Vercel backend email, kept for reference only
```
