import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
import { CubeIcon } from "@/components/features/editor/editor-icons";

const headerClasses =
  "sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80";

const containerClasses =
  "mx-auto flex h-14 max-w-7xl items-center justify-between px-6";

const logoClasses = "flex items-center gap-2.5";

const logoIconClasses =
  "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white";

const titleClasses = "text-sm font-semibold text-neutral-900 dark:text-neutral-100";

const navClasses = "hidden items-center gap-6 md:flex";

const navLinkClasses =
  "text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100";

const activeLinkClasses =
  "text-sm font-medium text-neutral-900 dark:text-neutral-100";

export const DocsHeader = () => {
  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        <Link href="/" className={logoClasses}>
          <div className={logoIconClasses}>
            <CubeIcon />
          </div>
          <span className={titleClasses}>3D Model System</span>
        </Link>

        <nav className={navClasses}>
          <Link href="/" className={navLinkClasses}>
            Início
          </Link>
          <span className={activeLinkClasses}>Documentação</span>
          <Link href="/editor" className={navLinkClasses}>
            Editor
          </Link>
        </nav>

        <LinkButton href="/editor" size="sm">
          Abrir Editor
        </LinkButton>
      </div>
    </header>
  );
};
