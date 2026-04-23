import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

      <p className="text-[10rem] font-black text-gray-100 leading-none select-none">
        404
      </p>

      <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-3">
        Página no encontrada
      </h1>
      <p className="text-gray-500 max-w-md mb-10">
        La página que buscas no existe o fue movida. Puedes volver al inicio o explorar nuestro blog.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#1E3A5F' }}
        >
          ← Volver al inicio
        </Link>
        <Link
          href="/blog"
          className="px-6 py-3 rounded-full text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Ver el blog
        </Link>
      </div>

    </main>
  )
}
