"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BlocksRenderer from "@/app/components/ui/BlocksRenderer";
import { COMPANY_INFO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { LandingHeader } from "../chrome-header";
import { EmptyState } from "../empty-state";
import { Grain } from "../grain";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { DEMO_VACANTES } from "@/lib/demo-vacantes";
import { MODALIDAD_LABEL, TIPO_LABEL } from "./jobs-landing";

const display = "font-[family-name:var(--font-space-grotesk)] font-extrabold tracking-[-0.03em]";
const field =
  "mt-1.5 w-full rounded-xl border border-[#D5DDEC] bg-[#F5F7FB] px-3.5 py-3 text-[15px] text-[#0A2342] outline-none transition focus:border-[#1F5FD6] focus:bg-white focus:ring-2 focus:ring-[#1F5FD6]/20";
const label = "text-sm font-semibold text-[#33466A]";

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
        <section className="flex min-h-[60svh] items-center justify-center bg-[#F5F7FB] px-4 text-sm text-[#33466A]">
          Cargando vacante...
        </section>
      ) : !vacante ? (
        <section className="flex min-h-[60svh] items-center bg-[#F5F7FB] px-4 text-[#0A2342]">
          <div className="mx-auto w-full max-w-xl">
            <EmptyState
              kicker="404"
              title="Esta vacante no existe o ya fue cerrada"
              text="Vuelve al listado para ver las oportunidades abiertas."
            />
            <div className="mt-8 text-center">
              <Link href="/empleos/vacantes" className="inline-flex rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
                Ver vacantes
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="chrome-frame w-full bg-[#F5F7FB] py-10 text-[#0A2342] sm:py-14 lg:py-16">
            <div className="mx-auto w-full">
              <Link href="/empleos/vacantes" className="text-sm font-semibold text-[#1F5FD6]">
                ← Vacantes
              </Link>
              <p className="mt-6 inline-block rounded-full bg-[#FFE3C7] px-3.5 py-2 text-[15px] font-semibold text-[#7A3A00]">
                {vacante.division?.nombre ?? "Vacante"}
              </p>
              <h1 className="font-[family-name:var(--font-space-grotesk)] mt-5 max-w-[18ch] text-[clamp(2.8rem,5vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
                {vacante.titulo}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#33466A]">
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
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {cerrada ? (
                  <span className="rounded-full bg-[#0A2342] px-4 py-2 text-sm font-semibold text-white">
                    No disponible
                  </span>
                ) : (
                  <a href="#postular" className="rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
                    Postularme
                  </a>
                )}
              </div>
            </div>
          </section>

          <section className="chrome-frame bg-[#F5F7FB] pb-28 pt-4 text-[#0A2342]">
            <div className="mx-auto grid w-full gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-10">
                {vacante.descripcion ? (
                  <div>
                    <p className="text-sm font-semibold text-[#1F5FD6]">El puesto</p>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] mt-2 text-3xl font-extrabold tracking-[-0.03em]">Descripción</h2>
                    <div className="mt-6 space-y-4 text-base leading-7 text-[#33466A]">
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
                    <p className="text-sm font-semibold text-[#1F5FD6]">Perfil</p>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] mt-2 text-3xl font-extrabold tracking-[-0.03em]">Requisitos</h2>
                    <div className="mt-6 space-y-4 text-base leading-7 text-[#33466A]">
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
                <div className="rounded-[2rem] bg-white p-7 shadow-[0_2px_0_#D5DDEC] sm:p-8">
                  <p className="text-sm font-semibold text-[#1F5FD6]">Postulación</p>
                  {cerrada ? (
                    <>
                      <h2 className={`${display} mt-3 text-2xl`}>Esta vacante no está disponible</h2>
                      <p className="mt-3 text-sm leading-6 text-[#33466A]">
                        El puesto ya no recibe postulaciones. Revisa otras oportunidades o deja tu CV en{" "}
                        <a href={`mailto:${COMPANY_INFO.emailReclutamiento}`} className="font-semibold text-[#1F5FD6]">
                          {COMPANY_INFO.emailReclutamiento}
                        </a>
                        .
                      </p>
                      <div className="mt-6">
                        <Link href="/empleos/vacantes" className="inline-flex rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
                          Ver vacantes
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                  <h2 className={`${display} mt-3 text-2xl`}>Postularme a esta vacante</h2>
                  <p className="mt-2 text-sm text-[#33466A]">
                    O envía tu CV a{" "}
                    <a href={`mailto:${COMPANY_INFO.emailReclutamiento}`} className="font-semibold text-[#1F5FD6]">
                      {COMPANY_INFO.emailReclutamiento}
                    </a>
                    .
                  </p>
                  {enviado ? (
                    <div className="mt-8 text-center">
                      <p className={`${display} text-2xl`}>Postulación enviada</p>
                      <p className="mt-3 text-sm leading-6 text-[#33466A]">
                        Recibimos tu información. Nos comunicaremos contigo si tu perfil se ajusta.
                      </p>
                      <div className="mt-6">
                        <Link href="/empleos/vacantes" className="inline-flex rounded-xl bg-[#0A2342] px-6 py-3.5 text-[17px] font-semibold text-white">
                          Ver otras vacantes
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <label className={label} htmlFor="nombre">
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
                          className={field}
                        />
                      </div>
                      <div>
                        <label className={label} htmlFor="email">
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
                          className={field}
                        />
                      </div>
                      <div>
                        <label className={label} htmlFor="telefono">
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
                          className={field}
                        />
                      </div>
                      <div>
                        <label className={label} htmlFor="cv">
                          CV (PDF o Word)
                        </label>
                        <input
                          id="cv"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf"
                          className={`${field} file:mr-3 file:rounded-lg file:border-0 file:bg-[#E6EEFC] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-[#1747A8]`}
                          onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
                        />
                        <p className="mt-2 text-sm text-[#33466A]">
                          Si aún no tienes CV,{" "}
                          <Link href="/empleos#tu-cv" className="font-semibold text-[#1F5FD6]">
                            créalo aquí
                          </Link>
                          .
                        </p>
                      </div>
                      <div>
                        <label className={label} htmlFor="cartaPresentacion">
                          Carta de presentación
                        </label>
                        <textarea
                          id="cartaPresentacion"
                          name="cartaPresentacion"
                          value={formData.cartaPresentacion}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Cuéntanos brevemente por qué eres el candidato ideal..."
                          className={`${field} resize-none`}
                        />
                      </div>
                      {error ? <p className="text-sm text-danger">{error}</p> : null}
                      <button
                        type="submit"
                        disabled={enviando}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-[#1F5FD6] px-5 py-3.5 text-[17px] font-semibold text-white transition hover:bg-[#1747A8] disabled:cursor-not-allowed disabled:opacity-60"
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
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D5DDEC] bg-white p-3 sm:hidden">
              <a href="#postular" className="inline-flex w-full items-center justify-center rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
                Postularme
              </a>
            </div>
          )}
        </>
      )}
    </>
  );

  if (embedded) {
    return <div className="bg-[#F5F7FB] text-[#0A2342]">{content}</div>;
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
