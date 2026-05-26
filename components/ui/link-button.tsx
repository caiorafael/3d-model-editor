import Link from "next/link";
import { ReactNode } from "react";

interface LinkButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors";

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const variantClasses = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
  ghost:
    "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800",
};

export const LinkButton = ({
  children,
  href,
  variant = "primary",
  size = "md",
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {children}
    </Link>
  );
};
