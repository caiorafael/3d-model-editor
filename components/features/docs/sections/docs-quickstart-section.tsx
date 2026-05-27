import { DocsCallout } from "../docs-callout";
import { DocsCodeBlock } from "../docs-code-block";
import { DocsSection } from "../docs-section";

const paragraphClasses =
  "text-base leading-relaxed text-neutral-600 dark:text-neutral-400";

const listClasses =
  "list-disc space-y-2 pl-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400";

export const DocsQuickstartSection = () => {
  return (
    <DocsSection
      id="primeiros-passos"
      title="Primeiros passos"
      description="Todo modelo deve exportar uma função main() que retorna a geometria final."
    >
      <p className={paragraphClasses}>
        A estrutura mínima de um script válido no editor:
      </p>

      <DocsCodeBlock
        title="main.jscad"
        code={`const { ModelBuilder, cuboid } = require('@jscad/modeling');

const main = () => {
  const model = new ModelBuilder();
  model.add(cuboid({ size: [20, 20, 5] }));
  return model.build();
};

module.exports = { main };`}
      />

      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Regras obrigatórias
      </h3>
      <ul className={listClasses}>
        <li>
          <strong>main()</strong> deve existir e ser exportada via{" "}
          <code className="font-mono text-sm">module.exports</code>
        </li>
        <li>
          O retorno pode ser um <strong>ModelBuildResult</strong>,{" "}
          <strong>ModelBuilder</strong>, uma geometria ou um array de
          geometrias
        </li>
        <li>
          Use <strong>ModelBuilder</strong> quando precisar de múltiplas partes
          com cores diferentes
        </li>
      </ul>

      <DocsCallout variant="warning" title="Erros comuns">
        <ul className="list-disc space-y-1 pl-5">
          <li>Esquecer de chamar model.build() no final</li>
          <li>Chamar subtractText() antes de add() — é necessário ter uma base</li>
          <li>Retornar string ou objeto inválido em main()</li>
        </ul>
      </DocsCallout>
    </DocsSection>
  );
};
