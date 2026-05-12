import Link from 'next/link'

const PRIMARY = '#1E3A5F'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: '#F8F9FA' }}>

      {/* 404 grande */}
      <div className="relative mb-8">
        <p
          className="text-[10rem] md:text-[14rem] font-black leading-none select-none"
          style={{ color: `${PRIMARY}12`, fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ backgroundColor: PRIMARY }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        </div>
      </div>

      <h1
        className="text-2xl md:text-3xl font-bold mb-3"
        style={{ color: '#0D1B5E', fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
      >
        Página no encontrada
      </h1>
      <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
        La página que buscas no existe o fue movida. Puedes volver al inicio o explorar nuestros servicios.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: PRIMARY }}
        >
          ← Volver al inicio
        </Link>
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border-2 transition-all hover:bg-white"
          style={{ borderColor: PRIMARY, color: PRIMARY }}
        >
          Ver servicios
        </Link>
        <Link
          href="/blog"
          className="px-7 py-3.5 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Ir al blog
        </Link>
      </div>

    </main>
  )
}
