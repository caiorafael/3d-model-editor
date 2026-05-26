import { LinkButton } from "@/components/ui/link-button";

const sectionClasses =
  "border-t border-neutral-200 bg-neutral-100/50 py-24 dark:border-neutral-800 dark:bg-neutral-900/30";

const containerClasses =
  "mx-auto max-w-6xl px-6 text-center";

const cardClasses =
  "mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-12 shadow-md dark:border-neutral-800 dark:bg-neutral-900";

const titleClasses =
  "text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100";

const descriptionClasses =
  "mx-auto mt-4 max-w-md text-base leading-relaxed text-neutral-500 dark:text-neutral-400";

const quoteClasses =
  "mt-8 border-l-2 border-cyan-400 pl-4 text-left text-sm italic leading-relaxed text-neutral-500 dark:text-neutral-400";

const actionsClasses = "mt-8 flex justify-center";

export const LandingCta = () => {
  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        <div className={cardClasses}>
          <h2 className={titleClasses}>Pronto para modelar?</h2>
          <p className={descriptionClasses}>
            Abra o editor, escreva seu primeiro modelo e veja o resultado em
            tempo real. Sem cadastro, sem configuração.
          </p>

          <blockquote className={quoteClasses}>
            &ldquo;O código é a fonte da verdade. A visualização 3D é derivada
            da execução.&rdquo;
          </blockquote>

          <div className={actionsClasses}>
            <LinkButton href="/editor" size="lg">
              Abrir Editor
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
};
