"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/data";
import { SITE_NAV, SITE_PUBLIC } from "@/lib/visual-kit/hakamo";
import { btnPrimary, btnSecondary, fieldClass, labelClass } from "@/lib/visual-kit/styles";
import { LandingHeader } from "../chrome-header";
import { PublicFooter } from "../public-footer";
import { Reveal } from "../reveal";
import { ScrollProgress } from "../scroll-progress";

/** Hakamo — Montecristi, RD */
const DEST = {
  lat: 19.8469,
  lng: -71.6453,
  label: COMPANY_INFO.ubicacion,
};

const CITY_PRESETS = [
  { id: "santo-domingo", label: "Santo Domingo", lat: 18.4861, lng: -69.9312 },
  { id: "santiago", label: "Santiago", lat: 19.4517, lng: -70.697 },
  { id: "puerto-plata", label: "Puerto Plata", lat: 19.7934, lng: -70.6884 },
  { id: "mao", label: "Mao", lat: 19.5519, lng: -71.0783 },
  { id: "dap", label: "Dajabón", lat: 19.5488, lng: -71.7083 },
];

type OriginMode = "exact" | "city";

type RouteInfo = {
  minutes: number;
  km: number;
  fromLabel: string;
};

type OriginPoint = {
  lat: number;
  lng: number;
  accuracy?: number;
  address?: string;
};

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

function formatCoords(lat: number, lng: number) {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

async function fetchRoute(fromLat: number, fromLng: number): Promise<{ minutes: number; km: number } | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${DEST.lng},${DEST.lat}?overview=false`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const route = data?.routes?.[0];
    if (!route) return null;
    return {
      minutes: Math.max(1, Math.round(route.duration / 60)),
      km: Math.round((route.distance / 1000) * 10) / 10,
    };
  } catch {
    return null;
  }
}

async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=16&addressdetails=0`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const name = typeof data?.display_name === "string" ? data.display_name : null;
    if (!name) return null;
    return name.split(",").slice(0, 3).join(",").trim();
  } catch {
    return null;
  }
}

