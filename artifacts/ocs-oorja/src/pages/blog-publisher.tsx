import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { getAllCategories } from "@/data/blog";
import { CheckCircle2, ImagePlus, Loader2, UploadCloud } from "lucide-react";

// ---------------------------------------------------------------------------
// Blog Publisher — internal tool, development workspace only.
//
// This page is intentionally NOT in navigation.ts (like /design-system) and
// the route is only registered when the site runs in development, so it never
// ships in the production build. It posts to the API server, which writes the
// new entry into src/data/blog.ts and saves the cover image.
// ---------------------------------------------------------------------------

const SUCCESS_KEY = "blog-publisher-success";

type SuccessInfo = { slug: string; url: string; title: string };

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read the image file."));
    reader.readAsDataURL(file);
  });
}

export default function BlogPublisher() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [articleText, setArticleText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [success, setSuccess] = useState<SuccessInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = useMemo(() => getAllCategories(), []);
  const effectiveCategory = category === "__custom__" ? customCategory : category;
  const slug = useMemo(() => slugify(title), [title]);

  // Publishing rewrites blog.ts, which restarts the dev server and reloads
  // this page — so the success state is persisted across the reload.
  useEffect(() => {
    const raw = sessionStorage.getItem(SUCCESS_KEY);
    if (raw) {
      try {
        setSuccess(JSON.parse(raw) as SuccessInfo);
      } catch {
        sessionStorage.removeItem(SUCCESS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    document.title = "Blog Publisher | OCS OORJA";
  }, []);

  function onImageChange(file: File | undefined) {
    setError(null);
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please choose a PNG, JPG or WebP image.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("The image is larger than 8 MB. Please use a smaller file.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function onPublish() {
    setError(null);

    if (title.trim().length < 8) {
      setError("Please enter a title (at least 8 characters).");
      return;
    }
    if (!effectiveCategory.trim() || effectiveCategory.trim().length < 2) {
      setError("Please choose or enter a category.");
      return;
    }
    if (articleText.trim().length < 100) {
      setError("The article text looks too short — please paste the full article.");
      return;
    }
    if (!imageFile) {
      setError("Please choose a cover image.");
      return;
    }

    setPublishing(true);
    try {
      const imageDataUrl = await fileToDataUrl(imageFile);
      const res = await fetch("/api/blog/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category: effectiveCategory.trim(),
          articleText,
          imageDataUrl,
          ...(excerpt.trim() ? { excerpt: excerpt.trim() } : {}),
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; slug?: string; url?: string; error?: string }
        | null;
      if (!res.ok || !data?.ok || !data.slug || !data.url) {
        setError(
          data?.error ??
            "Publishing failed. Please try again, or ask for help in the chat.",
        );
        return;
      }
      const info: SuccessInfo = { slug: data.slug, url: data.url, title: title.trim() };
      sessionStorage.setItem(SUCCESS_KEY, JSON.stringify(info));
      setSuccess(info);
    } catch {
      setError("Publishing failed. Please try again, or ask for help in the chat.");
    } finally {
      setPublishing(false);
    }
  }

  function startNewArticle() {
    sessionStorage.removeItem(SUCCESS_KEY);
    setSuccess(null);
    setTitle("");
    setCategory("");
    setCustomCategory("");
    setExcerpt("");
    setArticleText("");
    setImageFile(null);
    setImagePreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  if (success) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 md:py-24">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:p-12">
            <CheckCircle2 className="h-12 w-12 text-primary-strong" aria-hidden />
            <h1 className="text-2xl font-bold md:text-3xl">Article published!</h1>
            <p className="text-muted-foreground">
              “{success.title}” has been added to the website — homepage, blog
              list, article page and sitemap are all updated.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={success.url}>View the article</Link>
              </Button>
              <Button variant="outline" onClick={startNewArticle}>
                Write another article
              </Button>
            </div>
            <p className="mt-4 rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground">
              To put it on the <strong>live site</strong>, click Replit's{" "}
              <strong>Publish</strong> button when you're ready.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-strong">
          Internal tool
        </p>
        <h1 className="mt-1 text-3xl font-bold md:text-4xl">Blog Publisher</h1>
        <p className="mt-2 text-muted-foreground">
          Fill in the form and click Publish — the article is added to the
          website automatically. No code editing needed.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-6 p-6 md:p-8">
          {/* Cover image */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="cover-image">Cover image</Label>
            <input
              ref={fileInputRef}
              id="cover-image"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={(e) => onImageChange(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/40 p-4 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Cover preview"
                  className="max-h-64 rounded-md object-contain"
                />
              ) : (
                <>
                  <ImagePlus className="h-8 w-8" aria-hidden />
                  <span className="text-sm">
                    Click to choose an image (PNG, JPG or WebP — wide pictures
                    look best)
                  </span>
                </>
              )}
            </button>
            {imageFile ? (
              <p className="text-xs text-muted-foreground">
                {imageFile.name} — click the picture to change it
              </p>
            ) : null}
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Article title</Label>
            <Input
              id="title"
              value={title}
              placeholder="e.g. How Solar Water Pumps Cut Farming Costs"
              onChange={(e) => setTitle(e.target.value)}
            />
            {slug ? (
              <p className="text-xs text-muted-foreground">
                Web address: <span className="font-mono">/blog/{slug}</span>
              </p>
            ) : null}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Choose a category…</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="__custom__">+ New category…</option>
            </select>
            {category === "__custom__" ? (
              <Input
                value={customCategory}
                placeholder="Type the new category name"
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            ) : null}
          </div>

          {/* Excerpt (optional) */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="excerpt">
              Short summary{" "}
              <span className="font-normal text-muted-foreground">
                (optional — written automatically if left empty)
              </span>
            </Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              rows={2}
              maxLength={300}
              placeholder="One or two sentences shown on the blog list and homepage."
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          {/* Article text */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="article">Article text</Label>
            <Textarea
              id="article"
              value={articleText}
              rows={14}
              placeholder={
                "Paste the full article here.\n\nStart a section with a heading line like:\n## Why this matters\n\nSeparate paragraphs with a blank line. Bullet lines starting with - are kept as bullets."
              }
              onChange={(e) => setArticleText(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Lines starting with ## become section headings. Publish date is
              set to today automatically.
            </p>
          </div>

          {error ? (
            <p
              role="alert"
              className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3">
            <Button onClick={onPublish} disabled={publishing} size="lg">
              {publishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Publishing…
                </>
              ) : (
                <>
                  <UploadCloud className="mr-2 h-4 w-4" aria-hidden />
                  Publish article
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              After publishing, the preview may refresh for a few seconds —
              that's normal. The live site updates when you click Replit's
              Publish button.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
