import { redirect } from 'next/navigation'

export default async function CvVacanteRedirect({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/empleos/vacantes/${id}`)
}
