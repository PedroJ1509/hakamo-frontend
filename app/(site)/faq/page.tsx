import FAQAccordion from '@/app/components/ui/FAQAccordion'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes — Hakamo Outsourcing',
  description: 'Respuestas a las preguntas más comunes sobre los servicios de Hakamo Outsourcing.',
}

const PRIMARY = '#1E3A5F'

// TODO: reemplazar con preguntas y respuestas reales del cliente
const FAQ_GENERAL = [
  {
    pregunta: '¿Qué servicios de outsourcing ofrece Hakamo?',
    respuesta: 'Hakamo ofrece outsourcing de personal, reclutamiento especializado, payroll y administración de nómina, cumplimiento laboral y gestión documental, supervisión de proyectos en campo y seguridad y salud ocupacional.',
  },
  {
    pregunta: '¿En qué zonas de la República Dominicana operan?',
    respuesta: 'Operamos a nivel nacional con presencia activa en Montecristi y cobertura en todo el territorio dominicano.',
  },
  {
    pregunta: '¿Cómo puedo contratar sus servicios?',
    respuesta: 'Puedes contactarnos a través de nuestro formulario en línea, por WhatsApp al 829-679-0671 o por correo electrónico. Te responderemos en menos de 24 horas hábiles.',
  },
  {
    pregunta: '¿Cuánto tiempo tarda el proceso de reclutamiento?',
    respuesta: 'Dependiendo del perfil solicitado y la cantidad de candidatos requeridos, el proceso toma entre 5 y 15 días hábiles desde la consulta inicial hasta la presentación de candidatos.',
  },
  {
    pregunta: '¿Ofrecen garantía sobre el personal colocado?',
    respuesta: 'Sí, ofrecemos un período de garantía y reemplazo sin costo adicional si el candidato no se adapta al puesto en el plazo acordado.',
  },
  {
    pregunta: '¿Trabajan con empresas de todos los tamaños?',
    respuesta: 'Sí, trabajamos tanto con pequeñas y medianas empresas como con grandes corporaciones, adaptando nuestra solución a las necesidades específicas de cada cliente.',
  },
  {
    pregunta: '¿Qué incluye el servicio de gestión de nómina?',
    respuesta: 'Nuestro servicio de nómina incluye cálculo y procesamiento de salarios, deducciones y beneficios, reportes para la TSS y el Ministerio de Hacienda, y gestión de incidencias laborales.',
  },
  {
    pregunta: '¿Cómo garantizan la confidencialidad de la información?',
    respuesta: 'Manejamos toda la información de nuestros clientes con estrictos protocolos de confidencialidad y firmamos acuerdos de no divulgación (NDA) con cada empresa con la que trabajamos.',
  },
]

const FAQ_PROCESO = [
  {
    pregunta: '¿Cuál es el proceso de selección de candidatos?',
    respuesta: 'Nuestro proceso incluye: publicación de vacante, filtrado de hojas de vida, entrevistas iniciales, pruebas técnicas y psicométricas (según el perfil), entrevista final y presentación de terna al cliente.',
  },
  {
    pregunta: '¿Puedo participar en el proceso de selección?',
    respuesta: 'Sí, el cliente puede participar en las etapas finales del proceso. Coordinamos entrevistas conjuntas y compartimos los reportes de evaluación de cada candidato.',
  },
  {
    pregunta: '¿Qué pasa si el candidato seleccionado no funciona?',
    respuesta: 'Ofrecemos un período de garantía. Si el candidato no cumple con las expectativas en ese período, lo reemplazamos sin costo adicional.',
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4 text-white sm:py-28 sm:px-6" style={{ backgroundColor: PRIMARY }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-10 bg-white" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-white/60 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            Resolvemos tus dudas
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)', letterSpacing: '-0.03em' }}
          >
            Preguntas<br />Frecuentes
          </h1>
          <p className="text-base sm:text-xl text-white/75 max-w-xl mx-auto leading-relaxed">
            Todo lo que necesitas saber sobre nuestros servicios de talento humano.
          </p>
        </div>
      </section>

      {/* FAQ General */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl mb-8" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            Preguntas generales
          </h2>
          <FAQAccordion items={FAQ_GENERAL} color={PRIMARY} />
        </div>
      </section>

      {/* FAQ Proceso */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl mb-8" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            Proceso de selección
          </h2>
          <FAQAccordion items={FAQ_PROCESO} color={PRIMARY} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Escríbenos directamente. Nuestro equipo te responderá en menos de 24 horas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              Contactar →
            </Link>
            <a
              href="https://wa.me/18296790671"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border-2 transition-all hover:bg-gray-50"
              style={{ borderColor: PRIMARY, color: PRIMARY }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
