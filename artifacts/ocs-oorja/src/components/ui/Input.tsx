import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm outline-none ring-0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
