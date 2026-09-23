import { redirect } from 'next/navigation'

export default async function EmpleoDetailRedirect({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/cv/vacantes/${id}`)
}
