import type { CvData } from "./types";

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

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

export async function submitCvBuilder(data: CvData, pdf?: Blob): Promise<void> {
  const payload = {
    nombre: data.nombre,
    apellido: data.apellido,
    telefono: data.telefono,
    email: data.email,
    areaInteres: data.areaInteres,
    nivelExperiencia: "CV construido en web",
    mensaje: cvSummary(data),
  };

  try {
    if (!STRAPI) throw new Error("Sin Strapi");

    if (pdf) {
      const form = new FormData();
      form.append(
        "data",
        JSON.stringify({
          ...payload,
          mensaje: `${payload.mensaje}\n\n[CV PDF adjunto]`,
        }),
      );
      form.append("files.cv", pdf, cvFilenameSafe(data));
      const fileRes = await fetch(`${STRAPI}/api/candidatos`, { method: "POST", body: form });
      if (fileRes.ok) return;
    }

    const res = await fetch(`${STRAPI}/api/candidatos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });
    if (!res.ok) throw new Error("Error al enviar");
  } catch {
    // Same graceful UX as EmpleoForm when Strapi is down / schema mismatch
    console.log("Candidato CV (sin Strapi):", payload);
  }
}

export async function submitCvUpload(input: {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  areaInteres: string;
  file: File;
}): Promise<void> {
  const payload = {
    nombre: input.nombre,
    apellido: input.apellido,
    telefono: input.telefono,
    email: input.email,
    areaInteres: input.areaInteres,
    nivelExperiencia: "CV subido por candidato",
    mensaje: `Archivo: ${input.file.name}`,
  };

  try {
    if (!STRAPI) throw new Error("Sin Strapi");

    const form = new FormData();
    form.append("data", JSON.stringify(payload));
    form.append("files.cv", input.file, input.file.name);
    const fileRes = await fetch(`${STRAPI}/api/candidatos`, { method: "POST", body: form });
    if (fileRes.ok) return;

    const res = await fetch(`${STRAPI}/api/candidatos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });
    if (!res.ok) throw new Error("Error al enviar");
  } catch {
    console.log("Candidato upload (sin Strapi):", { ...payload, file: input.file.name });
  }
}

function cvFilenameSafe(data: CvData) {
  const base = `${data.nombre}_${data.apellido}`.trim().replace(/\s+/g, "_") || "CV_Hakamo";
  return `${base}_CV.pdf`;
}
