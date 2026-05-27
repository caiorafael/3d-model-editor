import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const cardClasses =
  "rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900";

export const Card = ({ children, className = "", onClick }: CardProps) => {
  return (
    <div className={`${cardClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
