"use client"
import { PointMaterial, Points, Preload } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { inSphere } from "maath/random"
import { Suspense, useMemo, useRef } from "react"
import type { Points as PointsType } from "three"
import Loader from "./loader"
import { useInView } from "react-intersection-observer"

const StarsCanvas = () => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  if (!inView) return <div className="w-full h-full absolute inset-0 -z-10" ref={inViewRef}></div>

  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <Canvas
        gl={{
          preserveDrawingBuffer: true,
          alpha: true,
        }}
        camera={{ position: [0, 0, 1] }}
      >
        <Preload all />

        <Suspense fallback={<Loader />}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  )
}

const Stars = () => {
  const ref = useRef<PointsType>(null)

  const sphere = useMemo(
    () =>
      inSphere(new Float32Array(6000), {
        radius: 1.2,
      }) as Float32Array,
    [],
  )

  useFrame((_, delta) => {
    if (!ref.current) return

    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color="#f272c8" size={0.002} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  )
}

export default StarsCanvas
