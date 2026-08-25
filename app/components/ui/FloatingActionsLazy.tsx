'use client'

import dynamic from 'next/dynamic'

const FloatingActions = dynamic(() => import('@/app/components/ui/FloatingActions'), {
  ssr: false,
  loading: () => null,
})

/** Wrapper cliente: permite lazy-load desde layouts Server Components. */
export default function FloatingActionsLazy() {
  return <FloatingActions />
}
