export const VIDEO_CATEGORIES = [
  "General",
  "Projects",
  "Installations",
  "Testimonials",
  "Events",
  "Behind the Scenes",
] as const;
export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

export type VideoEntry = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  type: string;
  url: string;
  thumbnail: string | null;
  duration: string | null;
  featured: boolean;
  sortOrder: number;
  createdAt: string | null;
};

export type VideoListResponse = {
  videos: VideoEntry[];
  total: number;
  page: number;
  hasMore: boolean;
};

export function parseVideoUrl(url: string): {
  type: "youtube" | "vimeo" | null;
  embedUrl: string | null;
  id: string | null;
} {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/,
  );
  if (yt)
    return {
      type: "youtube",
      id: yt[1] ?? null,
      embedUrl: `https://www.youtube.com/embed/${yt[1]}`,
    };

  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm)
    return {
      type: "vimeo",
      id: vm[1] ?? null,
      embedUrl: `https://player.vimeo.com/video/${vm[1]}`,
    };

  return { type: null, id: null, embedUrl: null };
}

/** Auto-capture a frame ~2 s into a video file and return it as a JPEG Blob. */
export async function captureVideoThumbnail(file: File): Promise<Blob | null> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.src = objectUrl;

    const cleanup = () => URL.revokeObjectURL(objectUrl);

    video.addEventListener("loadedmetadata", () => {
      video.currentTime = Math.min(2, video.duration * 0.1);
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        cleanup();
        resolve(null);
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          cleanup();
          resolve(blob);
        },
        "image/jpeg",
        0.85,
      );
    });

    video.addEventListener("error", () => {
      cleanup();
      resolve(null);
    });
  });
}

/** Upload a thumbnail Blob to the server and return the public URL. */
export async function uploadThumbnail(blob: Blob, filename = "thumb.jpg"): Promise<string | null> {
  const fd = new FormData();
  fd.append("thumbnail", blob, filename);
  const r = await fetch("/api/videos/upload-thumbnail", { method: "POST", body: fd });
  if (!r.ok) return null;
  const data = (await r.json()) as { url?: string };
  return data.url ?? null;
}

/** Read a video file's duration as a display string like "3:42". */
export async function getVideoDuration(file: File): Promise<string> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = objectUrl;
    video.addEventListener("loadedmetadata", () => {
      URL.revokeObjectURL(objectUrl);
      const secs = Math.round(video.duration);
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      resolve(`${m}:${String(s).padStart(2, "0")}`);
    });
    video.addEventListener("error", () => {
      URL.revokeObjectURL(objectUrl);
      resolve("");
    });
  });
}
