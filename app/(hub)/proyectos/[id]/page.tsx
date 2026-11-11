import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProjectDetail } from '@/app/components/visual-kit/landing/project-detail'
import { contenidoProyecto, idsObras, metadataProyecto } from '@/lib/cms/proyectos'

interface Props {
  params: Promise<{ id: string }>
}

/** Las obras que ya existen se preparan al compilar; las nuevas se generan en su primera visita. */
export async function generateStaticParams() {
  return (await idsObras()).map((id) => ({ id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return metadataProyecto(decodeURIComponent(id))
}

export default async function ProyectoPage({ params }: Props) {
  const { id } = await params
  const contenido = await contenidoProyecto(decodeURIComponent(id))
  if (!contenido) notFound()
  return <ProjectDetail contenido={contenido} />
}
