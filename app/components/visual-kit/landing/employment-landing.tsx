"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ACTIVIDADES_COLABORADORES,
  AREAS_EMPLEO,
  FERIA_TRABAJO,
  FORMACION,
  PROCESO_CANDIDATOS,
} from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC, LANDING_HERO_BACKGROUNDS } from "@/lib/visual-kit/hakamo";
import { btnPrimary, btnSecondary } from "@/lib/visual-kit/styles";
import { LandingHeader } from "../chrome-header";
import { LandingHeroSection } from "../landing-hero-section";
import { PublicFooter } from "../public-footer";
import { ScrollProgress } from "../scroll-progress";

/** Solo lo que no está en /cv ni /empleos */
const DIFERENCIALES = [
  "Contrato, nómina y beneficios a cargo de Hakamo",
  "Inducción y acompañamiento al integrar el proyecto",
  "Operamos con empresas de construcción, energía e industria en RD",
  "Participamos en ferias con el Ministerio de Trabajo",
];

const GALLERY = [
  { src: "/visual-kit/heroes/employment-rrhh.jpg", alt: "Equipo en operación" },
  { src: "/visual-kit/obra.jpg", alt: "Obra y proyecto" },
  { src: "/visual-kit/heroes/jobs-rrhh.jpg", alt: "Talento en campo" },
  { src: "/visual-kit/contact/meeting.jpg", alt: "Reunión de equipo" },
  { src: "/visual-kit/heroes/home-rrhh.jpg", alt: "Ambiente laboral" },
  { src: "/visual-kit/contact/workspace.jpg", alt: "Espacio de trabajo" },
];

const ACTIVIDAD_IMAGES = [
  "/visual-kit/heroes/services-rrhh.jpg",
  "/visual-kit/contact/lobby.jpg",
  "/visual-kit/heroes/about-rrhh.jpg",
  "/visual-kit/heroes/job-detail-rrhh.jpg",
  "/visual-kit/heroes/cv-seeker.jpg",
];

const ACTIVIDADES = ACTIVIDADES_COLABORADORES.map((item, index) => {
  let texto = item.texto;
  if (item.titulo === "Empleado seguro") {
    texto = "Entornos conformes a la normativa SSO en cada proyecto.";
  } else if (item.titulo === "Torneo de dominó") {
    texto = "Convivencia y reconocimiento entre colaboradores.";
  }
  return {
    ...item,
    texto,
    imagen: ACTIVIDAD_IMAGES[index % ACTIVIDAD_IMAGES.length],
  };
});

export function EmploymentLanding() {
  const site = SITE_PUBLIC;

  return (
    <div className="min-h-[100svh] bg-paper text-ink">
      <ScrollProgress />

      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Saltar al contenido
      </a>

      <LandingHeader
        name={site.name}
        links={SITE_NAV}
        ctaHref="/cv"
        ctaLabel="Postúlate aquí"
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
        tone="paper"
      />

      <LandingHeroSection background={LANDING_HERO_BACKGROUNDS.employment} tone="paper" compact>
        <div className="landing-hero-inner landing-hero-inner-compact landing-hero-inner--start mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-accent">Cultura</p>
          <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,4rem)] leading-[1.05] tracking-[-0.03em] text-ink">
            Cómo es trabajar
            <span className="mt-1 block italic text-accent">con Hakamo</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-6 text-muted sm:text-base">
            Qué implica formar parte de nuestros proyectos: contrato, inducción, seguridad y vida
            laboral en campo.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#proceso" className={btnPrimary}>
              Ver el proceso
            </a>
            <Link href="/empleos" className={btnSecondary}>
              Vacantes abiertas
            </Link>
          </div>
          </div>
        </div>
      </LandingHeroSection>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14" aria-label="Galería">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {GALLERY.map((photo, index) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden bg-paper ${
                index === 0
                  ? "aspect-[4/5] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[28rem]"
                  : index === 3
                    ? "aspect-[4/5] md:aspect-[3/4]"
                    : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes={index === 0 ? "(max-width: 768px) 50vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/visual-kit/heroes/about-rrhh.jpg"
              alt="Colaboradores Hakamo"
              fill
              className="object-cover object-[50%_20%]"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Candidatos</p>
            <h2 className="font-display mt-3 max-w-xl text-3xl leading-snug text-ink sm:text-4xl">
              Lo que nos distingue
            </h2>
            <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {DIFERENCIALES.map((item, index) => (
                <article key={item} className="grid gap-3 py-4 md:grid-cols-[3.5rem_1fr] md:items-center">
                  <span className="font-display text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-lg tracking-tight text-ink sm:text-xl">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="proceso" className="border-t border-ink/8 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Proceso</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Del registro al proyecto
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESO_CANDIDATOS.map((paso) => (
              <article key={paso.paso}>
                <p className="font-display text-2xl text-accent">{paso.paso}</p>
                <h3 className="mt-3 font-display text-lg text-ink">{paso.titulo}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted">
                  {paso.subtitulo}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{paso.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-paper px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Sectores</p>
            <h2 className="font-display mt-3 max-w-xl text-3xl leading-snug text-ink sm:text-4xl">
              Áreas donde colocamos talento
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted">
              Indica tu área al registrarte para priorizar vacantes afines.
            </p>
            <div className="relative mt-8 hidden aspect-[4/5] overflow-hidden lg:block">
              <Image
                src="/visual-kit/obra.jpg"
                alt="Proyecto en obra"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {AREAS_EMPLEO.filter((area) => area !== "Otro").map((area, index) => (
              <article
                key={area}
                className="flex items-center gap-3 border-b border-ink/8 px-1 py-3"
              >
                <span className="font-display text-sm text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base tracking-tight text-ink sm:text-lg">{area}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Formación</p>
            <h2 className="font-display mt-3 max-w-xl text-3xl leading-snug text-ink sm:text-4xl">
              {FORMACION.titulo}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">{FORMACION.texto}</p>
            <p className="mt-6 max-w-xl text-sm leading-6 text-muted">
              <span className="font-medium text-ink">{FERIA_TRABAJO.titulo}.</span> {FERIA_TRABAJO.texto}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/visual-kit/heroes/services-rrhh.jpg"
                alt="Formación en campo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 24vw"
              />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden">
              <Image
                src="/visual-kit/contact/meeting.jpg"
                alt="Capacitación de equipo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 24vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-paper px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Vida laboral</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl leading-snug text-ink sm:text-4xl">
            Actividades y cuidado al colaborador
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVIDADES.map((item) => (
              <article key={item.titulo}>
                <div className="relative mb-4 aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.imagen}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="font-display text-lg text-ink">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Siguiente paso</h2>
          <p className="mt-3 text-sm text-muted">
            Para postularte usa Tu CV; para puestos abiertos, Vacantes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/cv" className={btnPrimary}>
              Ir a Tu CV
            </Link>
            <Link href="/empleos" className={btnSecondary}>
              Ver vacantes
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} tone="paper" />
    </div>
  );
}
