import { DocsApiTable } from "../docs-api-table";
import { DocsCallout } from "../docs-callout";
import { DocsCodeBlock } from "../docs-code-block";
import { DocsSection } from "../docs-section";

const paragraphClasses =
  "text-base leading-relaxed text-neutral-600 dark:text-neutral-400";

const PLACEMENT_ROWS = [
  {
    method: ".top()",
    description:
      "Ancora o corte na face superior da peça. Padrão para subtractText().",
  },
  {
    method: ".bottom()",
    description: "Ancora o corte na face inferior da peça.",
  },
  {
    method: ".center()",
    description:
      "Ancora no centro 3D da peça. Padrão para subtract() com formas geométricas.",
  },
  {
    method: ".left() / .right()",
    description: "Alinha horizontalmente (eixo X) na face selecionada.",
  },
  {
    method: ".front() / .back()",
    description: "Alinha no eixo Y na face selecionada.",
  },
  {
    method: ".offset(x, y, z)",
    description:
      "Deslocamento fino a partir do ponto de ancoragem calculado.",
    example: ".offset(-8, 0, 0)",
  },
  {
    method: ".at(x, y, z)",
    description:
      "Posição absoluta no espaço 3D. Ignora ancoragem automática.",
    example: ".at(10, -5, 2.5)",
  },
  {
    method: ".rotation(x, y, z)",
    description: "Rotaciona a ferramenta de corte em radianos.",
    example: ".rotation(0, 0, Math.PI / 2)",
  },
];

export const DocsPlacementSection = () => {
  return (
    <DocsSection
      id="cut-placement"
      title="CutPlacement"
      description="Controla onde cortes geométricos e de texto serão aplicados na peça alvo."
    >
      <p className={paragraphClasses}>
        CutPlacement usa API fluente — encadeie métodos para definir face,
        alinhamento e ajustes finos. Passado como segundo ou terceiro argumento
        em subtract() e subtractText().
      </p>

      <DocsCodeBlock
        title="placement.js"
        code={`// Furo centralizado no meio da peça
model.subtract(
  cylinder({ radius: 5, height: 10 }),
  new CutPlacement().center(),
);

// Texto gravado no topo, deslocado à esquerda
model.subtractText(
  '3D',
  cutStyle,
  new CutPlacement().top().offset(-8, 0, 0),
);

// Corte no canto superior direito
model.subtract(
  cuboid({ size: [5, 5, 10] }),
  new CutPlacement().top().right().back(),
);`}
      />

      <DocsApiTable rows={PLACEMENT_ROWS} />

      <DocsCallout title="Comportamento padrão">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>subtract()</strong> sem placement → centro 3D da peça
          </li>
          <li>
            <strong>subtractText()</strong> sem placement → topo central da peça
          </li>
        </ul>
      </DocsCallout>
    </DocsSection>
  );
};
