import type { ReactNode } from "react";
import { kickerClass, mutedClass, panelCard } from "@/lib/visual-kit/styles";

export function FormSection({
  kicker,
  title,
  text,
  children,
}: {
  kicker: string;
  title: string;
  text?: string;
  children: ReactNode;
}) {
  return (
    <div className={`${panelCard} space-y-5`}>
      <div>
        <p className={kickerClass}>{kicker}</p>
        <h2 className="font-display mt-2 text-2xl">{title}</h2>
        {text ? <p className={`mt-2 ${mutedClass}`}>{text}</p> : null}
      </div>
      {children}
    </div>
  );
}
