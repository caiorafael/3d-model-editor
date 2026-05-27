import { DocsFooter } from "./docs-footer";
import { DocsHeader } from "./docs-header";
import { DocsSidebar } from "./docs-sidebar";
import { DocsExampleSection } from "./sections/docs-example-section";
import { DocsIntroSection } from "./sections/docs-intro-section";
import { DocsLimitationsSection } from "./sections/docs-limitations-section";
import { DocsModelBuilderSection } from "./sections/docs-model-builder-section";
import { DocsOpenJscadSection } from "./sections/docs-openjscad-section";
import { DocsPlacementSection } from "./sections/docs-placement-section";
import { DocsQuickstartSection } from "./sections/docs-quickstart-section";
import { DocsStylesSection } from "./sections/docs-styles-section";
import { DocsTextFontsSection } from "./sections/docs-text-fonts-section";

const pageClasses = "min-h-full bg-neutral-50 dark:bg-neutral-950";

const heroClasses =
  "border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900";

const heroContainerClasses = "mx-auto max-w-7xl px-6 py-16";

const badgeClasses =
  "mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400";

const badgeDotClasses = "h-1.5 w-1.5 rounded-full bg-cyan-400";

const titleClasses =
  "text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl dark:text-neutral-100";

const subtitleClasses =
  "mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400";

const layoutClasses = "mx-auto max-w-7xl px-6 py-12";

const gridClasses = "grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]";

const contentClasses = "min-w-0 space-y-16";

export const DocsPage = () => {
  return (
    <div className={pageClasses}>
      <DocsHeader />

      <div className={heroClasses}>
        <div className={heroContainerClasses}>
          <div className={badgeClasses}>
            <span className={badgeDotClasses} />
            Referência para desenvolvedores
          </div>
          <h1 className={titleClasses}>Documentação</h1>
          <p className={subtitleClasses}>
            Aprenda a criar modelos 3D com código. Esta referência cobre a
            arquitetura do sistema, a API ModelBuilder e todos os comandos
            disponíveis no editor.
          </p>
        </div>
      </div>

      <div className={layoutClasses}>
        <div className={gridClasses}>
          <DocsSidebar />
          <article className={contentClasses}>
            <DocsIntroSection />
            <DocsQuickstartSection />
            <DocsModelBuilderSection />
            <DocsStylesSection />
            <DocsTextFontsSection />
            <DocsPlacementSection />
            <DocsOpenJscadSection />
            <DocsExampleSection />
            <DocsLimitationsSection />
          </article>
        </div>
      </div>

      <DocsFooter />
    </div>
  );
};
