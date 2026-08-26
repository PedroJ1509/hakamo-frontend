import type { Metadata } from 'next'
import { HomeLanding } from '@/app/components/visual-kit/landing/home-landing'
import {
  LANDING_COPY,
  LANDING_OFFERINGS,
  LANDING_STATS,
  SITE_NAV,
  SITE_PUBLIC,
} from '@/lib/visual-kit/hakamo'

export const metadata: Metadata = {
  title: 'Hakamo Outsourcing | Capital Humano para Grandes Proyectos',
  description:
    'Empresa dominicana especializada en outsourcing de personal, reclutamiento y gestión de talento humano. Cumplimiento legal garantizado.',
}

export default function HomePage() {
  return (
    <HomeLanding
      site={SITE_PUBLIC}
      nav={SITE_NAV}
      stats={LANDING_STATS}
      offerings={LANDING_OFFERINGS}
      copy={LANDING_COPY}
    />
  )
}
