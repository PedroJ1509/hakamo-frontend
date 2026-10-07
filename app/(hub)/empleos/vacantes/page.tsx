import type { Metadata } from 'next'
import { VacantesListing } from '@/app/components/visual-kit/landing/vacantes-listing'
import { loadVacantes } from '@/lib/load-vacantes'

export const metadata: Metadata = {
  title: 'Vacantes — Hakamo',
  description: 'Vacantes abiertas de Hakamo por categoría, ciudad y tipo de contrato.',
}

export default async function VacantesPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; q?: string }>
}) {
  const { categoria, q } = await searchParams
  const { vacantes, divisiones } = await loadVacantes()

  return (
    <VacantesListing
      vacantes={vacantes}
      divisiones={divisiones}
      initialCategoria={categoria ?? ''}
      initialQuery={q ?? ''}
    />
  )
}
