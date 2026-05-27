import { DOCS_NAV_ITEMS } from "@/utils/docs-navigation";

const asideClasses = "hidden lg:block";

const stickyClasses = "sticky top-24";

const titleClasses =
  "text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500";

const listClasses = "mt-4 space-y-1";

const linkClasses =
  "block rounded-md px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100";

export const DocsSidebar = () => {
  return (
    <aside className={asideClasses}>
      <div className={stickyClasses}>
        <p className={titleClasses}>Nesta página</p>
        <nav className={listClasses}>
          {DOCS_NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={linkClasses}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};
