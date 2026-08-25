import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import FloatingActionsLazy from '@/app/components/ui/FloatingActionsLazy'

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingActionsLazy />
    </>
  )
}
