import { LinkButton } from "@/components/ui/link-button";
import { EXAMPLE_JSCAD_CODE } from "@/utils/example-jscad-code";

const sectionClasses =
  "mx-auto max-w-6xl px-6 pb-24 pt-16 md:pb-32 md:pt-24";

const gridClasses =
  "grid items-center gap-12 md:grid-cols-2 md:gap-16";

const badgeClasses =
  "mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400";

const badgeDotClasses = "h-1.5 w-1.5 rounded-full bg-cyan-400";

const headingClasses =
  "text-4xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-100";

const highlightClasses = "text-blue-500";

const descriptionClasses =
  "mt-6 max-w-lg text-base leading-relaxed text-neutral-500 dark:text-neutral-400";

const actionsClasses = "mt-8 flex flex-wrap items-center gap-4";

const codePanelClasses =
  "overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900";

const codeHeaderClasses =
  "flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950";

const codeDotClasses = "h-2.5 w-2.5 rounded-full";

const codeTitleClasses =
  "ml-2 font-mono text-xs text-neutral-400 dark:text-neutral-500";

const codeBodyClasses =
  "overflow-x-auto p-5 font-mono text-[13px] leading-6 text-neutral-700 dark:text-neutral-300";

export const LandingHero = () => {
  return (
    <section className={sectionClasses}>
      <div className={gridClasses}>
        <div>
          <div className={badgeClasses}>
            <span className={badgeDotClasses} />
            Code-first 3D modeling
          </div>

          <h1 className={headingClasses}>
            Transforme código em{" "}
            <span className={highlightClasses}>modelos 3D</span> prontos para
            impressão
          </h1>

          <p className={descriptionClasses}>
            Um editor IDE para desenvolvedores que trabalham com impressão 3D.
            Escreva OpenJSCAD, visualize em tempo real e exporte STL — tudo
            direto no navegador, sem backend.
          </p>

          <div className={actionsClasses}>
            <LinkButton href="/editor" size="lg">
              Abrir Editor
            </LinkButton>
            <LinkButton href="#como-funciona" variant="ghost" size="lg">
              Ver como funciona
            </LinkButton>
          </div>
        </div>

        <div className={codePanelClasses}>
          <div className={codeHeaderClasses}>
            <span className={`${codeDotClasses} bg-red-400`} />
            <span className={`${codeDotClasses} bg-amber-400`} />
            <span className={`${codeDotClasses} bg-emerald-400`} />
            <span className={codeTitleClasses}>main.jscad</span>
          </div>
          <pre className={codeBodyClasses}>
            <code>{EXAMPLE_JSCAD_CODE}</code>
          </pre>
        </div>
      </div>
    </section>
  );
};
