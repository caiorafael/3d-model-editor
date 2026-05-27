import { DocsSection } from "../docs-section";

const listClasses =
  "list-disc space-y-2 pl-5 text-base leading-relaxed text-neutral-600 dark:text-neutral-400";

export const DocsLimitationsSection = () => {
  return (
    <DocsSection
      id="limitacoes"
      title="Limitações"
      description="Conheça os limites atuais do sistema para evitar surpresas durante o desenvolvimento."
    >
      <ul className={listClasses}>
        <li>
          Execução no browser — modelos muito complexos podem degradar a
          performance de renderização
        </li>
        <li>
          Fontes CNC e Helvetica geram mais polígonos que Simplex
        </li>
        <li>
          subtract() e subtractText() afetam apenas a última peça adicionada
        </li>
        <li>
          Conversão STL → código é experimental e pode ser imprecisa
        </li>
        <li>
          Sem persistência de projetos na versão atual — código existe apenas na
          sessão do editor
        </li>
        <li>
          Código deve exportar main() — scripts sem essa função não executam
        </li>
      </ul>
    </DocsSection>
  );
};
