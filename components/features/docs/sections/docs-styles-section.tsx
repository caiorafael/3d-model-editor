import { DocsApiTable } from "../docs-api-table";
import { DocsCodeBlock } from "../docs-code-block";
import { DocsSection } from "../docs-section";

const MODEL_STYLE_ROWS = [
  {
    method: ".color(input)",
    description:
      "Define a cor da peça. Aceita hex (#22d3ee), RGB [r,g,b] ou RGBA [r,g,b,a].",
    example: ".color('#22d3ee')",
  },
  {
    method: ".position(x, y, z)",
    description: "Translada a geometria para a posição indicada no espaço 3D.",
    example: ".position(0, 0, 5)",
  },
  {
    method: ".rotation(x, y, z)",
    description: "Rotaciona em radianos nos eixos X, Y e Z.",
    example: ".rotation(0, 0, Math.PI / 4)",
  },
  {
    method: ".scale(x, y?, z?)",
    description:
      "Escala a geometria. Se y e z forem omitidos, usa escala uniforme.",
    example: ".scale(2) ou .scale(1, 1, 0.5)",
  },
];

const TEXT_STYLE_ROWS = [
  {
    method: ".font(name)",
    description:
      "Define a fonte do texto. Use TextFonts.SIMPLEX, TextFonts.CNC ou TextFonts.HELVETICA.",
    example: ".font(TextFonts.SIMPLEX)",
  },
  {
    method: ".size(value)",
    description: "Altura das letras em unidades do modelo. Padrão: 8.",
    example: ".size(10)",
  },
  {
    method: ".depth(value)",
    description:
      "Profundidade do corte (subtractText) ou altura do relevo (addText). Padrão: 1.5.",
    example: ".depth(1.5)",
  },
  {
    method: ".stroke(value)",
    description:
      "Espessura dos traços das letras. Valores maiores = letras mais grossas. Padrão: 0.4.",
    example: ".stroke(0.8)",
  },
  {
    method: ".color(input)",
    description:
      "Cor do texto visível (addText). Herdado de ModelStyle.",
    example: ".color('#f59e0b')",
  },
];

export const DocsStylesSection = () => {
  return (
    <>
      <DocsSection
        id="model-style"
        title="ModelStyle"
        description="Estiliza geometrias sólidas adicionadas via add(). Todos os métodos retornam this para encadeamento."
      >
        <DocsCodeBlock
          title="model-style.js"
          code={`const baseStyle = new ModelStyle()
  .color('#22d3ee')
  .position(0, 0, 0)
  .rotation(0, 0, Math.PI / 6)
  .scale(1.2);

model.add(cuboid({ size: [20, 20, 5] }), baseStyle);`}
        />
        <DocsApiTable rows={MODEL_STYLE_ROWS} />
      </DocsSection>

      <DocsSection
        id="text-style"
        title="TextStyle"
        description="Estende ModelStyle com opções específicas de texto. Usado em subtractText() e addText()."
      >
        <DocsCodeBlock
          title="text-style.js"
          code={`const cutStyle = new TextStyle()
  .font(TextFonts.SIMPLEX)
  .size(10)
  .depth(1.5)
  .stroke(0.8);

const labelStyle = new TextStyle()
  .font(TextFonts.SIMPLEX)
  .color('#f59e0b')
  .size(8)
  .depth(1)
  .stroke(0.6);`}
        />
        <DocsApiTable rows={TEXT_STYLE_ROWS} />
      </DocsSection>
    </>
  );
};