export function DirectionsLanding() {
  const site = SITE_PUBLIC;
  const [mode, setMode] = useState<OriginMode>("exact");
  const [route, setRoute] = useState<RouteInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [origin, setOrigin] = useState<OriginPoint | null>(null);
  const [presetId, setPresetId] = useState("");

  const mapsEmbedSrc = useMemo(() => {
    if (origin) {
      return `https://maps.google.com/maps?saddr=${origin.lat},${origin.lng}&daddr=${DEST.lat},${DEST.lng}&hl=es&output=embed`;
    }
    return `https://www.google.com/maps?q=${DEST.lat},${DEST.lng}&ll=${DEST.lat},${DEST.lng}&z=13&output=embed`;
  }, [origin]);

  const directionsUrl = useMemo(() => {
    if (origin) {
      return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${DEST.lat},${DEST.lng}&travelmode=driving`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${DEST.lat},${DEST.lng}&travelmode=driving`;
  }, [origin]);

  const applyOrigin = useCallback(
    async (
      lat: number,
      lng: number,
      fromLabel: string,
      extras?: { accuracy?: number; address?: string },
    ) => {
      setLoading(true);
      setError("");
      setOrigin({
        lat,
        lng,
        accuracy: extras?.accuracy,
        address: extras?.address,
      });
      const result = await fetchRoute(lat, lng);
      setLoading(false);
      if (!result) {
        setError("No pudimos calcular la ruta ahora. Abre Google Maps para ver el tiempo en vivo.");
        setRoute({ minutes: 0, km: 0, fromLabel });
        return;
      }
      setRoute({ ...result, fromLabel });
    },
    [],
  );

  const useMyExactLocation = () => {
    if (!navigator.geolocation) {
      setError("Tu navegador no permite geolocalización. Elige una ciudad como alternativa.");
      setMode("city");
      return;
    }

    setMode("exact");
    setPresetId("");
    setLocating(true);
    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const address = await reverseGeocode(latitude, longitude);
        const label = address
          ? `Tu ubicación exacta · ${address}`
          : `Tu ubicación exacta (${formatCoords(latitude, longitude)})`;
        setLocating(false);
        await applyOrigin(latitude, longitude, label, {
          accuracy: Math.round(accuracy),
          address: address ?? undefined,
        });
      },
      (geoError) => {
        setLocating(false);
        setLoading(false);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setError("Permiso de ubicación denegado. Actívalo en el navegador o elige una ciudad.");
        } else if (geoError.code === geoError.TIMEOUT) {
          setError("Se agotó el tiempo al ubicar GPS. Intenta de nuevo o elige una ciudad.");
        } else {
          setError("No pudimos obtener tu ubicación exacta. Intenta de nuevo o elige una ciudad.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  };

  const onCityChange = async (id: string) => {
    setPresetId(id);
    setMode("city");
    if (!id) {
      setOrigin(null);
      setRoute(null);
      return;
    }
    const city = CITY_PRESETS.find((c) => c.id === id);
    if (!city) return;
    await applyOrigin(city.lat, city.lng, city.label);
  };

  return (
    <div className="min-h-[100svh] bg-paper text-ink">
      <ScrollProgress />
      <LandingHeader
        name={site.name}
        links={SITE_NAV}
        ctaHref="/agendar-visita"
        ctaLabel="Agendar visita"
        cvHref={site.cvHref}
        cvLabel={site.cvLabel}
        tone="paper"
      />

      <section className="relative overflow-hidden px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 45%), radial-gradient(ellipse at 90% 10%, color-mix(in srgb, var(--glow) 14%, transparent), transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-accent">Cómo llegar</p>
          <h1 className="font-display mt-4 max-w-3xl text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.08] tracking-[-0.03em] italic text-ink">
            Tu ruta hacia Hakamo
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
            Parte desde tu ubicación exacta (GPS) o desde una ciudad, y calcula el tiempo hasta{" "}
            {COMPANY_INFO.ubicacion}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className={btnPrimary}
              onClick={useMyExactLocation}
              disabled={locating || loading}
            >
              {locating ? "Obteniendo GPS…" : "Usar mi ubicación exacta"}
            </button>
            <Link href="/contacto" className={btnSecondary}>
              Volver a contacto
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal from="up">
            <div className="rounded-[1.6rem] border border-ink/8 bg-paper p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Punto de partida</p>
              <h2 className="font-display mt-2 text-2xl text-ink">¿Desde dónde sales?</h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={useMyExactLocation}
                  disabled={locating || loading}
                  className={`rounded-[1.25rem] border px-4 py-4 text-left transition ${
                    mode === "exact" && origin
                      ? "border-accent bg-white ring-2 ring-accent/25"
                      : "border-ink/10 bg-white hover:border-accent/40"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    Recomendado
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">Mi ubicación exacta</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Usamos el GPS de tu dispositivo para calcular la ruta real.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode("city");
                    setError("");
                  }}
                  className={`rounded-[1.25rem] border px-4 py-4 text-left transition ${
                    mode === "city"
                      ? "border-accent bg-white ring-2 ring-accent/25"
                      : "border-ink/10 bg-white hover:border-accent/40"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                    Alternativa
                  </p>
                  <p className="mt-2 text-sm font-semibold text-ink">Una ciudad</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Si no quieres compartir GPS, elige un punto aproximado.
                  </p>
                </button>
              </div>

              {mode === "city" ? (
                <div className="mt-5">
                  <label className={labelClass} htmlFor="ciudad">
                    Ciudad de partida
                  </label>
                  <select
                    id="ciudad"
                    className={`${fieldClass} mt-2`}
                    value={presetId}
                    onChange={(e) => void onCityChange(e.target.value)}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {CITY_PRESETS.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {mode === "exact" && origin ? (
                <div className="mt-5 rounded-[1.25rem] border border-accent/20 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-accent">GPS activo</p>
                  <p className="mt-2 text-sm font-semibold text-ink">
                    {origin.address ?? "Coordenadas detectadas"}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {formatCoords(origin.lat, origin.lng)}
                    {typeof origin.accuracy === "number" ? ` · ±${origin.accuracy} m` : ""}
                  </p>
                  <button
                    type="button"
                    className="mt-3 text-sm font-semibold text-accent"
                    onClick={useMyExactLocation}
                    disabled={locating || loading}
                  >
                    Actualizar mi ubicación →
                  </button>
                </div>
              ) : null}

              {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
              {(locating || loading) && !error ? (
                <p className="mt-4 text-sm text-muted">
                  {locating ? "Leyendo tu ubicación exacta…" : "Calculando tiempo de llegada…"}
                </p>
              ) : null}

              {route && route.minutes > 0 ? (
                <div className="mt-8 space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Tiempo estimado</p>
                  <p className="font-display text-4xl leading-none text-ink sm:text-5xl">
                    {formatDuration(route.minutes)}
                  </p>
                  <p className="text-sm leading-6 text-muted">
                    Desde <span className="font-semibold text-ink">{route.fromLabel}</span> · aprox.{" "}
                    <span className="font-semibold text-ink">{route.km} km</span> en auto
                  </p>
                  <p className="text-xs leading-5 text-muted">
                    Estimación de ruta. El tráfico real puede variar. Abre Google Maps para navegación en vivo.
                  </p>
                </div>
              ) : !locating && !loading ? (
                <div className="mt-8 rounded-[1.25rem] border border-dashed border-ink/15 bg-white p-5">
                  <p className="text-sm leading-6 text-muted">
                    Pulsa <strong className="font-semibold text-ink">Mi ubicación exacta</strong> para
                    partir desde donde estás ahora, o elige una ciudad.
                  </p>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={directionsUrl} target="_blank" rel="noreferrer" className={btnPrimary}>
                  Abrir ruta en Google Maps
                </a>
                <Link href="/agendar-visita" className={btnSecondary}>
                  Agendar visita
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal from="up" delay={80}>
            <div className="overflow-hidden rounded-[1.6rem] border border-ink/8 bg-paper shadow-[0_18px_50px_color-mix(in_srgb,var(--ink)_5%,transparent)]">
              <div className="border-b border-ink/8 px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Mapa</p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {origin ? "Ruta desde tu punto de partida" : DEST.label}
                </p>
              </div>
              <iframe
                title="Mapa de ruta hacia Hakamo"
                src={mapsEmbedSrc}
                className="h-[360px] w-full border-0 sm:h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      <PublicFooter site={site} links={SITE_NAV} tone="paper" />
    </div>
  );
}
