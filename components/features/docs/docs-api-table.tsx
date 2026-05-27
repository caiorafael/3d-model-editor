import type { DocApiRow } from "@/interfaces/docs.interface";

interface DocsApiTableProps {
  rows: DocApiRow[];
}

const tableClasses =
  "w-full overflow-hidden rounded-lg border border-neutral-200 text-sm dark:border-neutral-800";

const headClasses = "bg-neutral-50 dark:bg-neutral-900";

const thClasses =
  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400";

const tdClasses =
  "border-t border-neutral-200 px-4 py-3 align-top text-neutral-700 dark:border-neutral-800 dark:text-neutral-300";

const methodClasses = "font-mono text-[13px] text-cyan-600 dark:text-cyan-400";

const exampleClasses = "mt-1 font-mono text-xs text-neutral-400 dark:text-neutral-500";

export const DocsApiTable = ({ rows }: DocsApiTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className={tableClasses}>
        <thead className={headClasses}>
          <tr>
            <th className={thClasses}>Método</th>
            <th className={thClasses}>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.method}>
              <td className={tdClasses}>
                <code className={methodClasses}>{row.method}</code>
                {row.example ? (
                  <p className={exampleClasses}>{row.example}</p>
                ) : null}
              </td>
              <td className={tdClasses}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
