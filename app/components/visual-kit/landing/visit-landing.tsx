"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { btnGhostOnNight, btnGlow } from "@/lib/visual-kit/styles";
import { LandingHeader } from "../chrome-header";
import { Grain } from "../grain";
import { LandingHeroSection } from "../landing-hero-section";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";

type Intent = "personal" | "reunion" | "contactar";

const INTENTS: { id: Intent; index: string; title: string; note: string }[] = [
  { id: "personal", index: "01", title: "Personal", note: "Equipos para tu obra o proyecto" },
  { id: "reunion", index: "02", title: "Reunión", note: "Presencial, en obra o virtual" },
  { id: "contactar", index: "03", title: "Contactar", note: "Una consulta o un mensaje" },
];

const STEPS: Record<Intent, { id: string; title: string; hint: string }[]> = {
  personal: [
    { id: "datos", title: "Tus datos", hint: "Para contactarte" },
    { id: "necesidad", title: "El personal", hint: "Qué perfiles buscas" },
    { id: "detalle", title: "Detalle", hint: "Obra y urgencia" },
    { id: "enviar", title: "Confirmar", hint: "WhatsApp y correo" },
  ],
  reunion: [
    { id: "datos", title: "Tus datos", hint: "Para contactarte" },
    { id: "reunion", title: "La reunión", hint: "Cuándo y cómo" },
    { id: "detalle", title: "Detalle", hint: "De qué hablamos" },
    { id: "enviar", title: "Confirmar", hint: "WhatsApp y correo" },
  ],
  contactar: [
    { id: "datos", title: "Tus datos", hint: "Para responderte" },
    { id: "mensaje", title: "Mensaje", hint: "Qué quieres decirnos" },
    { id: "enviar", title: "Confirmar", hint: "WhatsApp y correo" },
  ],
};

const SUBJECT: Record<Intent, string> = {
  personal: "Solicitar personal",
  reunion: "Solicitar reunión",
  contactar: "Contactar",
};

const PERSONAL = [
  { value: "Outsourcing de personal", note: "Equipos para obra" },
  { value: "Reclutamiento", note: "Perfiles clave" },
  { value: "Payroll y nómina", note: "Administración salarial" },
  { value: "Cumplimiento laboral", note: "TSS, contratos, DGT3" },
  { value: "Otro", note: "Cuéntanos en el detalle" },
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
  detalle: "",
};

function summaryRows(intent: Intent, data: FormState): [string, string][] {
  const rows: [string, string][] = [
    ["Nombre", data.nombre],
    ["Empresa", data.empresa || "—"],
    ["Teléfono", data.telefono],
    ["Correo", data.email],
  ];
  if (intent === "personal") rows.push(["Personal", data.motivo]);
  if (intent === "reunion") {
    rows.push(["Modalidad", data.modalidad]);
    rows.push(["Fecha", data.fechaPreferida || "Por coordinar"]);
  }
  rows.push([intent === "contactar" ? "Mensaje" : "Detalle", data.detalle]);
  return rows;
}

function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function buildMessage(intent: Intent, data: FormState) {
  const lines = [
    `${SUBJECT[intent]} — Hakamo`,
    "",
    `Nombre: ${data.nombre}`,
    `Empresa: ${data.empresa || "—"}`,
    `Teléfono: ${data.telefono}`,
    `Correo: ${data.email}`,
  ];
  if (intent === "personal") lines.push(`Personal: ${data.motivo}`);
  if (intent === "reunion") {
    lines.push(`Modalidad: ${data.modalidad}`);
    lines.push(`Fecha preferida: ${data.fechaPreferida || "Por coordinar"}`);
  }
  lines.push("", intent === "contactar" ? "Mensaje:" : "Detalle:", data.detalle || "—");
  return lines.join("\n");
}

