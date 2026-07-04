import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex w-full rounded-md border border-foreground/15 bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
