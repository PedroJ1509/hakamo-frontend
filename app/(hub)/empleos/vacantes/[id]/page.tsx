import { JobsDetail } from '@/app/components/visual-kit/landing/jobs-detail'
import { contenidoFicha } from '@/lib/cms/vacante'

export default async function VacanteDetailPage() {
  return <JobsDetail embedded contenido={await contenidoFicha()} />
}
