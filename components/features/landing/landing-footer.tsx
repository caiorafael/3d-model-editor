import Link from "next/link";

const footerClasses =
  "border-t border-neutral-200 py-8 dark:border-neutral-800";

const containerClasses =
  "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row";

const textClasses = "text-sm text-neutral-400 dark:text-neutral-500";

const linkClasses =
  "text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100";

export const LandingFooter = () => {
  return (
    <footer className={footerClasses}>
      <div className={containerClasses}>
        <p className={textClasses}>
          3D Model System — Code-first 3D modeling
        </p>
        <Link href="/editor" className={linkClasses}>
          Abrir Editor →
        </Link>
      </div>
    </footer>
  );
};
