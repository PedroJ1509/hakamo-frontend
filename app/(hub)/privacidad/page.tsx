import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/data";
import { Logo } from "@/app/components/visual-kit/logo";

export const metadata: Metadata = {
  title: "Privacidad — Hakamo",
  description: "Qué datos recoge Hakamo cuando una empresa solicita personal o una persona se postula.",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-[100svh] bg-paper text-ink">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo name="Hakamo" />
        <nav className="flex gap-4 text-sm font-semibold">
          <Link href="/empresas" className="text-muted hover:text-accent">
            Empresas
          </Link>
          <Link href="/cv" className="text-muted hover:text-accent">
            Talentos
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[11px] uppercase tracking-[0.32em] text-accent">Datos personales</p>
        <h1 className="font-display mt-3 text-4xl">Privacidad</h1>
        <div className="mt-8 space-y-5 text-sm leading-7 text-muted">
          <p>
            Hakamo recoge solo lo que hace falta para conectar una empresa con talento o para responder
            un mensaje.
          </p>
          <p>
            Si buscas empleo, guardamos el nombre, el contacto, el CV y la vacante a la que te postulas.
            Esos datos los usa el equipo de reclutamiento para evaluar tu perfil y, si avanzas,
            presentarlos a la empresa del puesto.
          </p>
          <p>
            Si eres empresa, guardamos el nombre de la compañía, el contacto y el perfil que solicitas.
            Esa información no se publica en el portal de empleos.
          </p>
          <p>
            No vendemos datos. Puedes pedir ver, corregir o borrar tu información escribiendo a{" "}
            {COMPANY_INFO.email}.
          </p>
        </div>
      </main>
    </div>
  );
}
