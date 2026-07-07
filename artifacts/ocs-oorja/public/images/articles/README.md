# Article images — how to add a new article yourself

Publishing a new article takes 2 steps. No code changes needed.

## Step 1 — Upload the article's image HERE (this folder)

- In the Replit file tree, open:
  `artifacts/ocs-oorja/public/images/articles/`
- Drag & drop your image into this folder (right-click the folder → Upload file also works).
- Name it after the article, lowercase words joined by hyphens, e.g.
  `solar-pump-guide.webp` (WebP or JPG both work — wide/landscape images look best).

## Step 2 — Add ONE entry in the article list

- Open: `artifacts/ocs-oorja/src/data/blog.ts`
- Copy an existing article block — everything from its opening `{` down to its
  closing `},` — and paste the copy directly under the line
  `export const blogPosts: BlogPost[] = [`
- Change the fields (each one is explained in the notes at the top of that file):
  - `slug` — the web address: /blog/your-slug (must be unique, never change it later)
  - `title`, `excerpt`, `category`, `author`, `readingTime`
  - `image` — point it at the file you uploaded in Step 1:
    `"/images/articles/solar-pump-guide.webp"`
  - `publishDate` — today's date as `"YYYY-MM-DD"` (newest date automatically
    becomes the big featured article and appears on the homepage)
  - `content` — your article body: a list of sections, each with an optional
    `heading` and one or more `paragraphs` (plain sentences in quotes)
- Save the file. The site updates by itself:
  homepage teaser, blog list, the article's own page, category filter and
  sitemap all pick it up automatically.

## To change an article's picture later

Just replace the image file in this folder with a new one using the SAME
filename. Nothing else to edit.
