import { useSyncExternalStore } from 'react'

/**
 * Valores que solo existen en el navegador, leídos con `useSyncExternalStore`: es la forma que
 * React prevé para esto. En el servidor y durante la hidratación devuelven el valor "seguro"
 * (el mismo que antes daba el estado inicial), y ya en el navegador el valor real, sin
 * llamar a `setState` dentro de un efecto.
 */

const sinSuscripcion = () => () => {}

/** `false` en el servidor y al hidratar; `true` una vez en el navegador. */
export function useEsCliente(): boolean {
  return useSyncExternalStore(sinSuscripcion, () => true, () => false)
}

const MENOS_MOVIMIENTO = '(prefers-reduced-motion: reduce)'

/** El usuario pidió reducir el movimiento en su sistema. Se actualiza si lo cambia en vivo. */
export function usePrefiereMenosMovimiento(): boolean {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(MENOS_MOVIMIENTO)
      mq.addEventListener('change', avisar)
      return () => mq.removeEventListener('change', avisar)
    },
    () => window.matchMedia(MENOS_MOVIMIENTO).matches,
    () => false,
  )
}

/** El tema oscuro está activo (clase `dark` en <html>). Reacciona a cualquier cambio de esa clase. */
export function useTemaOscuro(): boolean {
  return useSyncExternalStore(
    (avisar) => {
      const observador = new MutationObserver(avisar)
      observador.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
      return () => observador.disconnect()
    },
    () => document.documentElement.classList.contains('dark'),
    () => false,
  )
}
