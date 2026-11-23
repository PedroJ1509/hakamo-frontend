import { SERVICIOS } from '@/lib/data'
import { anclaServicio } from '@/lib/sectores'
import type { NavLink } from './types'

/** Entrada del menú; `children` la convierte en desplegable. */
export type NavItem = NavLink & { children?: NavLink[] }

/**
 * Submenús por dirección del elemento principal. El primer nivel del menú
 * sigue saliendo del CMS; aquí solo se añade lo que cuelga de cada entrada.
 *
 * Solo llevan submenú las secciones con contenido real detrás: un desplegable
 * de relleno estorba más de lo que ayuda.
 */
export const SUBMENUS_RESPALDO: Record<string, NavLink[]> = {
  /* ── Empresas ── */
  '/nosotros': [
    { href: '/nosotros', label: 'Quiénes somos' },
    { href: '/nosotros#trayectoria', label: 'Trayectoria' },
    { href: '/nosotros#mision-vision', label: 'Misión y visión' },
    { href: '/nosotros#valores', label: 'Valores' },
  ],
  '/servicios': [
    ...SERVICIOS.map((s) => ({ href: `/servicios#${anclaServicio(s.slug)}`, label: s.titulo })),
    { href: '/servicios#catalogo', label: 'Ver todos los servicios' },
  ],
  '/proyectos': [
    { href: '/proyectos#obras', label: 'Obras destacadas' },
    { href: '/proyectos/historial', label: 'Historial por año' },
    { href: '/proyectos#en-campo', label: 'En campo' },
  ],
  '/contacto': [
    { href: '/contacto#formulario', label: 'Escríbenos' },
    { href: '/contacto#ruta', label: 'Cómo llegar' },
    { href: '/faq', label: 'Preguntas frecuentes' },
  ],

  /* ── Empleos ── */
  '/empleos/vacantes': [
    { href: '/empleos/vacantes', label: 'Todas las vacantes' },
    { href: '/empleos#categorias', label: 'Vacantes por área' },
  ],
  '/empleos#como': [
    { href: '/empleos#como', label: 'Cómo postularte' },
    { href: '/empleos#tu-cv', label: 'Deja tu CV' },
  ],
  '/empleo': [
    { href: '/empleo', label: 'Cómo es trabajar aquí' },
    { href: '/empleo#proceso', label: 'Del registro al proyecto' },
    { href: '/empleo#obras', label: 'Dónde trabajarías' },
  ],
}

/**
 * Agrupa el menú plano del CMS. Una entrada que ya aparece dentro del
 * submenú de otra deja de mostrarse en el primer nivel: así "Áreas" y "Tu CV"
 * pasan a vivir dentro de "Vacantes" y "Postularte" en vez de repetirse.
 *
 * `submenus` son los del panel de Strapi; sin ellos se usan los de código.
 */
export function conSubmenus(
  links: NavLink[],
  submenus: Record<string, NavLink[]> | null = null,
  excluir: string[] = [],
): NavItem[] {
  const tabla = submenus ?? SUBMENUS_RESPALDO;
  const presentes = new Set(links.map((l) => l.href));
  const anidados = new Set(
    Object.entries(tabla)
      .filter(([padre]) => presentes.has(padre))
      .flatMap(([padre, hijos]) => hijos.map((h) => h.href).filter((href) => href !== padre)),
  );

  return links
    .filter((l) => !excluir.includes(l.href) && !anidados.has(l.href))
    // Un submenú vacío no es un desplegable: queda como enlace normal.
    .map((l) => (tabla[l.href]?.length ? { ...l, children: tabla[l.href] } : l));
}
