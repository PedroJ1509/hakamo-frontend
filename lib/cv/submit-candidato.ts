import { enviarPostulacion } from "./enviar-postulacion";
import type { CvData } from "./types";

function cvSummary(data: CvData): string {
  const parts = [
    data.cargoObjetivo && `Cargo objetivo: ${data.cargoObjetivo}`,
    data.experiencia
      .filter((e) => e.empresa || e.cargo)
      .map((e) => `${e.cargo} en ${e.empresa} (${e.periodo})`)
      .join("; "),
    data.estudios
      .filter((e) => e.institucion || e.titulo)
      .map((e) => `${e.titulo} — ${e.institucion}`)
      .join("; "),
    data.habilidades && `Habilidades: ${data.habilidades}`,
  ].filter(Boolean);
  return parts.join("\n");
}

/** CV armado en el constructor: se guarda como postulación con su PDF. Lanza un error si falla. */
export async function submitCvBuilder(data: CvData, pdf?: Blob): Promise<void> {
  await enviarPostulacion(
    {
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      email: data.email,
      areaInteres: data.areaInteres,
      cartaPresentacion: cvSummary(data),
      origen: "cv_creado",
    },
    pdf,
    cvFilenameSafe(data),
  );
}

/** CV subido por la persona: se guarda como postulación con su archivo. Lanza un error si falla. */
export async function submitCvUpload(input: {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  areaInteres: string;
  file: File;
}): Promise<void> {
  await enviarPostulacion(
    {
      nombre: input.nombre,
      apellido: input.apellido,
      telefono: input.telefono,
      email: input.email,
      areaInteres: input.areaInteres,
      origen: "cv_subido",
    },
    input.file,
    input.file.name,
  );
}

function cvFilenameSafe(data: CvData) {
  const base = `${data.nombre}_${data.apellido}`.trim().replace(/\s+/g, "_") || "CV_Hakamo";
  return `${base}_CV.pdf`;
}
