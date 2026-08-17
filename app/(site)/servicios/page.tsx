import ServiciosView from './ServiciosView'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servicios — Hakamo Outsourcing',
  description:
    'Servicios especializados de outsourcing de personal, reclutamiento, nómina y consultoría laboral para empresas dominicanas.',
}

export default function ServiciosPage() {
  return <ServiciosView />
}
