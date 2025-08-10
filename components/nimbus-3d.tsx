"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, useGLTF, Center } from "@react-three/drei"
import { Group } from "three"
import { useCursor } from "./cursor-provider"

// Configuration for rotation behavior
const ROTATION_CONFIG = {
  maxRotationX: Math.PI / 6, // 30 degrees up/down
  maxRotationY: Math.PI / 4, // 45 degrees left/right
  sensitivityX: 1.0,
  sensitivityY: 1.0,
  dampingFactor: 0.12, // Faster rotation speed
}

function NimbusModel() {
  const groupRef = useRef<Group>(null)
  const { cursorPosition } = useCursor()
  
  // Store current rotation for smooth interpolation
  const currentRotation = useRef({ x: 0, y: 0 })
  
  useFrame(() => {
    if (groupRef.current) {
      // Calculate target rotations with INVERTED Y-axis
      const targetRotationY = Math.max(
        -ROTATION_CONFIG.maxRotationY,
        Math.min(
          ROTATION_CONFIG.maxRotationY,
          cursorPosition.x * ROTATION_CONFIG.sensitivityX * ROTATION_CONFIG.maxRotationY
        )
      )
      
      // INVERTED: Negative sign to fix the direction
      const targetRotationX = Math.max(
        -ROTATION_CONFIG.maxRotationX,
        Math.min(
          ROTATION_CONFIG.maxRotationX,
          -cursorPosition.y * ROTATION_CONFIG.sensitivityY * ROTATION_CONFIG.maxRotationX
        )
      )
      
      // Smooth interpolation
      currentRotation.current.x += (targetRotationX - currentRotation.current.x) * ROTATION_CONFIG.dampingFactor
      currentRotation.current.y += (targetRotationY - currentRotation.current.y) * ROTATION_CONFIG.dampingFactor
      
      // Apply rotations
      groupRef.current.rotation.x = currentRotation.current.x
      groupRef.current.rotation.y = currentRotation.current.y
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

// Preload the nimbus model
useGLTF.preload("/assets/3d/nimbus.glb")

export default function Nimbus3D() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-cyan-100/60 to-white dark:from-cyan-950/30 dark:to-slate-950">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ 
          position: [0, 0, 3],
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
            rotationIntensity={0.02}
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
