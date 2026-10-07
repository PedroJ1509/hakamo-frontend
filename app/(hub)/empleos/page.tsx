import type { Metadata } from 'next'
import { CvLanding } from '@/app/components/visual-kit/landing/cv-landing'
import { loadVacantes } from '@/lib/load-vacantes'

export const metadata: Metadata = {
  title: 'Empleos — Hakamo',
  description:
    'Revisa vacantes y deja tu perfil con Hakamo. Crea tu currículum o súbelo gratis. Empleo en República Dominicana.',
}

export default async function EmpleosPage() {
  const { vacantes, divisiones } = await loadVacantes()

  return <CvLanding vacantes={vacantes} divisiones={divisiones} />
}
