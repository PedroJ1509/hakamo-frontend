import { redirect } from 'next/navigation'

export default async function CvVacantesRedirect({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const { categoria } = await searchParams
  redirect(categoria ? `/empleos/vacantes?categoria=${encodeURIComponent(categoria)}` : '/empleos/vacantes')
}
