interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Editor Monaco",
    description:
      "Experiência de IDE com syntax highlighting, numeração de linhas e atalhos familiares do VS Code.",
  },
  {
    title: "Preview em tempo real",
    description:
      "O modelo 3D atualiza automaticamente enquanto você digita, com debounce inteligente para performance.",
  },
  {
    title: "Motor OpenJSCAD",
    description:
      "Modelagem procedural com primitivas, CSG, extrusões e transformações — tudo via código JavaScript.",
  },
  {
    title: "Renderização Three.js",
    description:
      "Visualização 3D fluida com controles de órbita, grid, wireframe e iluminação realista.",
  },
  {
    title: "Exportação STL",
    description:
      "Gere arquivos STL prontos para slicers e impressoras 3D a partir do seu código.",
  },
  {
    title: "100% no browser",
    description:
      "Execução local sem backend. Seus modelos e código ficam na sua máquina.",
  },
];

const sectionClasses = "py-24";

const containerClasses = "mx-auto max-w-6xl px-6";

const headerClasses = "mb-16 text-center";

const eyebrowClasses = "mb-3 text-sm font-medium text-blue-500";

const titleClasses =
  "text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100";

const descriptionClasses =
  "mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-500 dark:text-neutral-400";

const gridClasses = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

const cardClasses =
  "rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900";

const iconClasses =
  "flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500";

const featureTitleClasses =
  "mt-4 text-base font-semibold text-neutral-900 dark:text-neutral-100";

const featureDescriptionClasses =
  "mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400";

export const LandingFeatures = () => {
  return (
    <section id="recursos" className={sectionClasses}>
      <div className={containerClasses}>
        <div className={headerClasses}>
          <p className={eyebrowClasses}>Recursos</p>
          <h2 className={titleClasses}>
            Tudo que você precisa para modelar com código
          </h2>
          <p className={descriptionClasses}>
            Ferramentas pensadas para desenvolvedores que querem controle total
            sobre a geometria 3D, com a praticidade de um ambiente moderno.
          </p>
        </div>

        <div className={gridClasses}>
          {features.map((feature) => (
            <article key={feature.title} className={cardClasses}>
              <div className={iconClasses}>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    d="M10 3L3 7v6l7 4 7-4V7l-7-4z"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className={featureTitleClasses}>{feature.title}</h3>
              <p className={featureDescriptionClasses}>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
