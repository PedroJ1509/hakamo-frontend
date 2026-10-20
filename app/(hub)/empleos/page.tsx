import { CvLanding } from '@/app/components/visual-kit/landing/cv-landing'
import { contenidoEmpleos, metadataEmpleos } from '@/lib/cms/empleos'
import { loadVacantes } from '@/lib/load-vacantes'

export const generateMetadata = metadataEmpleos

export default async function EmpleosPage() {
  const [{ vacantes, divisiones }, contenido] = await Promise.all([loadVacantes(), contenidoEmpleos()])

  return <CvLanding vacantes={vacantes} divisiones={divisiones} contenido={contenido} />
}
