import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import FloatingActions from '@/app/components/ui/FloatingActions'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingActions />
    </>
  )
}
