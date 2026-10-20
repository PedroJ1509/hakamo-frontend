import { timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { ETIQUETA_CMS } from '@/lib/cms/strapi'

function mismoSecreto(recibido: string, esperado: string) {
  const a = Buffer.from(recibido)
  const b = Buffer.from(esperado)
  return a.length === b.length && timingSafeEqual(a, b)
}

/**
 * Strapi llama aquí cada vez que se guarda, publica o borra contenido.
 * Se descarta la copia guardada de todo el CMS y la próxima visita lo pide de nuevo.
 */
export async function POST(request: Request) {
  const secreto = process.env.REVALIDAR_SECRETO
  if (!secreto) return Response.json({ error: 'Falta REVALIDAR_SECRETO' }, { status: 503 })

  const recibido = request.headers.get('authorization')?.replace(/^Bearer /, '') ?? ''
  if (!mismoSecreto(recibido, secreto)) return Response.json({ error: 'No autorizado' }, { status: 401 })

  revalidateTag(ETIQUETA_CMS, { expire: 0 })
  return Response.json({ revalidado: true })
}
