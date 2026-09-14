"use client";

import { useState } from "react";
import { AREAS_EMPLEO } from "@/lib/data";
import {
  cvFilename,
  downloadBlob,
  generateCvPdf,
} from "@/lib/cv/generate-pdf";
import { submitCvBuilder } from "@/lib/cv/submit-candidato";
import {
  emptyEducation,
  emptyExperience,
  initialCvData,
  type CvData,
  type CvEducation,
  type CvExperience,
} from "@/lib/cv/types";
import { btnPrimary, btnSecondary } from "@/lib/visual-kit/styles";

const STEPS = [
  { title: "Tus datos", hint: "Quién eres" },
  { title: "Experiencia", hint: "Dónde has trabajado" },
  { title: "Estudios", hint: "Tu formación" },
  { title: "Habilidades", hint: "Qué sabes hacer" },
  { title: "Enviar", hint: "Listo para Hakamo" },
] as const;

function emailOk(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function CvBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<CvData>(initialCvData);
  const [busy, setBusy] = useState<"pdf" | "send" | null>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const patch = (partial: Partial<CvData>) => setData((d) => ({ ...d, ...partial }));
  const progress = ((step + 1) / STEPS.length) * 100;

  const updateExp = (i: number, partial: Partial<CvExperience>) => {
    setData((d) => ({
      ...d,
      experiencia: d.experiencia.map((e, idx) => (idx === i ? { ...e, ...partial } : e)),
    }));
  };

  const updateEdu = (i: number, partial: Partial<CvEducation>) => {
    setData((d) => ({
      ...d,
      estudios: d.estudios.map((e, idx) => (idx === i ? { ...e, ...partial } : e)),
    }));
  };

  const validateStep = (): boolean => {
    setError("");
    if (step === 0) {
      if (
        !data.nombre.trim() ||
        !data.apellido.trim() ||
        !data.telefono.trim() ||
        !data.email.trim() ||
        !data.areaInteres ||
        !data.cargoObjetivo.trim()
      ) {
        setError("Completa tus datos para continuar.");
        return false;
      }
      if (!emailOk(data.email)) {
        setError("Revisa el correo electrónico.");
        return false;
      }
    }
    if (step === 1) {
      const ok = data.experiencia.some((e) => e.empresa.trim() && e.cargo.trim());
      if (!ok) {
        setError("Agrega al menos una experiencia con empresa y cargo.");
        return false;
      }
    }
    if (step === 2) {
      const ok = data.estudios.some((e) => e.institucion.trim() && e.titulo.trim());
      if (!ok) {
        setError("Agrega al menos un estudio con institución y título.");
        return false;
      }
    }
    if (step === 3 && !data.habilidades.trim()) {
      setError("Cuéntanos al menos algunas habilidades.");
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleDownload = async () => {
    setBusy("pdf");
    setError("");
    try {
      const blob = await generateCvPdf(data);
      downloadBlob(blob, cvFilename(data));
    } catch {
      setError("No se pudo generar el PDF. Intenta de nuevo.");
    } finally {
      setBusy(null);
    }
  };

  const handleSend = async () => {
    setBusy("send");
    setError("");
    try {
      const blob = await generateCvPdf(data);
      await submitCvBuilder(data, blob);
      setSent(true);
    } catch {
      setError("No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setBusy(null);
    }
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-xl py-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Listo</p>
        <h3 className="font-display mt-3 text-3xl italic text-ink">CV enviado a Hakamo</h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted">
          Recibimos tu perfil. Te contactaremos cuando haya una oportunidad que encaje contigo.
          También puedes descargar tu PDF.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className={btnPrimary} disabled={busy !== null} onClick={handleDownload}>
            {busy === "pdf" ? "Generando…" : "Descargar PDF"}
          </button>
          <button
            type="button"
            className={btnSecondary}
            onClick={() => {
              setSent(false);
              setData(initialCvData());
              setStep(0);
            }}
          >
            Crear otro CV
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="visit-form mx-auto">
      <div className="mb-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-ink">{STEPS[step].title}</p>
            <p className="mt-0.5 text-xs text-muted">{STEPS[step].hint}</p>
          </div>
          <p className="text-xs font-medium tabular-nums text-muted">
            {step + 1} / {STEPS.length}
          </p>
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink/8">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-10">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            <LineField label="Nombre">
              <input
                className="visit-input"
                value={data.nombre}
                onChange={(e) => patch({ nombre: e.target.value })}
                placeholder="María"
                autoComplete="given-name"
              />
            </LineField>
            <LineField label="Apellido">
              <input
                className="visit-input"
                value={data.apellido}
                onChange={(e) => patch({ apellido: e.target.value })}
                placeholder="García"
                autoComplete="family-name"
              />
            </LineField>
            <LineField label="Teléfono">
              <input
                className="visit-input"
                value={data.telefono}
                onChange={(e) => patch({ telefono: e.target.value })}
                placeholder="829-000-0000"
                autoComplete="tel"
              />
            </LineField>
            <LineField label="Correo">
              <input
                type="email"
                className="visit-input"
                value={data.email}
                onChange={(e) => patch({ email: e.target.value })}
                placeholder="maria@correo.com"
                autoComplete="email"
              />
            </LineField>
            <LineField label="Cargo que buscas" wide>
              <input
                className="visit-input"
                value={data.cargoObjetivo}
                onChange={(e) => patch({ cargoObjetivo: e.target.value })}
                placeholder="Asistente administrativo, electricista…"
              />
            </LineField>
          </div>

          <div>
            <p className="visit-label">Área de interés</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {AREAS_EMPLEO.map((area) => {
                const active = data.areaInteres === area;
                return (
                  <button
                    key={area}
                    type="button"
                    className={`rounded-full border px-3.5 py-2 text-sm transition ${
                      active
                        ? "border-accent bg-accent text-paper"
                        : "border-ink/12 bg-transparent text-ink hover:border-accent/50"
                    }`}
                    onClick={() => patch({ areaInteres: area })}
                  >
                    {area}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-12">
          {data.experiencia.map((exp, i) => (
            <div key={i} className="border-t border-ink/8 pt-8 first:border-t-0 first:pt-0">
              <div className="mb-6 flex items-center justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
                  Experiencia {i + 1}
                </p>
                {data.experiencia.length > 1 ? (
                  <button
                    type="button"
                    className="text-xs font-semibold text-muted hover:text-ink"
                    onClick={() =>
                      setData((d) => ({
                        ...d,
                        experiencia: d.experiencia.filter((_, idx) => idx !== i),
                      }))
                    }
                  >
                    Quitar
                  </button>
                ) : null}
              </div>
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <LineField label="Empresa">
                  <input
                    className="visit-input"
                    value={exp.empresa}
                    onChange={(e) => updateExp(i, { empresa: e.target.value })}
                    placeholder="Nombre de la empresa"
                  />
                </LineField>
                <LineField label="Cargo">
                  <input
                    className="visit-input"
                    value={exp.cargo}
                    onChange={(e) => updateExp(i, { cargo: e.target.value })}
                    placeholder="Tu puesto"
                  />
                </LineField>
                <LineField label="Periodo">
                  <input
                    className="visit-input"
                    value={exp.periodo}
                    onChange={(e) => updateExp(i, { periodo: e.target.value })}
                    placeholder="2022 – 2024"
                  />
                </LineField>
                <LineField label="Qué hiciste" wide>
                  <textarea
                    className="visit-input visit-textarea"
                    value={exp.descripcion}
                    onChange={(e) => updateExp(i, { descripcion: e.target.value })}
                    placeholder="Responsabilidades y logros…"
                    rows={3}
                  />
                </LineField>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-sm font-semibold text-accent"
            onClick={() =>
              setData((d) => ({ ...d, experiencia: [...d.experiencia, emptyExperience()] }))
            }
          >
            + Agregar otra experiencia
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-12">
          {data.estudios.map((ed, i) => (
            <div key={i} className="border-t border-ink/8 pt-8 first:border-t-0 first:pt-0">
              <div className="mb-6 flex items-center justify-between gap-3">
                <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Estudio {i + 1}</p>
                {data.estudios.length > 1 ? (
                  <button
                    type="button"
                    className="text-xs font-semibold text-muted hover:text-ink"
                    onClick={() =>
                      setData((d) => ({
                        ...d,
                        estudios: d.estudios.filter((_, idx) => idx !== i),
                      }))
                    }
                  >
                    Quitar
                  </button>
                ) : null}
              </div>
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <LineField label="Institución">
                  <input
                    className="visit-input"
                    value={ed.institucion}
                    onChange={(e) => updateEdu(i, { institucion: e.target.value })}
                    placeholder="Colegio, universidad, instituto…"
                  />
                </LineField>
                <LineField label="Título / carrera">
                  <input
                    className="visit-input"
                    value={ed.titulo}
                    onChange={(e) => updateEdu(i, { titulo: e.target.value })}
                    placeholder="Bachiller, técnico…"
                  />
                </LineField>
                <LineField label="Periodo" wide>
                  <input
                    className="visit-input"
                    value={ed.periodo}
                    onChange={(e) => updateEdu(i, { periodo: e.target.value })}
                    placeholder="2018 – 2022"
                  />
                </LineField>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-sm font-semibold text-accent"
            onClick={() =>
              setData((d) => ({ ...d, estudios: [...d.estudios, emptyEducation()] }))
            }
          >
            + Agregar otro estudio
          </button>
        </div>
      )}

      {step === 3 && (
        <LineField label="Habilidades" wide>
          <textarea
            className="visit-input visit-textarea"
            value={data.habilidades}
            onChange={(e) => patch({ habilidades: e.target.value })}
            placeholder="Excel, atención al cliente, trabajo en equipo…"
            rows={5}
          />
        </LineField>
      )}

      {step === 4 && (
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Resumen</p>
          <h3 className="font-display mt-3 text-3xl italic text-ink">
            {data.nombre} {data.apellido}
          </h3>
          <p className="mt-2 text-sm text-muted">{data.cargoObjetivo}</p>
          <dl className="mt-8 divide-y divide-ink/8 border-y border-ink/8">
            {[
              ["Teléfono", data.telefono],
              ["Correo", data.email],
              ["Área", data.areaInteres],
              [
                "Experiencia",
                `${data.experiencia.filter((e) => e.empresa).length} registrada(s)`,
              ],
              ["Estudios", `${data.estudios.filter((e) => e.institucion).length} registrado(s)`],
              ["Habilidades", data.habilidades],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="text-xs uppercase tracking-[0.18em] text-muted">{label}</dt>
                <dd className="text-sm leading-6 text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm leading-6 text-muted">
            Primero enviamos tu CV a Hakamo. Después podrás descargar el PDF.
          </p>
          <button
            type="button"
            className={`${btnPrimary} mt-8`}
            disabled={busy !== null}
            onClick={handleSend}
          >
            {busy === "send" ? "Enviando…" : "Enviar a Hakamo"}
          </button>
        </div>
      )}

      {error ? <p className="mt-8 text-sm text-red-600">{error}</p> : null}

      <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-ink/8 pt-8">
        <button type="button" className={btnSecondary} onClick={back} disabled={step === 0 || busy !== null}>
          Atrás
        </button>
        {step < 4 ? (
          <button type="button" className={btnPrimary} onClick={next}>
            Continuar
          </button>
        ) : null}
      </div>
    </div>
  );
}

function LineField({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={`visit-field ${wide ? "sm:col-span-2" : ""}`}>
      <span className="visit-label">{label}</span>
      {children}
    </label>
  );
}
