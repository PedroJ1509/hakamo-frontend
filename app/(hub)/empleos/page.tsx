import type { Metadata } from "next";
import { getDivisiones, getVacantes } from "@/lib/api";
import { DEMO_DIVISIONES, DEMO_VACANTES, withJobImages } from "@/lib/demo-vacantes";
import { JobsLanding } from "@/app/components/visual-kit/landing/jobs-landing";
import type { Division, Vacante } from "@/types";

export const metadata: Metadata = {
  title: "Empleos — Hakamo",
  description:
    "Vacantes abiertas en Hakamo. Postúlate a proyectos de construcción, energía e infraestructura o deja tu perfil.",
};

async function loadJobs() {
  try {
    const [vacantesRes, divisionesRes] = await Promise.all([getVacantes(), getDivisiones()]);
    const vacantes = (vacantesRes.data ?? []) as Vacante[];
    const divisiones = (divisionesRes.data ?? []) as Division[];
    return {
      vacantes: withJobImages(vacantes.length >= 6 ? vacantes : DEMO_VACANTES),
      divisiones: divisiones.length > 0 ? divisiones : DEMO_DIVISIONES,
    };
  } catch {
    return {
      vacantes: withJobImages(DEMO_VACANTES),
      divisiones: DEMO_DIVISIONES,
    };
  }
}

export default async function EmpleosPage() {
  const { vacantes, divisiones } = await loadJobs();

  return <JobsLanding vacantes={vacantes} divisiones={divisiones} total={vacantes.length} />;
}
