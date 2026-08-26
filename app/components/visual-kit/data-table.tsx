import type { ReactNode } from "react";
import type { TableColumn } from "@/lib/visual-kit/types";

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  empty,
}: {
  columns: TableColumn<T>[];
  rows: T[];
  empty?: ReactNode;
}) {
  if (rows.length === 0) return empty ?? null;

  return (
    <div className="overflow-x-auto rounded-[1.5rem] border border-ink/8 bg-white shadow-[0_18px_50px_color-mix(in_srgb,var(--ink)_5%,transparent)]">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-ink/8 text-[11px] uppercase tracking-[0.18em] text-accent">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-ink/8 transition hover:bg-glow/8">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-ink">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
