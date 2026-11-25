import type { ThreeElement } from '@react-three/fiber'
import type { MeshLineGeometry, MeshLineMaterial } from 'meshline'

/**
 * Registra <meshLineGeometry> y <meshLineMaterial> en el JSX de R3F. `meshline` ya trae sus
 * propios tipos; antes se tapaban con `any`.
 */
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>
  }
}
