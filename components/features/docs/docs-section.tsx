import { ReactNode } from "react";

interface DocsSectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

const sectionClasses = "scroll-mt-24 border-b border-neutral-200 pb-16 last:border-b-0 dark:border-neutral-800";

const titleClasses =
  "text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100";

const descriptionClasses =
  "mt-3 text-base leading-relaxed text-neutral-500 dark:text-neutral-400";

const contentClasses = "mt-8 space-y-6";

export const DocsSection = ({
  id,
  title,
  description,
  children,
}: DocsSectionProps) => {
  return (
    <section id={id} className={sectionClasses}>
      <h2 className={titleClasses}>{title}</h2>
      {description ? (
        <p className={descriptionClasses}>{description}</p>
      ) : null}
      <div className={contentClasses}>{children}</div>
    </section>
  );
};
