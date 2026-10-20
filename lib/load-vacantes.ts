import { getDivisiones, getVacantes } from '@/lib/api'
import { DEMO_DIVISIONES, DEMO_VACANTES, USAR_DEMO, withJobImages } from '@/lib/demo-vacantes'
import type { Division, Vacante } from '@/types'

type Bloque = { text?: string; children?: Bloque[] }

/** Texto plano de una descripción de Strapi: puede venir como texto o como bloques con formato. */
function textoPlano(valor: unknown): string {
  if (typeof valor === 'string') return valor
  if (!Array.isArray(valor)) return ''
  const recorrer = (nodos: Bloque[]): string =>
    nodos.map((n) => (typeof n.text === 'string' ? n.text : recorrer(n.children ?? []))).join(' ')
  return (valor as Bloque[])
    .map((b) => recorrer([b]).trim())
    .filter(Boolean)
    .join(' ')
}

/** El listado y la búsqueda trabajan con texto: la descripción con formato se aplana. */
function paraListado(vacantes: Vacante[]): Vacante[] {
  return vacantes.map((v) => ({ ...v, descripcion: textoPlano(v.descripcion), requisitos: textoPlano(v.requisitos) }))
}

export async function loadVacantes() {
  try {
    const [vacantesRes, divisionesRes] = await Promise.all([getVacantes(), getDivisiones()])
    const vacantes = (vacantesRes.data ?? []) as Vacante[]
    const divisiones = (divisionesRes.data ?? []) as Division[]
    const demo = USAR_DEMO && vacantes.length === 0
    return {
      vacantes: withJobImages(demo ? DEMO_VACANTES : paraListado(vacantes)),
      divisiones: divisiones.length > 0 ? divisiones : demo ? DEMO_DIVISIONES : [],
    }
  } catch {
    return {
      vacantes: USAR_DEMO ? withJobImages(DEMO_VACANTES) : [],
      divisiones: USAR_DEMO ? DEMO_DIVISIONES : [],
    }
  }
}
