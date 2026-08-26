"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlocksRenderer from "@/app/components/ui/BlocksRenderer";
import { SITE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { fieldClass, labelClass } from "@/lib/visual-kit/styles";
import { LandingHeader } from "../chrome-header";
import { EmptyState } from "../empty-state";
import { Grain } from "../grain";
import { MagneticButton } from "../magnetic-button";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { MODALIDAD_LABEL, TIPO_LABEL } from "./jobs-landing";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

type BlockNode = {
  type: string;
  children?: BlockNode[];
  text?: string;
  level?: number;
  format?: string;
  url?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

interface VacanteData {
  documentId: string;
  titulo: string;
  descripcion: BlockNode[] | null;
  requisitos: BlockNode[] | null;
  ubicacion: string;
  modalidad: string;
  tipo: string;
  salario: string;
  fechaCierre: string;
  division: { nombre: string } | null;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  cartaPresentacion: string;
}

const initialForm: FormData = { nombre: "", email: "", telefono: "", cartaPresentacion: "" };

export function JobsDetail() {
  const params = useParams();
  const id = params.id as string;
  const site = SITE_PUBLIC;
  const [vacante, setVacante] = useState<VacanteData | null>(null);
  const [cargando, setCargando] = useState(true);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/vacantes/${id}?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setVacante(data.data ?? null);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!vacante) return;
    setEnviando(true);
    setError("");
    try {
      const res = await fetch(`${STRAPI_URL}/api/postulacions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: { ...formData, vacante: vacante.documentId, estado: "recibida" },
        }),
      });
      if (!res.ok) throw new Error("Error al enviar la postulación");
      setEnviado(true);
      setFormData(initialForm);
    } catch {
      setError("Hubo un problema al enviar tu postulación. Por favor intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="landing">
      <ScrollProgress />
      <Grain />
      <LandingHeader name={site.name} links={SITE_NAV} ctaHref="/empleos" ctaLabel="Ver vacantes" />

      {cargando ? (
        <section className="flex min-h-[100svh] items-center justify-center bg-night px-4 pt-[var(--header-h)] text-sm text-paper/55">
          Cargando vacante...
        </section>
      ) : !vacante ? (
        <section className="flex min-h-[100svh] items-center bg-paper px-4 pt-[var(--header-h)]">
          <div className="mx-auto w-full max-w-xl">
            <EmptyState
              kicker="404"
              title="Esta vacante no existe o ya fue cerrada"
              text="Vuelve al listado para ver las oportunidades abiertas."
            />
            <div className="mt-8 text-center">
              <MagneticButton href="/empleos" variant="ink">
                Ver vacantes
              </MagneticButton>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="relative min-h-[70svh] overflow-hidden bg-night px-4 text-paper sm:px-6">
            <div className="absolute inset-0" aria-hidden>
              <div className="hero-field" />
              <div className="hero-vignette" />
              <div className="hero-veil" />
            </div>
            <div className="landing-hero-inner landing-hero-inner-compact mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-glow">
                {vacante.division?.nombre ?? "Vacante"}
              </p>
              <h1 className="cinematic-title font-display mt-5 text-[clamp(1.85rem,4.2vw,3.15rem)] leading-[1.08] tracking-[-0.03em]">
                {vacante.titulo}
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-paper/70">
                {[
                  vacante.ubicacion,
                  vacante.modalidad ? MODALIDAD_LABEL[vacante.modalidad] : null,
                  vacante.tipo ? TIPO_LABEL[vacante.tipo] : null,
                  vacante.salario,
                  vacante.fechaCierre
                    ? `Cierra ${new Date(vacante.fechaCierre).toLocaleDateString("es-DO", {
                        day: "numeric",
                        month: "long",
                      })}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <div className="mt-8">
                <MagneticButton href="#postular">Postularme</MagneticButton>
              </div>
            </div>
          </section>

          <section className="bg-paper px-4 py-20 sm:px-6 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-10">
                {vacante.descripcion ? (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-accent">El puesto</p>
                    <h2 className="font-display mt-3 text-3xl leading-snug text-ink">Descripción</h2>
                    <div className="mt-6 max-w-xl space-y-4 text-sm leading-6 text-muted">
                      <BlocksRenderer content={vacante.descripcion} />
                    </div>
                  </div>
                ) : null}
                {vacante.requisitos ? (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Perfil</p>
                    <h2 className="font-display mt-3 text-3xl leading-snug text-ink">Requisitos</h2>
                    <div className="mt-6 max-w-xl space-y-4 text-sm leading-6 text-muted">
                      <BlocksRenderer content={vacante.requisitos} />
                    </div>
                  </div>
                ) : null}
              </div>

              <div id="postular">
                <div className="glass-panel rounded-[2rem] p-7">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Postulación</p>
                  <h2 className="font-display mt-3 text-2xl text-ink">Postularme a esta vacante</h2>
                  {enviado ? (
                    <div className="mt-8 text-center">
                      <p className="font-display text-2xl text-ink">Postulación enviada</p>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        Recibimos tu información. Nos comunicaremos contigo si tu perfil se ajusta.
                      </p>
                      <div className="mt-6">
                        <MagneticButton href="/empleos" variant="ink" size="sm">
                          Ver otras vacantes
                        </MagneticButton>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <label className={labelClass} htmlFor="nombre">
                          Nombre completo
                        </label>
                        <input
                          id="nombre"
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          placeholder="Juan Pérez"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="email">
                          Correo
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="juan@correo.com"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="telefono">
                          Teléfono
                        </label>
                        <input
                          id="telefono"
                          type="text"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          required
                          placeholder="829-000-0000"
                          className={fieldClass}
                        />
                      </div>
                      <p className="rounded-2xl border border-accent/20 bg-accent/5 p-4 text-sm leading-6 text-muted">
                        Luego de enviar, manda tu CV en PDF al WhatsApp{" "}
                        <a
                          href="https://wa.me/18296790671"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-accent"
                        >
                          829-679-0671
                        </a>{" "}
                        indicando el puesto.
                      </p>
                      <div>
                        <label className={labelClass} htmlFor="cartaPresentacion">
                          Carta de presentación
                        </label>
                        <textarea
                          id="cartaPresentacion"
                          name="cartaPresentacion"
                          value={formData.cartaPresentacion}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Cuéntanos brevemente por qué eres el candidato ideal..."
                          className={`${fieldClass} resize-none`}
                        />
                      </div>
                      {error ? <p className="text-sm text-danger">{error}</p> : null}
                      <button
                        type="submit"
                        disabled={enviando}
                        className="inline-flex w-full items-center justify-center rounded-full bg-night px-5 py-3 text-sm font-semibold text-paper transition hover:bg-[color-mix(in_srgb,var(--night)_88%,white)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {enviando ? "Enviando..." : "Enviar postulación"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
