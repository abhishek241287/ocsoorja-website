# Publishing a new article

## The easy way — the Blog Publisher (recommended)

While the workspace is running, open the website preview and go to:

**`/blog-publisher`**

(Type it at the end of the preview address bar — the page is intentionally
not linked in the site menu.)

Fill in the form and click **Publish article**:

- Upload the cover image (PNG, JPG or WebP — wide pictures look best)
- Enter the title (the web address is created from it automatically)
- Choose a category (or add a new one)
- Paste the article text — lines starting with `##` become section headings,
  and lines starting with `-` become bullets
- Today's date, the reading time and the search-engine text are all filled in
  automatically

The article immediately appears on the homepage, the blog list, its own page
and the sitemap. **To put it on the live site, click Replit's Publish button
when you're ready.**

The preview may refresh for a few seconds right after publishing — that's
normal.

## The manual way (fallback)

If you ever prefer to do it by hand:

1. Drop the image into this folder
   (`artifacts/ocs-oorja/public/images/articles/`), named after the article,
   lowercase words joined by hyphens, e.g. `solar-pump-guide.webp`.
2. Open `artifacts/ocs-oorja/src/data/blog.ts`, copy an existing article
   block — from its opening `{` to its closing `},` — paste it directly under
   `export const blogPosts: BlogPost[] = [` and edit the fields (each one is
   explained in the notes at the top of that file). Point `image` at your
   file: `"/images/articles/solar-pump-guide.webp"`.
3. Save. Homepage, blog list, article page, category filter and sitemap all
   update automatically.

## To change an article's picture later

Replace the image file in this folder with a new one using the SAME filename.
Nothing else to edit.

## Two rules

- Never change an article's `slug` after publishing (the old link would break).
- Each article needs a unique title — the Publisher will warn you if the
  address already exists.
