import { DocsCallout } from "../docs-callout";
import { DocsCodeBlock } from "../docs-code-block";
import { DocsSection } from "../docs-section";

const paragraphClasses =
  "text-base leading-relaxed text-neutral-600 dark:text-neutral-400";

const listClasses =
  "list-disc space-y-2 pl-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400";

const subheadingClasses =
  "text-lg font-medium text-neutral-900 dark:text-neutral-100";

export const DocsIntroSection = () => {
  return (
    <>
      <DocsSection
        id="introducao"
        title="Introdução"
        description="O 3D Model System é um editor code-first para criação de modelos 3D destinados à impressão. O código é a única fonte de verdade — a visualização é sempre derivada da execução do código."
      >
        <p className={paragraphClasses}>
          Em vez de modelar por cliques em uma interface gráfica, você descreve
          geometrias proceduralmente usando JavaScript e a API OpenJSCAD. O
          sistema executa seu código no navegador, converte o resultado em malha
          3D e renderiza em tempo real no viewer.
        </p>

        <DocsCallout title="Filosofia code-first">
          <p>
            Código → Geometria → Visualização → STL. O arquivo STL é um
            formato de saída, nunca a fonte primária do modelo. Isso garante
            modelos reproduzíveis, versionáveis e fáceis de automatizar.
          </p>
        </DocsCallout>

        <h3 className={subheadingClasses}>Para quem é esta documentação</h3>
        <ul className={listClasses}>
          <li>Desenvolvedores que querem criar modelos 3D via código</li>
          <li>Usuários de impressão 3D familiarizados com JavaScript</li>
          <li>Quem precisa de modelos paramétricos e repetíveis</li>
        </ul>
      </DocsSection>

      <DocsSection
        id="como-funciona"
        title="Como funciona"
        description="Entenda o fluxo completo desde a escrita do código até a renderização no canvas."
      >
        <DocsCodeBlock
          title="fluxo.txt"
          code={`Editor (Monaco) → JSCAD Engine → Geometry Converter → Viewer (R3F) → Canvas

1. Você escreve código com main()
2. O engine executa o código no browser
3. OpenJSCAD gera geometrias 3D (geom3)
4. O converter transforma em malhas coloridas
5. O viewer renderiza com Three.js / React Three Fiber
6. Atualizações automáticas com debounce de 400ms`}
        />

        <h3 className={subheadingClasses}>APIs expostas ao seu código</h3>
        <p className={paragraphClasses}>
          Ao usar{" "}
          <code className="font-mono text-sm text-cyan-600 dark:text-cyan-400">
            require(&apos;@jscad/modeling&apos;)
          </code>
          , você tem acesso às primitivas OpenJSCAD e às classes do sistema:
          ModelBuilder, ModelStyle, TextStyle, CutPlacement e TextFonts.
        </p>
      </DocsSection>
    </>
  );
};
