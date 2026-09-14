"use client";

import { useRef, useState } from "react";
import { AREAS_EMPLEO } from "@/lib/data";
import { submitCvUpload } from "@/lib/cv/submit-candidato";
import { btnPrimary, btnSecondary } from "@/lib/visual-kit/styles";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export function CvUpload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [areaInteres, setAreaInteres] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onFile = (f: File | null) => {
    setError("");
    if (!f) {
      setFile(null);
      return;
    }
    const okType =
      f.type.includes("pdf") ||
      f.type.includes("word") ||
      f.type.includes("document") ||
      /\.(pdf|docx?)$/i.test(f.name);
    if (!okType) {
      setError("Solo PDF o Word (.pdf, .doc, .docx).");
      setFile(null);
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("El archivo no puede superar 5 MB.");
      setFile(null);
      return;
    }
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim() || !apellido.trim() || !telefono.trim() || !email.trim() || !areaInteres) {
      setError("Completa tus datos para continuar.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Revisa el correo electrónico.");
      return;
    }
    if (!file) {
      setError("Adjunta tu CV.");
      return;
    }
    setBusy(true);
    try {
      await submitCvUpload({ nombre, apellido, telefono, email, areaInteres, file });
      setSent(true);
    } catch {
      setError("No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.");
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-xl py-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Listo</p>
        <h3 className="font-display mt-3 text-3xl italic text-ink">CV recibido</h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted">
          Gracias. Tu archivo quedó registrado con Hakamo. Te contactaremos si hay un match.
        </p>
        <button
          type="button"
          className={`${btnSecondary} mt-10`}
          onClick={() => {
            setSent(false);
            setNombre("");
            setApellido("");
            setTelefono("");
            setEmail("");
            setAreaInteres("");
            setFile(null);
          }}
        >
          Enviar otro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="visit-form mx-auto space-y-10">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <LineField label="Nombre">
          <input
            className="visit-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="María"
            autoComplete="given-name"
          />
        </LineField>
        <LineField label="Apellido">
          <input
            className="visit-input"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="García"
            autoComplete="family-name"
          />
        </LineField>
        <LineField label="Teléfono">
          <input
            className="visit-input"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="829-000-0000"
            autoComplete="tel"
          />
        </LineField>
        <LineField label="Correo">
          <input
            type="email"
            className="visit-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="maria@correo.com"
            autoComplete="email"
          />
        </LineField>
      </div>

      <div>
        <p className="visit-label">Área de interés</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {AREAS_EMPLEO.map((area) => {
            const active = areaInteres === area;
            return (
              <button
                key={area}
                type="button"
                className={`rounded-full border px-3.5 py-2 text-sm transition ${
                  active
                    ? "border-accent bg-accent text-paper"
                    : "border-ink/12 bg-transparent text-ink hover:border-accent/50"
                }`}
                onClick={() => setAreaInteres(area)}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="visit-label">Tu CV</p>
        <input
          ref={fileRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="mt-4 flex w-full flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-ink/20 bg-transparent px-6 py-10 text-center transition hover:border-accent/50"
        >
          <p className="text-sm font-semibold text-ink">
            {file ? file.name : "Toca para elegir tu archivo"}
          </p>
          <p className="mt-2 text-xs text-muted">
            {file
              ? `${Math.round(file.size / 1024)} KB · Cambiar archivo`
              : "PDF o Word · máximo 5 MB"}
          </p>
        </button>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="border-t border-ink/8 pt-8">
        <button type="submit" className={btnPrimary} disabled={busy}>
          {busy ? "Enviando…" : "Enviar a Hakamo"}
        </button>
      </div>
    </form>
  );
}

function LineField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="visit-field">
      <span className="visit-label">{label}</span>
      {children}
    </label>
  );
}
