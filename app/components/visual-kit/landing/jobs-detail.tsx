"use client";

import { useSitio } from "@/app/components/sitio-context";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import BlocksRenderer from "@/app/components/ui/BlocksRenderer";
import { enviarPostulacion } from "@/lib/cv/enviar-postulacion";
import { LandingHeader } from "../chrome-header";
import { EmptyState } from "../empty-state";
import { Grain } from "../grain";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";
import { DEMO_VACANTES, USAR_DEMO } from "@/lib/demo-vacantes";
import { MODALIDAD_LABEL, TIPO_LABEL } from "./jobs-landing";
import type { ContenidoFicha } from "@/lib/cms/vacante";
import { TEXTOS_FICHA } from "@/lib/cms/vacante-textos";
import { FondoSeccion } from "../fondo-seccion";

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

export function JobsDetail({ embedded = false, contenido }: { embedded?: boolean; contenido?: ContenidoFicha }) {
  const t = contenido?.textos ?? TEXTOS_FICHA;
  const params = useParams();
  const id = params.id as string;
  const { contacto } = useSitio();
  const [vacante, setVacante] = useState<VacanteData | null>(null);
  const [cargando, setCargando] = useState(true);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const cerrada = vacante?.estado === "cerrada";

  useEffect(() => {
    const demo = USAR_DEMO ? (DEMO_VACANTES.find((item) => item.documentId === id) as VacanteData | undefined) : undefined;
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
    try {
      await enviarPostulacion(
        {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          cartaPresentacion: formData.cartaPresentacion,
          origen: "vacante",
          vacante: vacante.documentId,
        },
        cvFile ?? undefined,
        cvFile?.name,
      );
      setEnviado(true);
      setFormData(initialForm);
    } catch {
      setError(t.error);
    } finally {
      setEnviando(false);
    }
  };

  const content = (
    <>
      {cargando ? (
        <section className="flex min-h-[60svh] items-center justify-center bg-[#F5F7FB] px-4 text-sm text-[#33466A]">
          {t.cargando}
        </section>
      ) : !vacante ? (
        <section className="flex min-h-[60svh] items-center bg-[#F5F7FB] px-4 text-[#0A2342]">
          <div className="mx-auto w-full max-w-xl">
            <EmptyState
              kicker="404"
              title={t.noExisteTitulo}
              text={t.noExisteTexto}
            />
            <div className="mt-8 text-center">
              <Link href="/empleos/vacantes" className="inline-flex rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
                {t.verVacantes}
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section
            className={`relative isolate w-full bg-[#F5F7FB] py-10 sm:py-14 lg:py-16 ${
              contenido?.fondo.tono === "claro" ? "text-white [&_.texto-suave]:text-white/75" : "text-[#0A2342]"
            }`}
          >
            {contenido ? <FondoSeccion fondo={contenido.fondo} /> : null}
            <div className="chrome-frame relative mx-auto w-full">
              <Link href="/empleos/vacantes" className="text-sm font-semibold text-[#1F5FD6]">
                {t.volver}
              </Link>
              <p className="mt-6 inline-block rounded-full bg-[#FFE3C7] px-3.5 py-2 text-[15px] font-semibold text-[#7A3A00]">
                {vacante.division?.nombre ?? t.sinArea}
              </p>
              <h1 className="font-[family-name:var(--font-space-grotesk)] mt-5 max-w-full text-balance text-[clamp(2rem,8vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.03em] break-words sm:max-w-[18ch]">
                {vacante.titulo}
              </h1>
              <p className="texto-suave mt-5 max-w-3xl text-base leading-relaxed break-words text-[#33466A] sm:mt-6 sm:text-lg">
                {[
                  vacante.ubicacion,
                  vacante.modalidad ? MODALIDAD_LABEL[vacante.modalidad] : null,
                  vacante.tipo ? TIPO_LABEL[vacante.tipo] : null,
                  vacante.salario,
                  vacante.fechaCierre
                    ? `${t.cierra} ${new Date(`${vacante.fechaCierre.slice(0, 10)}T12:00:00`).toLocaleDateString("es-DO", {
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
                    {t.noDisponible}
                  </span>
                ) : (
                  <a href="#postular" className="rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
                    {t.postularme}
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
                    <p className="text-sm font-semibold text-[#1F5FD6]">{t.antetituloDescripcion}</p>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] mt-2 text-3xl font-extrabold tracking-[-0.03em]">{t.tituloDescripcion}</h2>
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
                    <p className="text-sm font-semibold text-[#1F5FD6]">{t.antetituloRequisitos}</p>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] mt-2 text-3xl font-extrabold tracking-[-0.03em]">{t.tituloRequisitos}</h2>
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
                  <p className="text-sm font-semibold text-[#1F5FD6]">{t.antetituloPostulacion}</p>
                  {cerrada ? (
                    <>
                      <h2 className={`${display} mt-3 text-2xl`}>{t.tituloCerrada}</h2>
                      <p className="mt-3 text-sm leading-6 text-[#33466A]">
                        <ConCorreo texto={t.textoCerrada} correo={contacto.emailReclutamiento} />
                      </p>
                      <div className="mt-6">
                        <Link href="/empleos/vacantes" className="inline-flex rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
                          {t.verVacantes}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                  <h2 className={`${display} mt-3 text-2xl`}>{t.tituloPostulacion}</h2>
                  <p className="mt-2 text-sm text-[#33466A]">
                    <ConCorreo texto={t.textoPostulacion} correo={contacto.emailReclutamiento} />
                  </p>
                  {enviado ? (
                    <div className="mt-8 text-center">
                      <p className={`${display} text-2xl`}>{t.enviadaTitulo}</p>
                      <p className="mt-3 text-sm leading-6 text-[#33466A]">
                        {t.enviadaTexto}
                      </p>
                      <div className="mt-6">
                        <Link href="/empleos/vacantes" className="inline-flex rounded-xl bg-[#0A2342] px-6 py-3.5 text-[17px] font-semibold text-white">
                          {t.verOtras}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <label className={label} htmlFor="nombre">
                          {t.etiquetaNombre}
                        </label>
                        <input
                          id="nombre"
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          placeholder={t.ejemploNombre}
                          className={field}
                        />
                      </div>
                      <div>
                        <label className={label} htmlFor="email">
                          {t.etiquetaCorreo}
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder={t.ejemploCorreo}
                          className={field}
                        />
                      </div>
                      <div>
                        <label className={label} htmlFor="telefono">
                          {t.etiquetaTelefono}
                        </label>
                        <input
                          id="telefono"
                          type="text"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          required
                          placeholder={t.ejemploTelefono}
                          className={field}
                        />
                      </div>
                      <div>
                        <label className={label} htmlFor="cv">
                          {t.etiquetaCv}
                        </label>
                        <input
                          id="cv"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf"
                          className={`${field} max-w-full file:mr-3 file:rounded-lg file:border-0 file:bg-[#E6EEFC] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-[#1747A8]`}
                          onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
                        />
                        <p className="mt-2 text-sm text-[#33466A]">
                          {t.sinCv}{" "}
                          <Link href="/empleos#tu-cv" className="font-semibold text-[#1F5FD6]">
                            {t.crealoAqui}
                          </Link>
                          .
                        </p>
                      </div>
                      <div>
                        <label className={label} htmlFor="cartaPresentacion">
                          {t.etiquetaCarta}
                        </label>
                        <textarea
                          id="cartaPresentacion"
                          name="cartaPresentacion"
                          value={formData.cartaPresentacion}
                          onChange={handleChange}
                          rows={4}
                          placeholder={t.ejemploCarta}
                          className={`${field} resize-none`}
                        />
                      </div>
                      {error ? <p className="text-sm text-danger">{error}</p> : null}
                      <button
                        type="submit"
                        disabled={enviando}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-[#1F5FD6] px-5 py-3.5 text-[17px] font-semibold text-white transition hover:bg-[#1747A8] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {enviando ? t.enviando : t.enviar}
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
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D5DDEC] bg-white p-3 pr-20 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
              <a href="#postular" className="inline-flex w-full items-center justify-center rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white">
                {t.postularme}
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
      <LandingHeader />
      {content}
      <PublicFooter />
    </div>
  );
}

/** Texto del CMS donde `{correoReclutamiento}` se vuelve un enlace de correo. */
function ConCorreo({ texto, correo }: { texto: string; correo: string }) {
  const partes = texto.split("{correoReclutamiento}");
  return (
    <>
      {partes.map((parte, i) => (
        <span key={i}>
          {parte}
          {i < partes.length - 1 ? (
            <a href={`mailto:${correo}`} className="font-semibold text-[#1F5FD6]">
              {correo}
            </a>
          ) : null}
        </span>
      ))}
    </>
  );
}
