import type { Metadata } from 'next'
import Link from 'next/link'
import { EmptyState } from '@/app/components/visual-kit/empty-state'
import { contenidoFicha } from '@/lib/cms/vacante'

export const metadata: Metadata = {
  title: 'Vacante no encontrada — Hakamo',
  robots: { index: false, follow: true },
}

/**
 * Misma pantalla que antes mostraba la ficha cuando no encontraba la vacante,
 * pero ahora acompañada del código 404 que le corresponde.
 */
export default async function VacanteNoEncontrada() {
  const { textos } = await contenidoFicha()

  return (
    <section className="flex min-h-[60svh] items-center bg-[#F5F7FB] px-4 text-[#0A2342]">
      <div className="mx-auto w-full max-w-xl">
        <EmptyState kicker="404" title={textos.noExisteTitulo} text={textos.noExisteTexto} />
        <div className="mt-8 text-center">
          <Link
            href="/empleos/vacantes"
            className="inline-flex rounded-xl bg-[#1F5FD6] px-6 py-3.5 text-[17px] font-semibold text-white"
          >
            {textos.verVacantes}
          </Link>
        </div>
      </div>
    </section>
  )
}
