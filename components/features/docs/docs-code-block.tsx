interface DocsCodeBlockProps {
  title?: string;
  code: string;
}

const panelClasses =
  "overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900";

const headerClasses =
  "flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950";

const dotClasses = "h-2.5 w-2.5 rounded-full";

const titleClasses =
  "ml-2 font-mono text-xs text-neutral-400 dark:text-neutral-500";

const bodyClasses =
  "overflow-x-auto p-5 font-mono text-[13px] leading-6 text-neutral-700 dark:text-neutral-300";

export const DocsCodeBlock = ({ title, code }: DocsCodeBlockProps) => {
  return (
    <div className={panelClasses}>
      {title ? (
        <div className={headerClasses}>
          <span className={`${dotClasses} bg-red-400`} />
          <span className={`${dotClasses} bg-amber-400`} />
          <span className={`${dotClasses} bg-emerald-400`} />
          <span className={titleClasses}>{title}</span>
        </div>
      ) : null}
      <pre className={bodyClasses}>
        <code>{code}</code>
      </pre>
    </div>
  );
};
