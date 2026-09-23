import { getDivisiones, getVacantes } from '@/lib/api'
import { DEMO_DIVISIONES, DEMO_VACANTES, withJobImages } from '@/lib/demo-vacantes'
import type { Division, Vacante } from '@/types'

export async function loadVacantes() {
  try {
    const [vacantesRes, divisionesRes] = await Promise.all([getVacantes(), getDivisiones()])
    const vacantes = (vacantesRes.data ?? []) as Vacante[]
    const divisiones = (divisionesRes.data ?? []) as Division[]
    return {
      vacantes: withJobImages(vacantes.length >= 6 ? vacantes : DEMO_VACANTES),
      divisiones: divisiones.length > 0 ? divisiones : DEMO_DIVISIONES,
    }
  } catch {
    return {
      vacantes: withJobImages(DEMO_VACANTES),
      divisiones: DEMO_DIVISIONES,
    }
  }
}
