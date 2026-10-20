"use client";

import Link from "next/link";
import { useSitio } from "@/app/components/sitio-context";
import type { Boton } from "@/lib/cms/comun";
import type { Sitio } from "@/lib/cms/sitio";
import { FondoSeccion } from "./fondo-seccion";
import { Logo } from "./logo";
import type { NavLink } from "@/lib/visual-kit/types";
import { btnPrimary } from "@/lib/visual-kit/styles";

/**
 * Pie de página. Textos, botones, contacto, redes y fondo salen de la Configuración del sitio.
 * `audiencia` elige el menú y los botones: los de empresas o los de empleos.
 * `tone` elige el diseño: `night` (oscuro) o `paper` (claro).
 */
export function PublicFooter({
  audiencia = "empresas",
  tone = "night",
}: {
  audiencia?: "empresas" | "empleos";
  tone?: "night" | "paper";
}) {
  const sitio = useSitio();
  const paper = tone === "paper";
  const empleos = audiencia === "empleos";
  const links = empleos ? sitio.menuEmpleos : sitio.menuEmpresas;
  const staff = empleos ? sitio.botonCabeceraEmpleos : sitio.botonCabeceraEmpresas;
  const accion = empleos ? sitio.pie.botonEmpleos : sitio.pie.botonEmpresas;

  if (paper) {
    const fondo = sitio.pie.fondoEmpleos;
    const claro = fondo.tono === "claro";
    return (
      <footer className={`relative isolate overflow-hidden border-t border-ink/8 bg-white ${claro ? "text-paper" : "text-ink"}`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 100%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 42%), radial-gradient(ellipse at 90% 0%, color-mix(in srgb, var(--glow) 12%, transparent), transparent 40%)",
          }}
        />
        <FondoSeccion fondo={fondo} />
        <div className="chrome-frame relative py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Logo inverted={claro} className={claro ? "text-paper" : "text-ink"} />
            <a href={accion.url} className={`${btnPrimary} w-full sm:w-auto`}>
              {accion.texto}
            </a>
          </div>
          <FooterFacts sitio={sitio} claro={claro} reclutamiento />

          <FooterBar links={links} sitio={sitio} staff={staff} claro={claro} />
        </div>
      </footer>
    );
  }

  const fondo = sitio.pie.fondo;
  const claro = fondo.tono === "claro";
  return (
    <footer className={`relative isolate overflow-hidden bg-night ${claro ? "text-paper" : "text-ink"}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-glow/14 blur-3xl" />
      </div>
      <FondoSeccion fondo={fondo} />
      <div className="chrome-frame relative py-16 sm:py-24">
        <div>
          <Logo inverted={claro} className={claro ? "text-paper" : "text-ink"} />
          <p className={`mt-6 max-w-sm text-sm leading-6 ${claro ? "text-paper/60" : "text-muted"}`}>{sitio.pie.texto}</p>
        </div>
        <FooterFacts sitio={sitio} claro={claro} />

        <FooterBar links={links} sitio={sitio} staff={staff} claro={claro} />
      </div>
    </footer>
  );
}

function FooterFacts({ sitio, claro, reclutamiento = false }: { sitio: Sitio; claro: boolean; reclutamiento?: boolean }) {
  const { contacto } = sitio;
  const label = `text-[11px] font-medium uppercase tracking-[0.22em] ${claro ? "text-glow" : "text-accent"}`;
  const value = `text-sm leading-6 ${claro ? "text-paper" : "text-ink"}`;
  const hover = claro ? "hover:text-glow" : "hover:text-accent";
  const email = reclutamiento ? contacto.emailReclutamiento : contacto.email;
  const phones = [
    { href: contacto.whatsappUrl, text: contacto.telefono, external: true },
    ...(reclutamiento || !contacto.telefonoAlt ? [] : [{ href: contacto.telefonoAltUrl, text: contacto.telefonoAlt, external: false }]),
  ];

  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <p className={label}>Dirección</p>
        <p className={`mt-3 ${value}`}>{contacto.direccion}</p>
      </div>
      <div>
        <p className={label}>WhatsApp</p>
        <ul className={`mt-3 space-y-1 ${value}`}>
          {phones.map((phone) => (
            <li key={phone.text}>
              <a
                href={phone.href}
                {...(phone.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className={hover}
              >
                {phone.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className={label}>Correo</p>
        <a href={`mailto:${email}`} className={`mt-3 block break-all ${value} ${hover}`}>
          {email}
        </a>
      </div>
      {sitio.redes.length > 0 ? (
        <div>
          <p className={label}>Redes</p>
          <ul className={`mt-3 space-y-1 ${value}`}>
            {sitio.redes.map((red) => (
              <li key={red.url}>
                <a href={red.url} target="_blank" rel="noreferrer" className={hover}>
                  {red.texto || red.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function FooterBar({ links, sitio, staff, claro }: { links: NavLink[]; sitio: Sitio; staff: Boton; claro: boolean }) {
  const line = claro ? "border-white/10 text-paper/45" : "border-ink/8 text-muted";
  const hover = claro ? "hover:text-glow" : "hover:text-accent";

  return (
    <div className={`mt-12 flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between ${line}`}>
      <nav className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((link) => (
          <a key={link.href} href={link.href} className={hover}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span>
          © {new Date().getFullYear()} {sitio.nombre}
        </span>
        <Link href="/privacidad" className={hover}>
          {sitio.pie.textoPrivacidad}
        </Link>
        <Link href={staff.url} className={hover}>
          {staff.texto}
        </Link>
      </div>
    </div>
  );
}
