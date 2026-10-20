import { VacantesListing } from '@/app/components/visual-kit/landing/vacantes-listing'
import { contenidoVacantes, metadataVacantes } from '@/lib/cms/vacantes'
import { loadVacantes } from '@/lib/load-vacantes'

export const generateMetadata = metadataVacantes

export default async function VacantesPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; q?: string }>
}) {
  const { categoria, q } = await searchParams
  const [{ vacantes, divisiones }, contenido] = await Promise.all([loadVacantes(), contenidoVacantes()])

  return (
    <VacantesListing
      vacantes={vacantes}
      divisiones={divisiones}
      initialCategoria={categoria ?? ''}
      initialQuery={q ?? ''}
      contenido={contenido}
    />
  )
}
