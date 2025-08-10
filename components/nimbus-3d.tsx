"use client"

import { Suspense, useRef, useState } from "react"
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
  dampingFactor: 0.12, // Increased from 0.05 for faster rotation
}

function NimbusModel() {
  const groupRef = useRef<Group>(null)
  const { cursorPosition } = useCursor()
  
  // Store current rotation for smooth interpolation and debugging
  const currentRotation = useRef({ x: 0, y: 0 })
  const [debugRotation, setDebugRotation] = useState({ x: 0, y: 0 })
  
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
      
      // Smooth interpolation (now faster)
      currentRotation.current.x += (targetRotationX - currentRotation.current.x) * ROTATION_CONFIG.dampingFactor
      currentRotation.current.y += (targetRotationY - currentRotation.current.y) * ROTATION_CONFIG.dampingFactor
      
      // Apply rotations
      groupRef.current.rotation.x = currentRotation.current.x
      groupRef.current.rotation.y = currentRotation.current.y
      
      // Update debug info (throttled)
      if (Math.random() < 0.1) { // Only update 10% of frames to avoid spam
        setDebugRotation({
          x: currentRotation.current.x,
          y: currentRotation.current.y
        })
      }
    }
  })

  const gltf = useGLTF("/assets/3d/nimbus.glb", true)
  
  return (
    <>
      <Center>
        <group ref={groupRef}>
          <primitive 
            object={gltf.scene} 
            scale={0.8} 
            position={[0, -0.3, 0]}
          />
        </group>
      </Center>
      
      {/* Debug rotation display */}
      {process.env.NODE_ENV === 'development' && (
        <mesh position={[0, 2, 0]}>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial color="black" transparent opacity={0.7} />
        </mesh>
      )}
    </>
  )
}

// Preload the nimbus model
useGLTF.preload("/assets/3d/nimbus.glb")

export default function Nimbus3D() {
  const { cursorPosition } = useCursor()
  
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
      
      {/* Enhanced debug panel for 3D model */}
      <div className="absolute bottom-2 left-2 bg-black/80 text-white p-3 rounded text-xs font-mono max-w-[280px]">
        <div className="text-yellow-400 font-bold mb-1">🎯 3D MODEL DEBUG</div>
        
        <div className="space-y-1">
          <div>
            <span className="text-gray-400">Cursor Input:</span>
            <div className="text-green-400 ml-2">
              X: {cursorPosition.x.toFixed(3)} | Y: {cursorPosition.y.toFixed(3)}
            </div>
          </div>
          
          <div>
            <span className="text-gray-400">Target Rotation:</span>
            <div className="text-blue-400 ml-2">
              X: {(-cursorPosition.y * ROTATION_CONFIG.maxRotationX * 180 / Math.PI).toFixed(1)}° | 
              Y: {(cursorPosition.x * ROTATION_CONFIG.maxRotationY * 180 / Math.PI).toFixed(1)}°
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className="text-green-400 text-xs">✅ INVERTED ROTATION:</div>
            <div className="text-xs text-gray-300 mt-1">
              {cursorPosition.y > 0.1 ? "Cursor TOP → Model looks UP (inverted)" : 
               cursorPosition.y < -0.1 ? "Cursor BOTTOM → Model looks DOWN (inverted)" : 
               "Cursor CENTER"}
            </div>
            <div className="text-xs text-gray-300">
              {cursorPosition.x > 0.1 ? "Cursor RIGHT → Model looks RIGHT" : 
               cursorPosition.x < -0.1 ? "Cursor LEFT → Model looks LEFT" : 
               "Cursor CENTER"}
            </div>
            <div className="text-xs text-purple-400 mt-1">
              Speed: {ROTATION_CONFIG.dampingFactor.toFixed(3)} (faster)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
