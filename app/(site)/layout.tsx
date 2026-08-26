import { PublicFooter } from '@/app/components/visual-kit/public-footer'
import { PublicHeader } from '@/app/components/visual-kit/public-header'
import FloatingActionsLazy from '@/app/components/ui/FloatingActionsLazy'
import { SITE_NAV, SITE_PUBLIC } from '@/lib/visual-kit/hakamo'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader
        name={SITE_PUBLIC.name}
        links={SITE_NAV}
        ctaHref={SITE_PUBLIC.ctaHref}
        ctaLabel={SITE_PUBLIC.ctaLabel}
      />
      {children}
      <PublicFooter site={SITE_PUBLIC} links={SITE_NAV} />
      <FloatingActionsLazy />
    </>
  )
}
