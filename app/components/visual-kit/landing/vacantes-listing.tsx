"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Division, Vacante } from "@/types";
import type { VacanteCard } from "@/lib/demo-vacantes";
import { TalentBoard } from "./talent-board";

type DisponibilidadFilter = "" | "activa" | "cerrada";
type TipoFilter = "" | Vacante["tipo"];
type ModalidadFilter = "" | Vacante["modalidad"];

export function VacantesListing({
  vacantes,
  divisiones,
  initialCategoria,
  initialQuery = "",
}: {
  vacantes: VacanteCard[];
  divisiones: Division[];
  initialCategoria: string;
  initialQuery?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [localizacion, setLocalizacion] = useState("");
  const [area, setArea] = useState(initialCategoria);
  const [tipo, setTipo] = useState<TipoFilter>("");
  const [modalidad, setModalidad] = useState<ModalidadFilter>("");
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadFilter>("");

  useEffect(() => {
    setArea(initialCategoria);
  }, [initialCategoria]);

  const locations = useMemo(() => {
    const set = new Set(
      vacantes.map((item) => item.ubicacion?.trim()).filter((value): value is string => Boolean(value)),
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
  }, [vacantes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vacantes.filter((item) => {
      if (q && !item.titulo.toLowerCase().includes(q) && !item.descripcion?.toLowerCase().includes(q)) {
        return false;
      }
      if (localizacion && item.ubicacion !== localizacion) return false;
      if (area && item.division?.slug !== area) return false;
      if (tipo && item.tipo !== tipo) return false;
      if (modalidad && item.modalidad !== modalidad) return false;
      if (disponibilidad === "cerrada" && item.estado !== "cerrada") return false;
      if (disponibilidad === "activa" && item.estado === "cerrada") return false;
      return true;
    });
  }, [vacantes, query, localizacion, area, tipo, modalidad, disponibilidad]);

  const activeName = divisiones.find((item) => item.slug === area)?.nombre;

  const openCategory = (slug: string) => {
    setArea(slug);
    router.push(slug ? `/empleos/vacantes?categoria=${slug}` : "/empleos/vacantes");
  };

  return (
    <section className="chrome-frame bg-[#F5F7FB] py-10 text-[#0A2342] sm:py-14">
      <div className="mx-auto w-full">
        <p className="text-sm font-semibold text-[#1F5FD6]">Vacantes</p>
        <h1 className="font-[family-name:var(--font-space-grotesk)] mt-3 max-w-[16ch] text-[clamp(2.6rem,4.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          {activeName ?? "Todas las vacantes"}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-[#33466A]">
          Filtra por puesto, ciudad, contrato o disponibilidad.
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
            setDisponibilidad("");
          }}
        />
      </div>
    </section>
  );
}
