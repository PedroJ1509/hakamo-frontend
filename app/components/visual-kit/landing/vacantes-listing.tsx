"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Division, Vacante } from "@/types";
import type { VacanteCard } from "@/lib/demo-vacantes";
import { TalentBoard } from "./talent-board";
import type { ContenidoVacantes } from "@/lib/cms/vacantes";
import { FondoSeccion } from "../fondo-seccion";

type DisponibilidadFilter = "" | "activa" | "cerrada";
type TipoFilter = "" | Vacante["tipo"];
type ModalidadFilter = "" | Vacante["modalidad"];

export function VacantesListing({
  vacantes,
  divisiones,
  initialCategoria,
  initialQuery = "",
  contenido,
}: {
  vacantes: VacanteCard[];
  divisiones: Division[];
  initialCategoria: string;
  initialQuery?: string;
  contenido: ContenidoVacantes;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [localizacion, setLocalizacion] = useState("");
  const [area, setArea] = useState(initialCategoria);
  const [tipo, setTipo] = useState<TipoFilter>("");
  const [modalidad, setModalidad] = useState<ModalidadFilter>("");
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadFilter>("activa");

  useEffect(() => {
    setArea(initialCategoria);
  }, [initialCategoria]);

  const locations = useMemo(() => {
    const set = new Set(
      vacantes.map((item) => item.ubicacion?.trim()).filter((value): value is string => Boolean(value)),
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
  }, [vacantes]);

  const openCounts = useMemo(() => {
    const counts: Record<string, number> = { "": 0 };
    for (const item of vacantes) {
      if (item.estado === "cerrada") continue;
      counts[""] += 1;
      const slug = item.division?.slug;
      if (slug) counts[slug] = (counts[slug] ?? 0) + 1;
    }
    return counts;
  }, [vacantes]);

  const closedCount = useMemo(
    () => vacantes.filter((item) => item.estado === "cerrada").length,
    [vacantes],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vacantes
      .filter((item) => {
        if (q) {
          const haystack = [item.titulo, item.descripcion, item.ubicacion, item.division?.nombre, item.salario]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        if (localizacion && item.ubicacion !== localizacion) return false;
        if (area && item.division?.slug !== area) return false;
        if (tipo && item.tipo !== tipo) return false;
        if (modalidad && item.modalidad !== modalidad) return false;
        if (disponibilidad === "cerrada" && item.estado !== "cerrada") return false;
        if (disponibilidad === "activa" && item.estado === "cerrada") return false;
        return true;
      })
      .sort((a, b) => {
        const closed = Number(a.estado === "cerrada") - Number(b.estado === "cerrada");
        if (closed !== 0) return closed;
        return b.fechaPublicacion.localeCompare(a.fechaPublicacion);
      });
  }, [vacantes, query, localizacion, area, tipo, modalidad, disponibilidad]);

  const activeName = divisiones.find((item) => item.slug === area)?.nombre;

  const openCategory = (slug: string) => {
    setArea(slug);
    router.push(slug ? `/empleos/vacantes?categoria=${slug}` : "/empleos/vacantes");
  };

  return (
    <section
      className={`relative isolate bg-[#F5F7FB] py-10 sm:py-14 ${
        contenido.fondo.tono === "claro" ? "text-white [&_.texto-suave]:text-white/75" : "text-[#0A2342]"
      }`}
    >
      <FondoSeccion fondo={contenido.fondo} />
      <div className="chrome-frame relative mx-auto w-full">
        <p className="text-sm font-semibold text-[#1F5FD6]">{contenido.antetitulo}</p>
        <h1 className="font-[family-name:var(--font-space-grotesk)] mt-2 max-w-full text-balance text-[clamp(2rem,6vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
          {activeName ? contenido.tituloArea.replaceAll("{area}", activeName) : contenido.titulo}
        </h1>
        <p className="texto-suave mt-2 max-w-xl text-base text-[#33466A] sm:text-lg">
          {activeName ? contenido.textoArea.replaceAll("{area}", activeName) : contenido.texto}
        </p>
        <TalentBoard
          items={filtered}
          divisiones={divisiones}
          activeSlug={area}
          query={query}
          onQuery={setQuery}
          localizacion={localizacion}
          locations={locations}
          onLocalizacion={setLocalizacion}
          tipo={tipo}
          onTipo={setTipo}
          modalidad={modalidad}
          onModalidad={setModalidad}
          disponibilidad={disponibilidad}
          onDisponibilidad={setDisponibilidad}
          onCategory={openCategory}
          onClear={() => {
            setQuery("");
            setLocalizacion("");
            setTipo("");
            setModalidad("");
            setDisponibilidad("activa");
            openCategory("");
          }}
          openCounts={openCounts}
          closedCount={closedCount}
          textos={contenido.textos}
        />
      </div>
    </section>
  );
}
