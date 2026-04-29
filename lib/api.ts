const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL

export async function getDivisiones() {
  const res = await fetch(`${STRAPI_URL}/api/divisions?populate=*&sort=orden:asc`)
  if (!res.ok) throw new Error('Error al obtener divisiones')
  return res.json()
}

export async function getDivision(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/divisions?filters[slug][$eq]=${slug}&populate=*`)
  if (!res.ok) throw new Error('Error al obtener división')
  const data = await res.json()
  return data.data[0]
}

export async function getProyectosPorDivision(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/proyectos?filters[division][slug][$eq]=${slug}&populate=*`)
  if (!res.ok) throw new Error('Error al obtener proyectos')
  return res.json()
}

export async function getClientesPorDivision(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/clientes?filters[division][slug][$eq]=${slug}&populate=*`)
  if (!res.ok) throw new Error('Error al obtener clientes')
  return res.json()
}

export async function getServiciosPorDivision(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/servicios?filters[division][slug][$eq]=${slug}&populate=*`)
  if (!res.ok) throw new Error('Error al obtener servicios')
  return res.json()
}

export async function getPosts() {
  const res = await fetch(`${STRAPI_URL}/api/posts?populate=*&sort=fechaPublicacion:desc`)
  if (!res.ok) throw new Error('Error al obtener posts')
  return res.json()
}

export async function getPost(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`)
  if (!res.ok) throw new Error('Error al obtener post')
  const data = await res.json()
  return data.data[0]
}

export async function getPostsPorDivision(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/posts?filters[division][slug][$eq]=${slug}&populate=*&sort=fechaPublicacion:desc`)
  if (!res.ok) throw new Error('Error al obtener posts por división')
  return res.json()
}

export async function getProyecto(documentId: string) {
  const res = await fetch(`${STRAPI_URL}/api/proyectos/${documentId}?populate=*`)
  if (!res.ok) throw new Error('Error al obtener proyecto')
  return res.json()
}

export async function getHeroSlides() {
  const res = await fetch(`${STRAPI_URL}/api/hero-slides?filters[activo][$eq]=true&populate=*&sort=orden:asc`)
  if (!res.ok) throw new Error('Error al obtener hero slides')
  return res.json()
}

export async function getVacantes() {
  const res = await fetch(`${STRAPI_URL}/api/vacantes?filters[estado][$eq]=activa&populate=*&sort=fechaPublicacion:desc`)
  if (!res.ok) throw new Error('Error al obtener vacantes')
  return res.json()
}

export async function getVacante(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/vacantes?filters[slug][$eq]=${slug}&populate=*`)
  if (!res.ok) throw new Error('Error al obtener vacante')
  const data = await res.json()
  return data.data[0]
}

export async function getVacantesPorDivision(slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/vacantes?filters[division][slug][$eq]=${slug}&filters[estado][$eq]=activa&populate=*&sort=fechaPublicacion:desc`)
  if (!res.ok) throw new Error('Error al obtener vacantes por división')
  return res.json()
}