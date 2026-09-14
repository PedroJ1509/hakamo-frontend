"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { btnPrimary, btnSecondary } from "@/lib/visual-kit/styles";
import { LandingHeader } from "../chrome-header";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";

const STEPS = [
  { id: "datos", title: "Tus datos", hint: "Para contactarte" },
  { id: "motivo", title: "Motivo", hint: "Qué necesitas" },
  { id: "detalle", title: "Detalle", hint: "Contexto breve" },
  { id: "enviar", title: "Confirmar", hint: "WhatsApp y correo" },
] as const;

const MOTIVOS = [
  { value: "Conocer los servicios de Hakamo", note: "Presentación general" },
  { value: "Cotizar outsourcing de personal", note: "Equipos para obra" },
  { value: "Reclutamiento / vacantes", note: "Perfiles clave" },
  { value: "Payroll y nómina", note: "Administración salarial" },
  { value: "Cumplimiento laboral", note: "TSS, contratos, DGT3" },
  { value: "Visita a obra o proyecto", note: "En terreno" },
  { value: "Otro", note: "Cuéntanos después" },
];

const MODALIDADES = [
  { value: "Presencial en Montecristi", note: "En nuestra base" },
  { value: "Visita en nuestra operación / obra", note: "Vamos a tu proyecto" },
  { value: "Virtual (videollamada)", note: "Rápida y remota" },
];

type FormState = {
  nombre: string;
  empresa: string;
  telefono: string;
  email: string;
  motivo: string;
  modalidad: string;
  fechaPreferida: string;
  comoSupo: string;
  detalle: string;
};

const initial: FormState = {
  nombre: "",
  empresa: "",
  telefono: "",
  email: "",
  motivo: "",
  modalidad: "",
  fechaPreferida: "",
  comoSupo: "",
  detalle: "",
};

function buildMessage(data: FormState) {
  return [
    "Agendar visita — Hakamo",
    "",
    `Nombre: ${data.nombre}`,
    `Empresa: ${data.empresa || "—"}`,
    `Teléfono: ${data.telefono}`,
    `Correo: ${data.email}`,
    `Motivo: ${data.motivo}`,
    `Modalidad: ${data.modalidad}`,
    `Fecha preferida: ${data.fechaPreferida || "Por coordinar"}`,
    `Cómo nos conoció: ${data.comoSupo || "—"}`,
    "",
    "Detalle:",
    data.detalle || "—",
  ].join("\n");
}

