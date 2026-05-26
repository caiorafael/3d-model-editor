import { LinkButton } from "@/components/ui/link-button";
import { CubeIcon } from "@/components/features/editor/editor-icons";

const headerClasses =
  "sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80";

const containerClasses = "mx-auto flex h-14 max-w-6xl items-center justify-between px-6";

const logoClasses = "flex items-center gap-2.5";

const logoIconClasses =
  "flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white";

const titleClasses = "text-sm font-semibold text-neutral-900 dark:text-neutral-100";

const navClasses = "hidden items-center gap-6 md:flex";

const navLinkClasses =
  "text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100";

const actionsClasses = "flex items-center gap-3";

export const LandingHeader = () => {
  return (
    <header className={headerClasses}>
      <div className={containerClasses}>
        <div className={logoClasses}>
          <div className={logoIconClasses}>
            <CubeIcon />
          </div>
          <span className={titleClasses}>3D Model System</span>
        </div>

        <nav className={navClasses}>
          <a href="#como-funciona" className={navLinkClasses}>
            Como funciona
          </a>
          <a href="#recursos" className={navLinkClasses}>
            Recursos
          </a>
        </nav>

        <div className={actionsClasses}>
          <LinkButton href="/editor" variant="secondary" size="sm">
            Abrir Editor
          </LinkButton>
          <LinkButton href="/editor" size="sm">
            Começar agora
          </LinkButton>
        </div>
      </div>
    </header>
  );
};