export function VisitLanding() {
  const site = SITE_PUBLIC;
  const [intent, setIntent] = useState<Intent | null>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initial);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const today = useMemo(() => todayIso(), []);

  useEffect(() => {
    if (!done) return;
    window.scrollTo(0, 0);
  }, [done]);
  const steps = intent ? STEPS[intent] : [];
  const current = steps[step];
  const patch = (partial: Partial<FormState>) => setData((d) => ({ ...d, ...partial }));
  const message = useMemo(() => (intent ? buildMessage(intent, data) : ""), [data, intent]);
  const progress = steps.length ? ((step + 1) / steps.length) * 100 : 0;

  const formAnchor = useRef<HTMLElement>(null);

  const chooseIntent = (nextIntent: Intent) => {
    if (nextIntent === intent) return;
    setError("");
    setStep(0);
    setIntent(nextIntent);
    setData((currentData) => ({
      ...currentData,
      motivo: "",
      modalidad: "",
      fechaPreferida: "",
      detalle: "",
    }));
    window.setTimeout(() => {
      formAnchor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  const validateStep = () => {
    setError("");
    if (!intent || !current) return false;
    if (current.id === "datos") {
      if (!data.nombre.trim() || !data.telefono.trim() || !data.email.trim()) {
        setError("Completa nombre, teléfono y correo.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        setError("Revisa el correo electrónico.");
        return false;
      }
    }
    if (current.id === "necesidad" && !data.motivo) {
      setError("Elige el tipo de personal.");
      return false;
    }
    if (current.id === "reunion") {
      if (!data.modalidad) {
        setError("Elige cómo prefieres la reunión.");
        return false;
      }
      if (data.fechaPreferida && data.fechaPreferida < today) {
        setError("La fecha preferida no puede ser anterior a hoy.");
        return false;
      }
    }
    if ((current.id === "detalle" || current.id === "mensaje") && !data.detalle.trim()) {
      setError(current.id === "mensaje" ? "Escribe tu mensaje." : "Cuéntanos un poco más sobre lo que necesitas.");
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
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
    const subject = intent ? `${SUBJECT[intent]} — ${data.nombre}` : data.nombre;
    const mail = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    window.open(wa, "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      window.location.href = mail;
    }, 400);

    setBusy(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="visit-night landing min-h-[100svh] bg-night text-paper">
        <Grain />
        <LandingHeader
          name={site.name}
          links={SITE_NAV}
          ctaHref="/contacto"
          ctaLabel="Contactar"
          cvHref={site.cvHref}
          cvLabel={site.cvLabel}
        />
        <section className="flex min-h-[100svh] w-full items-center justify-center px-4 pb-16 pt-[calc(var(--header-h)+1.5rem)] sm:px-6">
          <div className="w-full text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-glow">Listo</p>
          <h1 className="font-display mt-4 text-[clamp(2.4rem,5vw,4.25rem)] italic leading-[1.05] text-paper">
            Solicitud preparada
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-paper/65 sm:text-lg">
            Abrimos WhatsApp y tu correo con el resumen. Si alguno no se abrió, usa los botones.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/18296790671?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
              className={btnGlow}
            >
              Abrir WhatsApp
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
                intent ? `${SUBJECT[intent]} — ${data.nombre}` : data.nombre,
              )}&body=${encodeURIComponent(message)}`}
              className={btnGhostOnNight}
            >
              Abrir correo
            </a>
          </div>
          <Link href="/contacto" className="mt-10 inline-block text-sm font-semibold text-glow">
            Volver a contacto →
          </Link>
          </div>
        </section>
        <PublicFooter site={site} links={SITE_NAV} />
      </div>
    );
  }

  return (
    <div className="visit-night landing min-h-[100svh] bg-night text-paper">
      <ScrollProgress />
      <Grain />
      <LandingHeader
        name={site.name}
        links={SITE_NAV}
        ctaHref="/contacto"
        ctaLabel="Contactar"
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
      />

      <LandingHeroSection
        background={{
          src: "/visual-kit/contact/meeting.jpg",
          alt: "Solicitar personal, reunión o contacto con Hakamo",
          objectPosition: "50% 40%",
          priority: true,
        }}
      >
        <div className="landing-hero-inner visit-hero mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">Solicitar</p>
          <h1 className="font-display mt-4 max-w-xl text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.98] tracking-[-0.035em] text-paper">
            Qué necesitas
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-paper/75 sm:text-base">
            Personal para la obra, una reunión o un mensaje.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {INTENTS.map((item) => {
              const active = intent === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`visit-choice ${active ? "is-active" : ""}`}
                  onClick={() => chooseIntent(item.id)}
                >
                  <span className="visit-choice-index">{item.index}</span>
                  <span className="visit-choice-title">{item.title}</span>
                  <span className="visit-choice-note">{item.note}</span>
                </button>
              );
            })}
          </div>
        </div>
      </LandingHeroSection>

      {intent && current ? (
        <>
          <section id="solicitud" ref={formAnchor} className="bg-night">
            <div className="bg-night px-4 pt-8 sm:px-6">
              <div className="mx-auto max-w-6xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-paper">{current.title}</p>
                    <p className="mt-0.5 text-xs text-paper/55">{current.hint}</p>
                  </div>
                  <p className="text-xs font-medium tabular-nums text-paper/55">
                    {step + 1} / {steps.length}
                  </p>
                </div>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-glow transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-3 hidden items-center gap-1 sm:flex">
                  {steps.map((item, i) => (
                    <span key={item.id} className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        className={`text-[11px] font-medium tracking-wide transition ${
                          i === step ? "text-glow" : i < step ? "text-paper/55" : "text-paper/35"
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
                      {i < steps.length - 1 ? <span className="text-paper/25">·</span> : null}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-night px-4 pb-24 pt-4 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <Reveal from="up">
                <div className="visit-form">
                  {current.id === "datos" && (
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

                  {current.id === "necesidad" && (
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-glow">Personal</p>
                      <p className="mt-2 text-sm text-paper/65">¿Qué tipo de personal necesitas?</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {PERSONAL.map((item) => {
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
                  )}

                  {current.id === "reunion" && (
                    <div className="space-y-10">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-glow">Modalidad</p>
                        <p className="mt-2 text-sm text-paper/65">¿Cómo prefieres la reunión?</p>
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
                      <LineField label="Fecha preferida">
                        <input
                          type="date"
                          className="visit-input"
                          min={today}
                          value={data.fechaPreferida}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value && value < today) {
                              setError("La fecha preferida no puede ser anterior a hoy.");
                              return;
                            }
                            setError("");
                            patch({ fechaPreferida: value });
                          }}
                        />
                      </LineField>
                    </div>
                  )}

                  {(current.id === "detalle" || current.id === "mensaje") && (
                    <LineField label={current.id === "mensaje" ? "Tu mensaje" : "Cuéntanos el detalle"} wide>
                      <textarea
                        className="visit-input visit-textarea"
                        value={data.detalle}
                        onChange={(e) => patch({ detalle: e.target.value })}
                        placeholder={
                          intent === "personal"
                            ? "Cargos, cantidad de personas, ubicación de la obra y urgencia."
                            : intent === "reunion"
                              ? "De qué quieres hablar y quiénes participan."
                              : "Tu consulta, duda o comentario."
                        }
                        rows={6}
                      />
                    </LineField>
                  )}

                  {current.id === "enviar" && (
                    <div className="max-w-2xl">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-glow">Resumen</p>
                      <h2 className="font-display mt-3 text-3xl italic text-paper">Todo listo para enviar</h2>
                      <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
                        {summaryRows(intent, data).map(([label, value]) => (
                          <div key={label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                            <dt className="text-xs uppercase tracking-[0.18em] text-paper/50">{label}</dt>
                            <dd className="text-sm leading-6 text-paper">{value}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="mt-6 text-sm leading-6 text-paper/65">
                        Al confirmar se abre WhatsApp con este texto y tu cliente de correo.
                      </p>
                    </div>
                  )}

                  {error ? <p className="mt-8 text-sm text-red-300">{error}</p> : null}

                  <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-8">
                    <button
                      type="button"
                      className={btnGhostOnNight}
                      onClick={() => {
                        setError("");
                        setStep((s) => Math.max(0, s - 1));
                      }}
                      disabled={step === 0 || busy}
                    >
                      Atrás
                    </button>
                    {step < steps.length - 1 ? (
                      <button type="button" className={btnGlow} onClick={next}>
                        Continuar
                      </button>
                    ) : (
                      <button type="button" className={btnGlow} onClick={submit} disabled={busy}>
                        {busy ? "Preparando…" : "Enviar a WhatsApp y correo"}
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      ) : (
        <div className="bg-night pb-24" />
      )}

      <PublicFooter site={site} links={SITE_NAV} />
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
