import { ReactNode } from "react";

interface DocsCalloutProps {
  variant?: "info" | "warning";
  title: string;
  children: ReactNode;
}

const baseClasses = "rounded-lg border p-4";

const variants = {
  info: "border-cyan-200 bg-cyan-50 dark:border-cyan-900/50 dark:bg-cyan-950/30",
  warning:
    "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30",
};

const titleClasses = "text-sm font-semibold text-neutral-900 dark:text-neutral-100";

const bodyClasses = "mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400";

export const DocsCallout = ({
  variant = "info",
  title,
  children,
}: DocsCalloutProps) => {
  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      <p className={titleClasses}>{title}</p>
      <div className={bodyClasses}>{children}</div>
    </div>
  );
};
