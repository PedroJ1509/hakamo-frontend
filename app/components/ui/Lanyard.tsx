'use client'

/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import * as THREE from 'three'
import styles from './Lanyard.module.css'

extend({ MeshLineGeometry, MeshLineMaterial })

const CARD_GLB = '/lanyard/card.glb'
const LANYARD_PNG = '/lanyard/lanyard.png'

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 }
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 }

export interface LanyardProps {
  position?: [number, number, number]
  lookAt?: [number, number, number]
  gravity?: [number, number, number]
  fov?: number
  transparent?: boolean
  frontImage?: string | null
  backImage?: string | null
  imageFit?: 'cover' | 'contain'
  lanyardImage?: string | null
  lanyardWidth?: number
  /** Posición del anclaje de la cuerda en el mundo 3D. */
  anchor?: [number, number, number]
  /** Bounding box de la tarjeta en coordenadas de pantalla (para overlap UI). */
  onCardScreenPos?: (rect: { x: number; y: number; w: number; h: number }) => void
}

export default function Lanyard({
  position = [0, 0, 20],
  lookAt = [0, 0, 0],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1,
  anchor = [0, 4.1, 0],
  onCardScreenPos,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  )
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>()
  const onCardScreenPosRef = useRef(onCardScreenPos)
  onCardScreenPosRef.current = onCardScreenPos

  useEffect(() => {
    setEventSource(document.documentElement)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!eventSource) {
    return <div className={styles.lanyardWrapper} />
  }

  return (
    <div className={styles.lanyardWrapper}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        eventSource={eventSource}
        eventPrefix="client"
        onCreated={({ gl, camera }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
          camera.lookAt(...lookAt)
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
              anchor={anchor}
              onCardScreenPosRef={onCardScreenPosRef}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  )
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null as string | null,
  backImage = null as string | null,
  imageFit = 'cover' as 'cover' | 'contain',
  lanyardImage = null as string | null,
  lanyardWidth = 1,
  anchor = [0, 4.1, 0] as [number, number, number],
  onCardScreenPosRef,
}: {
  maxSpeed?: number
  minSpeed?: number
  isMobile?: boolean
  frontImage?: string | null
  backImage?: string | null
  imageFit?: 'cover' | 'contain'
  lanyardImage?: string | null
  lanyardWidth?: number
  anchor?: [number, number, number]
  onCardScreenPosRef?: MutableRefObject<
    ((rect: { x: number; y: number; w: number; h: number }) => void) | undefined
  >
}) {
  const band = useRef<any>(null)
  const fixed = useRef<RapierRigidBody>(null)
  const j1 = useRef<RapierRigidBody>(null)
  const j2 = useRef<RapierRigidBody>(null)
  const j3 = useRef<RapierRigidBody>(null)
  const card = useRef<RapierRigidBody>(null)

  const vec = useMemo(() => new THREE.Vector3(), [])
  const ang = useMemo(() => new THREE.Vector3(), [])
  const rot = useMemo(() => new THREE.Vector3(), [])
  const dir = useMemo(() => new THREE.Vector3(), [])

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  }

  const { nodes, materials } = useGLTF(CARD_GLB) as any
  const texture = useTexture(lanyardImage || LANYARD_PNG)
  const frontTex = useTexture(frontImage || BLANK_PIXEL)
  const backTex = useTexture(backImage || BLANK_PIXEL)

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map
    if (!frontImage && !backImage) return baseMap

    const baseImg = baseMap.image
    if (!baseImg?.width) return baseMap

    const W = baseImg.width
    const H = baseImg.height
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) return baseMap

    // Conserva metal/clip del atlas; solo reemplazamos las caras.
    ctx.drawImage(baseImg, 0, 0, W, H)

    const fillFace = (rect: typeof FRONT_UV_RECT, color: string) => {
      ctx.fillStyle = color
      ctx.fillRect(rect.x * W, rect.y * H, rect.w * W, rect.h * H)
    }

    const drawFitted = (
      img: CanvasImageSource & { width: number; height: number },
      rect: typeof FRONT_UV_RECT,
      pad = 0.78,
    ) => {
      const rx = rect.x * W
      const ry = rect.y * H
      const rw = rect.w * W
      const rh = rect.h * H
      const boxW = rw * pad
      const boxH = rh * pad
      const pick = imageFit === 'contain' ? Math.min : Math.max
      const scale = pick(boxW / img.width, boxH / img.height)
      const dw = img.width * scale
      const dh = img.height * scale
      const dx = rx + (rw - dw) / 2
      const dy = ry + (rh - dh) / 2
      ctx.save()
      ctx.beginPath()
      ctx.rect(rx, ry, rw, rh)
      ctx.clip()
      ctx.drawImage(img, dx, dy, dw, dh)
      ctx.restore()
    }

    if (frontImage) {
      fillFace(FRONT_UV_RECT, '#ffffff')
      if (frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT)
    }

    if (backImage) {
      fillFace(BACK_UV_RECT, '#1E3A5F')
      if (backTex.image) drawFitted(backTex.image, BACK_UV_RECT)
    } else if (frontImage) {
      // Sin backImage: reverso limpio de marca (sin textura del GLB)
      fillFace(BACK_UV_RECT, '#1E3A5F')
    }

    const composite = new THREE.CanvasTexture(canvas)
    composite.colorSpace = THREE.SRGBColorSpace
    composite.flipY = baseMap.flipY
    composite.anisotropy = 16
    composite.needsUpdate = true
    return composite
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map])

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  )
  const [dragged, drag] = useState<false | THREE.Vector3>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => {
        document.body.style.cursor = 'auto'
      }
    }
  }, [hovered, dragged])

  const ndc = useMemo(() => new THREE.Vector3(), [])
  const screenReportAt = useRef(0)

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      })
    }
    if (fixed.current) {
      ;[j1, j2].forEach((ref) => {
        const body = ref.current as any
        if (!body) return
        if (!body.lerped) body.lerped = new THREE.Vector3().copy(body.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, body.lerped.distanceTo(body.translation())))
        body.lerped.lerp(body.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      curve.points[0].copy(j3.current!.translation())
      curve.points[1].copy((j2.current as any).lerped)
      curve.points[2].copy((j1.current as any).lerped)
      curve.points[3].copy(fixed.current.translation())
      if (band.current?.geometry) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32))
      }
      if (card.current) {
        ang.copy(card.current.angvel())
        rot.copy(card.current.rotation())
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })

        const now = state.clock.elapsedTime
        if (onCardScreenPosRef?.current && now - screenReportAt.current > 0.08) {
          screenReportAt.current = now
          const t = card.current.translation()
          ndc.set(t.x, t.y - 0.6, t.z)
          ndc.project(state.camera)
          const { width, height, left, top } = state.gl.domElement.getBoundingClientRect()
          const cx = left + (ndc.x * 0.5 + 0.5) * width
          const cy = top + (-ndc.y * 0.5 + 0.5) * height
          const cardH = Math.min(280, height * 0.32)
          const cardW = cardH * 0.72
          onCardScreenPosRef.current({
            x: cx - cardW / 2,
            y: cy - cardH * 0.15,
            w: cardW,
            h: cardH,
          })
        }
      }
    }
  })

  curve.curveType = 'chordal'
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  return (
    <>
      <group position={anchor}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.15, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.3, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.45, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0.55, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.45}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId)
              drag(false)
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId)
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current!.translation())))
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  )
}

useGLTF.preload(CARD_GLB)
