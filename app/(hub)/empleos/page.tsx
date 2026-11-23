import { CvLanding } from '@/app/components/visual-kit/landing/cv-landing'
import { contenidoEmpleos, metadataEmpleos } from '@/lib/cms/empleos'
import { obrasSeleccionadas } from '@/lib/cms/proyectos'
import { loadVacantes } from '@/lib/load-vacantes'

export const generateMetadata = metadataEmpleos

export default async function EmpleosPage() {
  const [{ vacantes, divisiones }, contenido, obras] = await Promise.all([
    loadVacantes(),
    contenidoEmpleos(),
    obrasSeleccionadas(3),
  ])

  return <CvLanding vacantes={vacantes} divisiones={divisiones} contenido={contenido} obras={obras} />
}
