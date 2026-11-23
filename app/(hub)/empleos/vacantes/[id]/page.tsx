import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JobsDetail } from '@/app/components/visual-kit/landing/jobs-detail'
import { contenidoFicha, idsVacantes, metadataVacante, vacantePorId } from '@/lib/cms/vacante'

interface Props {
  params: Promise<{ id: string }>
}

/** Las vacantes que ya existen se preparan al compilar; las nuevas, en su primera visita. */
export async function generateStaticParams() {
  return (await idsVacantes()).map((id) => ({ id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return metadataVacante(decodeURIComponent(id))
}

export default async function VacanteDetailPage({ params }: Props) {
  const { id } = await params
  const [vacante, contenido] = await Promise.all([
    vacantePorId(decodeURIComponent(id)),
    contenidoFicha(),
  ])
  // Sin esto, una vacante inexistente respondía 200 y Google la indexaba.
  if (!vacante) notFound()

  return <JobsDetail embedded contenido={contenido} vacante={vacante} />
}
