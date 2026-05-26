import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const baseClasses =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors";

const stateClasses = {
  default:
    "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200",
  active: "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100",
};

export const IconButton = ({
  children,
  label,
  active = false,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`${baseClasses} ${active ? stateClasses.active : stateClasses.default}`}
    >
      {children}
    </button>
  );
};