export function VisitLanding() {
  const site = SITE_PUBLIC;
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initial);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const patch = (partial: Partial<FormState>) => setData((d) => ({ ...d, ...partial }));
  const message = useMemo(() => buildMessage(data), [data]);
  const progress = ((step + 1) / STEPS.length) * 100;

  const validateStep = () => {
    setError("");
    if (step === 0) {
      if (!data.nombre.trim() || !data.telefono.trim() || !data.email.trim()) {
        setError("Completa nombre, teléfono y correo.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        setError("Revisa el correo electrónico.");
        return false;
      }
    }
    if (step === 1) {
      if (!data.motivo || !data.modalidad) {
        setError("Elige un motivo y cómo prefieres la visita.");
        return false;
      }
    }
    if (step === 2 && !data.detalle.trim()) {
      setError("Cuéntanos un poco más sobre lo que necesitas.");
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 3));
  };

  const submit = async () => {
    if (!validateStep()) return;
    setBusy(true);
    setError("");
    const body = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      mensaje: message,
    };

    try {
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/mensajes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: body }),
      });
    } catch {
      // WhatsApp / mailto still deliver
    }

    const wa = `https://wa.me/18296790671?text=${encodeURIComponent(message)}`;
    const mail = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
      `Agendar visita — ${data.nombre}`,
    )}&body=${encodeURIComponent(message)}`;

    window.open(wa, "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      window.location.href = mail;
    }, 400);

    setBusy(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-[100svh] bg-paper text-ink">
        <LandingHeader
          name={site.name}
          links={SITE_NAV}
          ctaHref="/contacto"
          ctaLabel="Contacto"
          cvHref={site.cvHref}
          cvLabel={site.cvLabel}
          tone="paper"
        />
        <section className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Listo</p>
          <h1 className="font-display mt-4 text-4xl italic text-ink">Solicitud preparada</h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Abrimos WhatsApp y tu correo con el resumen. Si alguno no se abrió, usa los botones.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/18296790671?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
              className={btnPrimary}
            >
              Abrir WhatsApp
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
                `Agendar visita — ${data.nombre}`,
              )}&body=${encodeURIComponent(message)}`}
              className={btnSecondary}
            >
              Abrir correo
            </a>
          </div>
          <Link href="/contacto" className="mt-10 inline-block text-sm font-semibold text-accent">
            Volver a contacto →
          </Link>
        </section>
        <PublicFooter site={site} links={SITE_NAV} tone="paper" />
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] bg-paper text-ink">
      <ScrollProgress />
      <LandingHeader
        name={site.name}
        links={SITE_NAV}
        ctaHref="/contacto"
        ctaLabel="Contacto"
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
        tone="paper"
      />

      <section className="relative overflow-hidden">
        <div className="relative min-h-[48svh] sm:min-h-[56svh]">
          <Image
            src="/visual-kit/contact/meeting.jpg"
            alt="Reunión para agendar visita con Hakamo"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--paper) 55%, transparent) 0%, color-mix(in srgb, var(--paper) 35%, transparent) 40%, color-mix(in srgb, var(--paper) 92%, white) 100%), radial-gradient(ellipse at 18% 10%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 42%)",
            }}
          />
          <div className="relative z-[1] mx-auto flex min-h-[48svh] max-w-6xl flex-col justify-end px-4 pb-10 pt-28 sm:min-h-[56svh] sm:px-6 sm:pb-14">
            <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-accent">Visita</p>
            <h1 className="font-display mt-4 max-w-3xl text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.06] tracking-[-0.03em] italic text-ink">
              Agendar visita
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted sm:text-base">
              Un flujo corto. Al final enviamos el resumen a WhatsApp y a {COMPANY_INFO.email}.
            </p>
          </div>
        </div>

        <div className="bg-paper px-4 pt-8 sm:px-6">
          <div className="mx-auto max-w-6xl">
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
            <div className="mt-3 hidden items-center gap-1 sm:flex">
              {STEPS.map((item, i) => (
                <span key={item.id} className="inline-flex items-center gap-1">
                  <button
                    type="button"
                    className={`text-[11px] font-medium tracking-wide transition ${
                      i === step ? "text-accent" : i < step ? "text-ink/55" : "text-muted/70"
                    }`}
                    onClick={() => {
                      if (i < step) {
                        setError("");
                        setStep(i);
                      }
                    }}
                  >
                    {item.title}
                  </button>
                  {i < STEPS.length - 1 ? <span className="text-ink/20">·</span> : null}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal from="up">
            <div className="visit-form">
              {step === 0 && (
                <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  <LineField label="Nombre completo" wide>
                    <input
                      className="visit-input"
                      value={data.nombre}
                      onChange={(e) => patch({ nombre: e.target.value })}
                      placeholder="María García"
                      autoComplete="name"
                    />
                  </LineField>
                  <LineField label="Empresa">
                    <input
                      className="visit-input"
                      value={data.empresa}
                      onChange={(e) => patch({ empresa: e.target.value })}
                      placeholder="Opcional"
                      autoComplete="organization"
                    />
                  </LineField>
                  <LineField label="Teléfono / WhatsApp">
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
                      placeholder="tu@empresa.com"
                      autoComplete="email"
                    />
                  </LineField>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-10">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Motivo</p>
                    <p className="mt-2 text-sm text-muted">¿Por qué quieres agendar?</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {MOTIVOS.map((item) => {
                        const active = data.motivo === item.value;
                        return (
                          <button
                            key={item.value}
                            type="button"
                            className={`visit-choice ${active ? "is-active" : ""}`}
                            onClick={() => patch({ motivo: item.value })}
                          >
                            <span className="visit-choice-title">{item.value}</span>
                            <span className="visit-choice-note">{item.note}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Modalidad</p>
                    <p className="mt-2 text-sm text-muted">¿Cómo prefieres la visita?</p>
                    <div className="mt-5 grid gap-3">
                      {MODALIDADES.map((item) => {
                        const active = data.modalidad === item.value;
                        return (
                          <button
                            key={item.value}
                            type="button"
                            className={`visit-choice visit-choice-row ${active ? "is-active" : ""}`}
                            onClick={() => patch({ modalidad: item.value })}
                          >
                            <span>
                              <span className="visit-choice-title block">{item.value}</span>
                              <span className="visit-choice-note">{item.note}</span>
                            </span>
                            <span className={`visit-radio ${active ? "is-active" : ""}`} aria-hidden />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                    <LineField label="Fecha preferida">
                      <input
                        type="date"
                        className="visit-input"
                        value={data.fechaPreferida}
                        onChange={(e) => patch({ fechaPreferida: e.target.value })}
                      />
                    </LineField>
                    <LineField label="¿Cómo nos conoció?">
                      <input
                        className="visit-input"
                        value={data.comoSupo}
                        onChange={(e) => patch({ comoSupo: e.target.value })}
                        placeholder="Instagram, referido…"
                      />
                    </LineField>
                  </div>
                </div>
              )}

              {step === 2 && (
                <LineField label="Cuéntanos el detalle" wide>
                  <textarea
                    className="visit-input visit-textarea"
                    value={data.detalle}
                    onChange={(e) => patch({ detalle: e.target.value })}
                    placeholder="Qué necesitas, tamaño del equipo, urgencia, ubicación del proyecto…"
                    rows={6}
                  />
                </LineField>
              )}

              {step === 3 && (
                <div className="max-w-2xl">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Resumen</p>
                  <h2 className="font-display mt-3 text-3xl italic text-ink">Todo listo para enviar</h2>
                  <dl className="mt-8 divide-y divide-ink/8 border-y border-ink/8">
                    {[
                      ["Nombre", data.nombre],
                      ["Empresa", data.empresa || "—"],
                      ["Teléfono", data.telefono],
                      ["Correo", data.email],
                      ["Motivo", data.motivo],
                      ["Modalidad", data.modalidad],
                      ["Fecha", data.fechaPreferida || "Por coordinar"],
                      ["Cómo nos conoció", data.comoSupo || "—"],
                      ["Detalle", data.detalle],
                    ].map(([label, value]) => (
                      <div key={label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                        <dt className="text-xs uppercase tracking-[0.18em] text-muted">{label}</dt>
                        <dd className="text-sm leading-6 text-ink">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 text-sm leading-6 text-muted">
                    Al confirmar se abre WhatsApp con este texto y tu cliente de correo hacia{" "}
                    {COMPANY_INFO.email}.
                  </p>
                </div>
              )}

              {error ? <p className="mt-8 text-sm text-red-600">{error}</p> : null}

              <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-ink/8 pt-8">
                <button
                  type="button"
                  className={btnSecondary}
                  onClick={() => {
                    setError("");
                    setStep((s) => Math.max(0, s - 1));
                  }}
                  disabled={step === 0 || busy}
                >
                  Atrás
                </button>
                {step < 3 ? (
                  <button type="button" className={btnPrimary} onClick={next}>
                    Continuar
                  </button>
                ) : (
                  <button type="button" className={btnPrimary} onClick={submit} disabled={busy}>
                    {busy ? "Preparando…" : "Enviar a WhatsApp y correo"}
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} tone="paper" />
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
