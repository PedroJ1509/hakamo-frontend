import type { Metadata } from "next";
import { getDivisiones, getVacantes } from "@/lib/api";
import { JobsLanding } from "@/app/components/visual-kit/landing/jobs-landing";
import type { Division, Vacante } from "@/types";

export const metadata: Metadata = {
  title: "Empleos — Hakamo Outsourcing",
  description:
    "Vacantes abiertas en Hakamo. Postúlate a proyectos de construcción, energía e infraestructura o deja tu perfil.",
};

interface Props {
  searchParams: Promise<{ division?: string; tipo?: string }>;
}

async function loadJobs() {
  try {
    const [vacantesRes, divisionesRes] = await Promise.all([getVacantes(), getDivisiones()]);
    return {
      vacantes: (vacantesRes.data ?? []) as Vacante[],
      divisiones: (divisionesRes.data ?? []) as Division[],
    };
  } catch {
    return { vacantes: [] as Vacante[], divisiones: [] as Division[] };
  }
}

export default async function EmpleosPage({ searchParams }: Props) {
  const { division: divisionSlug, tipo } = await searchParams;
  const { vacantes, divisiones } = await loadJobs();

  let filtered = vacantes;
  if (divisionSlug) {
    filtered = filtered.filter((item) => item.division?.slug === divisionSlug);
  }
  if (tipo) {
    filtered = filtered.filter((item) => item.tipo === tipo);
  }

  return (
    <JobsLanding
      vacantes={filtered}
      divisiones={divisiones}
      divisionSlug={divisionSlug}
      tipo={tipo}
      total={vacantes.length}
    />
  );
}
