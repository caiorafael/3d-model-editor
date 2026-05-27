import { DocsApiTable } from "../docs-api-table";
import { DocsCallout } from "../docs-callout";
import { DocsCodeBlock } from "../docs-code-block";
import { DocsSection } from "../docs-section";

const TEXT_FONTS_ROWS = [
  {
    method: "TextFonts.SIMPLEX",
    description:
      "Fonte padrão. Leve e recomendada para a maioria dos casos. Melhor desempenho.",
  },
  {
    method: "TextFonts.CNC",
    description: "Fonte estilo CNC/máquina. Mais detalhada, gera mais geometria.",
  },
  {
    method: "TextFonts.HELVETICA",
    description: "Fonte sans-serif clássica. Visual limpo, geometria mais pesada.",
  },
  {
    method: "TextFonts.list()",
    description: "Retorna array com os nomes de todas as fontes disponíveis.",
  },
  {
    method: "TextFonts.register(name, font)",
    description:
      "Registra uma fonte Hershey customizada. Avançado — requer objeto de fonte compatível.",
  },
];

export const DocsTextFontsSection = () => {
  return (
    <DocsSection
      id="text-fonts"
      title="TextFonts"
      description="Registry de fontes vetoriais Hershey compatíveis com OpenJSCAD."
    >
      <DocsCodeBlock
        title="fonts.js"
        code={`const { TextFonts } = require('@jscad/modeling');

// Fontes disponíveis
console.log(TextFonts.list()); // ['simplex', 'cnc', 'helvetica']

const style = new TextStyle().font(TextFonts.SIMPLEX);`}
      />

      <DocsApiTable rows={TEXT_FONTS_ROWS} />

      <DocsCallout title="Desempenho">
        <p>
          Prefira <strong>TextFonts.SIMPLEX</strong> quando o modelo estiver
          pesado. Fontes CNC e Helvetica geram significativamente mais
          polígonos, o que pode afetar a renderização em tempo real.
        </p>
      </DocsCallout>
    </DocsSection>
  );
};
