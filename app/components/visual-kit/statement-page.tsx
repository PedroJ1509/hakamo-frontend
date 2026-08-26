import type { ReactNode } from "react";

export function StatementPage({
  kicker,
  title,
  children,
  header,
  footer,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-night text-paper">
      {header}
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-20 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.32em] text-glow">{kicker}</p>
        <h1 className="font-display mt-4 text-5xl leading-[0.92] sm:text-6xl">{title}</h1>
        {children ? <div className="mt-6">{children}</div> : null}
      </main>
      {footer}
    </div>
  );
}
