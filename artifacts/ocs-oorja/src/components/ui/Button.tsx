

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

export function Button({ className, variant = "primary", size = "md", asChild, ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-12 px-8 text-base",
  } as const;

  const variants = {
    primary:
      "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 shadow-sm",
    secondary: "bg-foreground text-background hover:opacity-90",
    ghost: "bg-transparent hover:bg-foreground/5 border border-transparent",
    outline: "bg-transparent border border-foreground/15 text-foreground hover:bg-foreground/5",
  } as const;

  const Comp = (asChild ? Slot : "button") as React.ElementType;

  return <Comp className={cn(base, sizes[size], variants[variant], className)} {...props} />;
}

