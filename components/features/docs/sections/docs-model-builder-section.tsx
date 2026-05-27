import { DocsApiTable } from "../docs-api-table";
import { DocsCallout } from "../docs-callout";
import { DocsCodeBlock } from "../docs-code-block";
import { DocsSection } from "../docs-section";

const paragraphClasses =
  "text-base leading-relaxed text-neutral-600 dark:text-neutral-400";

const MODEL_BUILDER_ROWS = [
  {
    method: "add(geometry, style?)",
    description:
      "Adiciona uma geometria 3D ao modelo. Aceita um ModelStyle opcional para cor, posição, rotação e escala.",
    example: "model.add(cuboid({ size: [10, 10, 5] }), style)",
  },
  {
    method: "subtract(geometry, placement?)",
    description:
      "Subtrai uma forma geométrica da última peça adicionada. Use CutPlacement para posicionar o corte.",
    example: "model.subtract(cylinder({ radius: 3, height: 10 }), placement)",
  },
  {
    method: "subtractText(content, style?, placement?)",
    description:
      "Grava texto na última peça, subtraindo-o da superfície. Controla fonte, tamanho, profundidade e espessura via TextStyle.",
    example: "model.subtractText('ABC', textStyle, placement)",
  },
  {
    method: "addText(content, style?)",
    description:
      "Adiciona texto em relevo sobre a última peça. Posicionado automaticamente no topo central.",
    example: "model.addText('logo', labelStyle)",
  },
  {
    method: "build()",
    description:
      "Finaliza o modelo e retorna um ModelBuildResult com todas as partes coloridas.",
    example: "return model.build()",
  },
];

const BUILD_RESULT_ROWS = [
  {
    method: "getParts()",
    description:
      "Retorna array de StyledPart — cada parte tem geometry e colorHex. Usado internamente pelo viewer.",
  },
  {
    method: "toGeometry()",
    description:
      "Une todas as partes em uma única geometria via boolean union.",
  },
];

export const DocsModelBuilderSection = () => {
  return (
    <DocsSection
      id="model-builder"
      title="ModelBuilder"
      description="Classe principal para construir modelos com múltiplas partes, cortes e texto. Encadeie métodos e finalize com build()."
    >
      <DocsCodeBlock
        title="exemplo.js"
        code={`const model = new ModelBuilder();

model.add(baseGeometry, baseStyle);
model.subtract(holeTool, holePlacement);
model.subtractText('3D', cutStyle, textPlacement);
model.addText('logo', labelStyle);

return model.build();`}
      />

      <DocsApiTable rows={MODEL_BUILDER_ROWS} />

      <DocsCallout title="Ordem importa">
        <p>
          subtract() e subtractText() sempre afetam a <strong>última peça</strong>{" "}
          adicionada via add(). Adicione a base primeiro, depois aplique os
          cortes na sequência desejada.
        </p>
      </DocsCallout>

      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        ModelBuildResult
      </h3>
      <p className={paragraphClasses}>
        Retornado por build(). Representa o modelo final pronto para renderização.
      </p>
      <DocsApiTable rows={BUILD_RESULT_ROWS} />
    </DocsSection>
  );
};
