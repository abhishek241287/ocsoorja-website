import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-500">
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-foreground/70">{subtitle}</p>
      )}
    </div>
  );
}
