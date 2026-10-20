import { PublicFooter } from '@/app/components/visual-kit/public-footer'
import { PublicHeader } from '@/app/components/visual-kit/public-header'
import FloatingActionsLazy from '@/app/components/ui/FloatingActionsLazy'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      {children}
      <PublicFooter />
      <FloatingActionsLazy />
    </>
  )
}
