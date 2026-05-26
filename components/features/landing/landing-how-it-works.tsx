interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

const steps: WorkflowStep[] = [
  {
    number: "01",
    title: "Escreva o código",
    description:
      "Use OpenJSCAD com primitivas, operações booleanas e transformações para definir sua geometria.",
  },
  {
    number: "02",
    title: "Execute no browser",
    description:
      "O código roda localmente no navegador — sem servidor, sem instalação, sem dependências externas.",
  },
  {
    number: "03",
    title: "Gere a geometria",
    description:
      "O motor JSCAD processa seu código e produz a malha 3D pronta para visualização.",
  },
  {
    number: "04",
    title: "Visualize em tempo real",
    description:
      "O preview 3D atualiza automaticamente conforme você edita, com controles de câmera e grid.",
  },
  {
    number: "05",
    title: "Exporte para STL",
    description:
      "Quando estiver satisfeito, exporte o modelo final no formato padrão para impressão 3D.",
  },
];

const sectionClasses =
  "border-t border-neutral-200 bg-neutral-100/50 py-24 dark:border-neutral-800 dark:bg-neutral-900/30";

const containerClasses = "mx-auto max-w-6xl px-6";

const headerClasses = "mb-16 max-w-2xl";

const eyebrowClasses =
  "mb-3 text-sm font-medium text-blue-500";

const titleClasses =
  "text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100";

const descriptionClasses =
  "mt-4 text-base leading-relaxed text-neutral-500 dark:text-neutral-400";

const gridClasses = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

const cardClasses =
  "rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900";

const numberClasses =
  "font-mono text-sm font-medium text-cyan-400";

const stepTitleClasses =
  "mt-3 text-base font-semibold text-neutral-900 dark:text-neutral-100";

const stepDescriptionClasses =
  "mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400";

export const LandingHowItWorks = () => {
  return (
    <section id="como-funciona" className={sectionClasses}>
      <div className={containerClasses}>
        <div className={headerClasses}>
          <p className={eyebrowClasses}>Como funciona</p>
          <h2 className={titleClasses}>
            Do código ao modelo 3D em cinco passos
          </h2>
          <p className={descriptionClasses}>
            O sistema segue uma abordagem code-first: o código é a fonte da
            verdade e a visualização 3D é derivada da execução. STL é apenas o
            formato de saída.
          </p>
        </div>

        <div className={gridClasses}>
          {steps.map((step) => (
            <article key={step.number} className={cardClasses}>
              <span className={numberClasses}>{step.number}</span>
              <h3 className={stepTitleClasses}>{step.title}</h3>
              <p className={stepDescriptionClasses}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
