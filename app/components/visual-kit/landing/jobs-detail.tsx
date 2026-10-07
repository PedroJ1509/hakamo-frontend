"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BlocksRenderer from "@/app/components/ui/BlocksRenderer";
import { COMPANY_INFO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { btnPrimary, fieldClass, labelClass } from "@/lib/visual-kit/styles";
import { LandingHeader } from "../chrome-header";
import { EmptyState } from "../empty-state";
import { Grain } from "../grain";
import { LandingHeroSection } from "../landing-hero-section";
import { MagneticButton } from "../magnetic-button";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { DEMO_VACANTES } from "@/lib/demo-vacantes";
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
  descripcion: BlockNode[] | string | null;
  requisitos: BlockNode[] | string | null;
  ubicacion: string;
  modalidad: string;
  tipo: string;
  salario: string;
  fechaCierre: string;
  estado?: "activa" | "cerrada";
  division: { nombre: string } | null;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  cartaPresentacion: string;
}

const initialForm: FormData = { nombre: "", email: "", telefono: "", cartaPresentacion: "" };

export function JobsDetail({ embedded = false }: { embedded?: boolean }) {
  const params = useParams();
  const id = params.id as string;
  const site = SITE_PUBLIC;
  const [vacante, setVacante] = useState<VacanteData | null>(null);
  const [cargando, setCargando] = useState(true);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const cerrada = vacante?.estado === "cerrada";

  useEffect(() => {
    const demo = DEMO_VACANTES.find((item) => item.documentId === id) as VacanteData | undefined;
    if (!STRAPI_URL) {
      setVacante(demo ?? null);
      setCargando(false);
      return;
    }
    fetch(`${STRAPI_URL}/api/vacantes/${id}?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setVacante((data.data as VacanteData | null) ?? demo ?? null);
        setCargando(false);
      })
      .catch(() => {
        setVacante(demo ?? null);
        setCargando(false);
      });
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!vacante) return;
    setEnviando(true);
    setError("");
    const data = {
      ...formData,
      cartaPresentacion: cvFile
        ? `${formData.cartaPresentacion}\nCV adjunto: ${cvFile.name}`.trim()
        : formData.cartaPresentacion,
      vacante: vacante.documentId,
      estado: "recibida",
    };
    try {
      const res = cvFile
        ? await fetch(`${STRAPI_URL}/api/postulacions`, {
            method: "POST",
            body: (() => {
              const body = new FormData();
              body.append("data", JSON.stringify(data));
              body.append("files.cv", cvFile);
              return body;
            })(),
          })
        : await fetch(`${STRAPI_URL}/api/postulacions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
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

  const content = (
    <>
      {cargando ? (
        <section className="flex min-h-[60svh] items-center justify-center bg-paper px-4 text-sm text-muted">
          Cargando vacante...
        </section>
      ) : !vacante ? (
        <section className="flex min-h-[60svh] items-center bg-paper px-4">
          <div className="mx-auto w-full max-w-xl">
            <EmptyState
              kicker="404"
              title="Esta vacante no existe o ya fue cerrada"
              text="Vuelve al listado para ver las oportunidades abiertas."
            />
            <div className="mt-8 text-center">
              <MagneticButton href="/empleos/vacantes" variant="ink">
                Ver vacantes
              </MagneticButton>
            </div>
          </div>
        </section>
      ) : (
        <>
          <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.jobDetail} tone="paper" compact>
            <div className="landing-hero-inner landing-hero-inner-compact mx-auto max-w-3xl px-4 text-center sm:px-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-accent">
                {vacante.division?.nombre ?? "Vacante"}
              </p>
              <h1 className="font-display mt-5 text-[clamp(1.85rem,4.2vw,3.15rem)] leading-[1.08] tracking-[-0.03em] text-ink">
                {vacante.titulo}
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-muted">
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
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {cerrada ? (
                  <span className="rounded-full bg-ink px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper">
                    No disponible
                  </span>
                ) : (
                  <a href="#postular" className={btnPrimary}>
                    Postularme
                  </a>
                )}
              </div>
            </div>
          </LandingHeroSection>

          <section className="bg-paper px-4 pb-28 pt-20 sm:px-6 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-10">
                {vacante.descripcion ? (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-accent">El puesto</p>
                    <h2 className="font-display mt-3 text-3xl leading-snug text-ink">Descripción</h2>
                    <div className="mt-6 max-w-xl space-y-4 text-sm leading-6 text-muted">
                      {typeof vacante.descripcion === "string" ? (
                        <p>{vacante.descripcion}</p>
                      ) : (
                        <BlocksRenderer content={vacante.descripcion} />
                      )}
                    </div>
                  </div>
                ) : null}
                {vacante.requisitos ? (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Perfil</p>
                    <h2 className="font-display mt-3 text-3xl leading-snug text-ink">Requisitos</h2>
                    <div className="mt-6 max-w-xl space-y-4 text-sm leading-6 text-muted">
                      {typeof vacante.requisitos === "string" ? (
                        <p>{vacante.requisitos}</p>
                      ) : (
                        <BlocksRenderer content={vacante.requisitos} />
                      )}
                    </div>
                  </div>
                ) : null}
              </div>

              <div id="postular">
                <div className="glass-panel rounded-[2rem] p-7">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Postulación</p>
                  {cerrada ? (
                    <>
                      <h2 className="font-display mt-3 text-2xl text-ink">Esta vacante no está disponible</h2>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        El puesto ya no recibe postulaciones. Revisa otras oportunidades o deja tu CV en{" "}
                        <a href={`mailto:${COMPANY_INFO.emailReclutamiento}`} className="font-semibold text-accent">
                          {COMPANY_INFO.emailReclutamiento}
                        </a>
                        .
                      </p>
                      <div className="mt-6">
                        <Link href="/empleos/vacantes" className={btnPrimary}>
                          Ver vacantes
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                  <h2 className="font-display mt-3 text-2xl text-ink">Postularme a esta vacante</h2>
                  <p className="mt-2 text-sm text-muted">
                    O envía tu CV a{" "}
                    <a href={`mailto:${COMPANY_INFO.emailReclutamiento}`} className="font-semibold text-accent">
                      {COMPANY_INFO.emailReclutamiento}
                    </a>
                    .
                  </p>
                  {enviado ? (
                    <div className="mt-8 text-center">
                      <p className="font-display text-2xl text-ink">Postulación enviada</p>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        Recibimos tu información. Nos comunicaremos contigo si tu perfil se ajusta.
                      </p>
                      <div className="mt-6">
                        <MagneticButton href="/empleos/vacantes" variant="ink" size="sm">
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
                      <div>
                        <label className={labelClass} htmlFor="cv">
                          CV (PDF o Word)
                        </label>
                        <input
                          id="cv"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf"
                          className={`${fieldClass} file:mr-3 file:rounded-full file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-accent`}
                          onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
                        />
                        <p className="mt-2 text-sm text-muted">
                          Si aún no tienes CV,{" "}
                          <Link href="/empleos#tu-cv" className="font-semibold text-accent">
                            créalo aquí
                          </Link>
                          .
                        </p>
                      </div>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
          {cerrada ? null : (
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white p-3 sm:hidden">
              <a href="#postular" className={`${btnPrimary} w-full`}>
                Postularme
              </a>
            </div>
          )}
        </>
      )}
    </>
  );

  if (embedded) {
    return <div className="landing bg-paper">{content}</div>;
  }

  return (
    <div className="landing">
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
      {content}
      <PublicFooter site={site} links={SITE_NAV} />
    </div>
  );
}
