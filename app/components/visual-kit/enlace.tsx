import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/** Destino dentro del sitio: empieza por una sola barra ("/x"), no por "//" ni por un esquema. */
export const esInterno = (href: string) => href.startsWith("/") && !href.startsWith("//");

/**
 * Enlace cuyo destino puede venir del CMS. Si apunta a una página del sitio navega
 * sin recargar (`<Link>`); si es externo, de correo, teléfono o un ancla de la misma
 * página, es un `<a>` normal. Con un `<a>` simple, cada enlace interno recargaba
 * toda la página: parpadeo, animaciones reiniciadas y scroll perdido.
 */
export function Enlace({ href, children, ...resto }: Props) {
  if (esInterno(href)) {
    return (
      <Link href={href} {...resto}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...resto}>
      {children}
    </a>
  );
}
