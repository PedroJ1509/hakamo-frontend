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
import { Reveal } from "../reveal";

const display = "font-[family-name:var(--font-space-grotesk)] font-extrabold tracking-[-0.03em]";
const wide = "chrome-frame mx-auto w-full";

const DIFERENCIALES = [
  "Contrato, nómina y beneficios a cargo de Hakamo",
  "Inducción y acompañamiento al integrar el proyecto",
  "Operamos con empresas de construcción, energía e industria en RD",
  "Participamos en ferias con el Ministerio de Trabajo",
];

const HERO_CARDS = [
  { kicker: "Contrato", title: "Nómina y beneficios a cargo de Hakamo" },
  { kicker: "Inducción", title: "Acompañamiento al entrar al proyecto" },
  { kicker: "Campo", title: "Construcción, energía e industria en RD" },
];

const TILTS = ["sm:-rotate-2", "sm:translate-x-7 sm:rotate-1", "sm:-rotate-1"];

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
  return (
    <div className="bg-[#F5F7FB] text-[#0A2342]">
      <section
        className={`${wide} grid items-center gap-10 py-8 sm:py-12 lg:grid-cols-2 lg:gap-16 lg:py-16`}
      >
        <Reveal from="left">
          <p className="inline-block rounded-full bg-[#FFE3C7] px-3.5 py-2 text-[15px] font-semibold text-[#7A3A00]">
            Cultura
          </p>
          <h1
            className={`${display} mt-5 max-w-[14ch] text-[clamp(3rem,4.6vw,5.4rem)] leading-[0.96]`}
          >
            Cómo es trabajar con Hakamo.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#33466A] sm:text-xl">
            Contrato, inducción, seguridad y vida laboral en los proyectos donde colocamos talento.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#proceso"
              className="rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white"
            >
              Ver el proceso
            </a>
            <Link
              href="/empleos/vacantes"
              className="rounded-xl border-2 border-[#D5DDEC] bg-white px-6 py-3.5 text-[17px] font-semibold text-[#0A2342]"
            >
              Vacantes abiertas
            </Link>
          </div>
        </Reveal>

        <Reveal from="right">
          <div className="flex min-h-[320px] w-full flex-col justify-center gap-4 rounded-[2rem] bg-[#1F5FD6] p-6 sm:min-h-[460px] sm:p-10 lg:p-12">
            {HERO_CARDS.map((card, index) => (
              <article
                key={card.title}
                className={`empleos-float rounded-[1.15rem] bg-white px-5 py-5 text-[#0A2342] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${TILTS[index] ?? ""} ${index > 0 ? "hidden sm:block" : ""}`}
                style={{ animationDelay: `${index * 0.35}s` }}
              >
                <p className="text-sm font-semibold text-[#1F5FD6]">{card.kicker}</p>
                <p className={`${display} mt-1 text-[1.35rem] leading-tight`}>{card.title}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="empleos-tape" aria-label="Lo que incluye trabajar con Hakamo">
        <ul className="sr-only">
          {DIFERENCIALES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="empleos-tape-track" aria-hidden>
          {[0, 1, 2, 3].flatMap((copy) =>
            DIFERENCIALES.map((item) => (
              <span key={`${copy}-${item}`} className="empleos-tape-item">
                <span className="text-[#7EB0FF]">✓</span>
                {item}
              </span>
            )),
          )}
        </div>
      </section>

      <section
        id="proceso"
        className={`scroll-mt-[var(--header-h)] ${wide} py-16`}
      >
        <h2 className={`${display} text-4xl sm:text-5xl`}>Del registro al proyecto</h2>
        <p className="mb-8 mt-2 text-[#33466A]">Cuatro pasos, sin letra chica.</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO_CANDIDATOS.map((paso, index) => (
            <Reveal key={paso.paso} delay={index * 80}>
              <article className="h-full border-t-4 border-[#1F5FD6] pt-5">
                <p className={`${display} text-5xl leading-none text-[#1F5FD6]`}>{paso.paso}</p>
                <h3 className={`${display} mt-4 text-2xl`}>{paso.titulo}</h3>
                <p className="mt-1 text-sm font-semibold text-[#4A5C7C]">{paso.subtitulo}</p>
                <p className="mt-3 text-[#33466A]">{paso.descripcion}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${wide} py-8`}>
        <h2 className={`${display} text-4xl sm:text-5xl`}>Áreas donde colocamos talento</h2>
        <p className="mb-7 mt-2 text-[#33466A]">
          Indica tu área al dejar el perfil para priorizar vacantes afines.
        </p>
        <div className="flex flex-wrap gap-3">
          {AREAS_EMPLEO.filter((area) => area !== "Otro").map((area) => (
            <span
              key={area}
              className="rounded-full border-2 border-[#D5DDEC] bg-white px-6 py-3.5 font-semibold"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      <section className={`${wide} py-12`}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal from="left">
            <h2 className={`${display} text-4xl sm:text-5xl`}>{FORMACION.titulo}</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#33466A]">{FORMACION.texto}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-[#33466A]">
              <span className="font-semibold text-[#0A2342]">{FERIA_TRABAJO.titulo}.</span>{" "}
              {FERIA_TRABAJO.texto}
            </p>
          </Reveal>
          <Reveal from="right" className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/visual-kit/heroes/services-rrhh.jpg"
                alt="Formación en campo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 24vw"
              />
            </div>
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/visual-kit/contact/meeting.jpg"
                alt="Capacitación de equipo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 24vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${wide} py-8`}>
        <h2 className={`${display} text-4xl sm:text-5xl`}>Actividades y cuidado al colaborador</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVIDADES.map((item, index) => (
            <Reveal key={item.titulo} delay={index * 70}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_0_#D5DDEC] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(10,35,66,0.08)]">
                <div className="relative aspect-[16/10]">
                  <Image src={item.imagen} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <h3 className={`${display} text-2xl`}>{item.titulo}</h3>
                  <p className="mt-2 text-[#33466A]">{item.texto}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${wide} py-10 pb-16 sm:pb-20`}>
        <div className="flex flex-wrap items-end justify-between gap-8 rounded-[2rem] bg-[#0A2342] p-8 text-white sm:p-14">
          <div>
            <h2 className={`${display} text-4xl sm:text-5xl`}>Siguiente paso</h2>
            <p className="mt-3 max-w-md leading-relaxed text-[#C8D4EA]">
              Para postularte deja tu perfil. Para puestos abiertos, entra a Vacantes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/empleos#tu-cv"
              className="rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white"
            >
              Ir a tu perfil
            </Link>
            <Link
              href="/empleos/vacantes"
              className="rounded-xl bg-white px-6 py-3.5 text-[17px] font-semibold text-[#0A2342]"
            >
              Ver vacantes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
