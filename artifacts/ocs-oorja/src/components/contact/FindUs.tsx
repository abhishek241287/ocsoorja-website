import { useState } from "react";
import { Check, Clipboard, Compass, ExternalLink, MapPin } from "lucide-react";

// Exact entrance coordinates — right-click pin in Google Maps → "Copy coordinates"
const LAT = "26.796090";
const LNG = "81.003596";
const COORDS = `${LAT},${LNG}`;

const EMBED_URL = `https://www.google.com/maps?q=${COORDS}&z=17&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${COORDS}`;
const OPEN_URL = `https://www.google.com/maps?q=${COORDS}`;

const ADDRESS_LINES = [
  "OCS OORJA Green Private Limited",
  "Commercial Unit No. 304, 3rd Floor",
  "Royal Plaza, Block-3, IT Park-2",
  "Sushant Golf City, Lucknow – 226030",
  "Uttar Pradesh, India",
];

const COPY_TEXT = ADDRESS_LINES.join("\n");

export function FindUs() {
  const [copied, setCopied] = useState(false);

  function copyAddress() {
    navigator.clipboard.writeText(COPY_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <section className="mt-5 rounded-2xl border border-foreground/10 p-5 sm:p-6">
      {/* Section heading */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <MapPin className="h-4 w-4 text-primary-strong" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Find Us</h3>
          <p className="text-xs text-muted-foreground">Exact entrance — IT Park-2, Lucknow</p>
        </div>
      </div>

      {/* Embedded map */}
      <div className="overflow-hidden rounded-xl border border-border shadow-sm">
        <div className="aspect-[4/3] w-full sm:aspect-[16/10]">
          <iframe
            title="OCS OORJA office — Google Map"
            src={EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </div>

      {/* Address below map */}
      <div className="mt-4 flex items-start gap-2 text-sm text-foreground/80">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-strong" />
        <address className="not-italic leading-relaxed">
          {ADDRESS_LINES.map((line, i) => (
            <span key={i} className={i === 0 ? "block font-semibold text-foreground" : "block"}>
              {line}
            </span>
          ))}
        </address>
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        {/* Get Directions */}
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Compass className="h-4 w-4 transition-transform group-hover:rotate-12" />
          Get Directions
        </a>

        {/* Open in Google Maps (no navigation mode) */}
        <a
          href={OPEN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary/80 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ExternalLink className="h-4 w-4" />
          Open in Google Maps
        </a>

        {/* Copy address */}
        <button
          type="button"
          onClick={copyAddress}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary/80 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-primary-strong" />
              <span className="text-primary-strong">Copied!</span>
            </>
          ) : (
            <>
              <Clipboard className="h-4 w-4" />
              Copy Address
            </>
          )}
        </button>
      </div>
    </section>
  );
}
