import { EXAMPLE_JSCAD_CODE } from "@/utils/example-jscad-code";
import { DocsCallout } from "../docs-callout";
import { DocsCodeBlock } from "../docs-code-block";
import { DocsSection } from "../docs-section";

const listClasses =
  "list-disc space-y-2 pl-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400";

export const DocsExampleSection = () => {
  return (
    <DocsSection
      id="exemplo-completo"
      title="Exemplo completo"
      description="Modelo de referência usado no editor. Combina base colorida, furo cilíndrico, gravação de texto e label em relevo."
    >
      <DocsCodeBlock title="main.jscad" code={EXAMPLE_JSCAD_CODE} />

      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        O que este exemplo demonstra
      </h3>
      <ul className={listClasses}>
        <li>Base ciano com cuboid de 40×40×5</li>
        <li>Furo cilíndrico centralizado via subtract() + CutPlacement.center()</li>
        <li>Gravação &quot;3D&quot; com subtractText(), fonte Simplex e offset lateral</li>
        <li>Label &quot;texto&quot; em relevo laranja via addText()</li>
        <li>Duas partes coloridas renderizadas separadamente no viewer</li>
      </ul>

      <DocsCallout title="Experimente no editor">
        <p>
          Abra o editor em{" "}
          <a
            href="/editor"
            className="font-medium text-blue-500 hover:text-blue-600"
          >
            /editor
          </a>
          , modifique os valores de size, depth, stroke e offset, e observe a
          atualização em tempo real no viewer 3D.
        </p>
      </DocsCallout>
    </DocsSection>
  );
};
