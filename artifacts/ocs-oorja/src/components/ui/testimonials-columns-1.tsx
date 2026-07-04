

import React from "react";
import { motion } from "framer-motion";

export type TestimonialItem = {
  text: string;
  name: string;
  role: string;
  gender: "male" | "female";
};

export function TestimonialsColumn(props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) {
  const { className, testimonials, duration = 10 } = props;

  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, gender, name, role }, i) => (
              <div
                className="group relative w-full max-w-xs rounded-3xl p-8 sm:p-10 transition-all
                 border border-foreground/10 bg-foreground/[0.02] dark:bg-foreground/[0.04]
                 supports-[backdrop-filter]:bg-foreground/5 supports-[backdrop-filter]:backdrop-blur-md
                 shadow-sm hover:shadow-lg hover:ring-1 hover:ring-emerald-400/15"
                key={`${index}-${i}`}
              >
                {/* Subtle gradient accent on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100
                  bg-[radial-gradient(120%_60%_at_0%_0%,rgba(16,185,129,0.08),transparent_60%),radial-gradient(120%_60%_at_100%_0%,rgba(6,182,212,0.08),transparent_60%)]"
                />
                <div className="text-sm leading-relaxed text-foreground/90">{text}</div>
                <div className="mt-5 flex items-center gap-2">
                  <ProfileBadge gender={gender} />
                  <div className="flex flex-col">
                    <div className="font-medium leading-5 tracking-tight">{name}</div>
                    <div className="leading-5 tracking-tight opacity-60">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

function ProfileBadge({ gender }: { gender: "male" | "female" }) {
  const baseClasses =
    gender === "male"
      ? "bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600"
      : "bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600";

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-lg shadow-black/15 ${baseClasses}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 12.25c2.623 0 4.75-2.127 4.75-4.75S14.623 2.75 12 2.75 7.25 4.877 7.25 7.5 9.377 12.25 12 12.25Zm0 2c-3.509 0-7.25 1.766-7.25 4.75v1.25c0 .414.336.75.75.75h13c.414 0 .75-.336.75-.75V19c0-2.984-3.741-4.75-7.25-4.75Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
