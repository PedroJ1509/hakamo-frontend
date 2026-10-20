const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

export interface Postulacion {
  nombre: string;
  apellido?: string;
  email: string;
  telefono?: string;
  areaInteres?: string;
  cartaPresentacion?: string;
  /** De dónde viene: una vacante, el constructor de CV o un archivo subido. */
  origen: "vacante" | "cv_creado" | "cv_subido";
  /** documentId de la vacante, si se postula a una. */
  vacante?: string;
}

/**
 * Envía una postulación (y su CV, si hay) a POST /api/postulaciones/enviar.
 * Lanza un error si no se pudo guardar, para que el formulario lo muestre.
 */
export async function enviarPostulacion(datos: Postulacion, cv?: Blob, nombreArchivo?: string): Promise<void> {
  if (!STRAPI) throw new Error("Falta NEXT_PUBLIC_STRAPI_URL");

  const form = new FormData();
  form.append("data", JSON.stringify(datos));
  if (cv) form.append("cv", cv, nombreArchivo ?? "CV.pdf");

  const res = await fetch(`${STRAPI}/api/postulaciones/enviar`, { method: "POST", body: form });
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => null);
    throw new Error(cuerpo?.error?.message ?? "No se pudo enviar la postulación");
  }
}
