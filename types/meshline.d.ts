export {}

declare module 'meshline' {
  export const MeshLineGeometry: any
  export const MeshLineMaterial: any
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        meshLineGeometry: any
        meshLineMaterial: any
      }
    }
  }
}
