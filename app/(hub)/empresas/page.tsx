import { HomeLanding } from "@/app/components/visual-kit/landing/home-landing";
import { clientesConLogo, testimonios } from "@/lib/cms/clientes";
import { contenidoEmpresas, metadataEmpresas } from "@/lib/cms/empresas";
import { obrasSeleccionadas } from "@/lib/cms/proyectos";
import { LANDING_COPY } from "@/lib/visual-kit/hakamo";

export const generateMetadata = metadataEmpresas;

export default async function EmpresasPage() {
  const [contenido, obras, clientes, citas] = await Promise.all([
    contenidoEmpresas(),
    obrasSeleccionadas(3),
    clientesConLogo(),
    testimonios(),
  ]);

  return (
    <HomeLanding copy={LANDING_COPY} contenido={contenido} obras={obras} clientes={clientes} testimonios={citas} />
  );
}
