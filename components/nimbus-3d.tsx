"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, useGLTF, Center } from "@react-three/drei"
import { Group } from "three"
import { useCursor } from "./cursor-provider"

function NimbusModel() {
  const groupRef = useRef<Group>(null)
  const { cursorPosition } = useCursor()
  
  useFrame(() => {
    if (groupRef.current) {
      // Now with corrected Y-axis: top of screen = positive Y, bottom = negative Y
      const targetRotationY = cursorPosition.x * 0.8  // Horizontal rotation (left/right)
      const targetRotationX = -cursorPosition.y * 0.6  // Vertical rotation (up/down) - negative to match 3D space
      
      // Smooth interpolation
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.08
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.08
    }
  })

  const gltf = useGLTF("/assets/3d/nimbus.glb", true)
  
  return (
    <Center>
      <group ref={groupRef}>
        <primitive 
          object={gltf.scene} 
          scale={0.8} 
          position={[0, -0.3, 0]}
        />
      </group>
    </Center>
  )
}

// Preload the nimbus model immediately for instant loading
useGLTF.preload("/assets/3d/nimbus.glb")

export default function Nimbus3D() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-cyan-100/60 to-white dark:from-cyan-950/30 dark:to-slate-950">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ 
          position: [0, 0, 3], // Zoomed in closer
          fov: 45,
          near: 0.1,
          far: 1000
        }} 
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        {/* Optimized lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />
        
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial color="#06b6d4" opacity={0.6} transparent />
            </mesh>
          }
        >
          <Float 
            speed={1.2} 
            rotationIntensity={0.05} // Reduced so it doesn't interfere with cursor tracking
            floatIntensity={0.3}
          >
            <NimbusModel />
          </Float>
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}
