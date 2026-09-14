import type { CvData } from "./types";

function line(doc: { text: (t: string, x: number, y: number) => void }, text: string, x: number, y: number) {
  doc.text(text, x, y);
  return y;
}

/** Builds a simple one-page professional CV as a PDF Blob. */
export async function generateCvPdf(data: CvData): Promise<Blob> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const fullName = `${data.nombre.trim()} ${data.apellido.trim()}`.trim();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(30, 58, 95);
  doc.text(fullName || "Curriculum Vitae", margin, y);
  y += 22;

  if (data.cargoObjetivo.trim()) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(data.cargoObjetivo.trim(), margin, y);
    y += 16;
  }

  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const contact = [data.telefono, data.email, data.areaInteres].filter(Boolean).join("  ·  ");
  if (contact) {
    const lines = doc.splitTextToSize(contact, maxWidth);
    doc.text(lines, margin, y);
    y += lines.length * 12 + 8;
  }

  doc.setDrawColor(30, 58, 95);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  const section = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 95);
    line(doc, title.toUpperCase(), margin, y);
    y += 6;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;
  };

  const ensureSpace = (need: number) => {
    if (y + need > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const experiences = data.experiencia.filter((e) => e.empresa.trim() || e.cargo.trim());
  if (experiences.length) {
    section("Experiencia");
    for (const exp of experiences) {
      ensureSpace(60);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      doc.text(exp.cargo.trim() || "Cargo", margin, y);
      y += 13;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      const meta = [exp.empresa.trim(), exp.periodo.trim()].filter(Boolean).join("  ·  ");
      if (meta) {
        doc.text(meta, margin, y);
        y += 12;
      }
      if (exp.descripcion.trim()) {
        const desc = doc.splitTextToSize(exp.descripcion.trim(), maxWidth);
        doc.setTextColor(40, 40, 40);
        doc.text(desc, margin, y);
        y += desc.length * 11 + 10;
      } else {
        y += 8;
      }
    }
  }

  const studies = data.estudios.filter((e) => e.institucion.trim() || e.titulo.trim());
  if (studies.length) {
    ensureSpace(40);
    section("Estudios");
    for (const ed of studies) {
      ensureSpace(40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 20);
      doc.text(ed.titulo.trim() || "Título", margin, y);
      y += 13;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      const meta = [ed.institucion.trim(), ed.periodo.trim()].filter(Boolean).join("  ·  ");
      if (meta) {
        doc.text(meta, margin, y);
        y += 14;
      } else {
        y += 8;
      }
    }
  }

  if (data.habilidades.trim()) {
    ensureSpace(40);
    section("Habilidades");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    const skills = doc.splitTextToSize(data.habilidades.trim(), maxWidth);
    doc.text(skills, margin, y);
  }

  return doc.output("blob");
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function cvFilename(data: CvData) {
  const base = `${data.nombre}_${data.apellido}`.trim().replace(/\s+/g, "_") || "CV_Hakamo";
  return `${base}_CV.pdf`;
}
