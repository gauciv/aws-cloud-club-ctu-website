import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Group } from "three"

interface CursorRotationConfig {
  maxRotationX?: number // Maximum vertical rotation in radians
  maxRotationY?: number // Maximum horizontal rotation in radians
  sensitivityX?: number // Horizontal sensitivity multiplier
  sensitivityY?: number // Vertical sensitivity multiplier
  dampingFactor?: number // Smoothing factor (0-1)
}

interface CursorPosition {
  x: number
  y: number
}

export function useCursorRotation(
  groupRef: React.RefObject<Group>,
  cursorPosition: CursorPosition,
  config: CursorRotationConfig = {}
) {
  const {
    maxRotationX = Math.PI / 6, // 30 degrees
    maxRotationY = Math.PI / 4, // 45 degrees
    sensitivityX = 1.0,
    sensitivityY = 1.0,
    dampingFactor = 0.05,
  } = config

  const currentRotation = useRef({ x: 0, y: 0 })

  useFrame(() => {
    if (groupRef.current) {
      // Calculate target rotations with limits
      const targetRotationY = Math.max(
        -maxRotationY,
        Math.min(
          maxRotationY,
          cursorPosition.x * sensitivityX * maxRotationY
        )
      )
      
      const targetRotationX = Math.max(
        -maxRotationX,
        Math.min(
          maxRotationX,
          cursorPosition.y * sensitivityY * maxRotationX
        )
      )
      
      // Smooth interpolation
      currentRotation.current.x += (targetRotationX - currentRotation.current.x) * dampingFactor
      currentRotation.current.y += (targetRotationY - currentRotation.current.y) * dampingFactor
      
      // Apply rotations
      groupRef.current.rotation.x = currentRotation.current.x
      groupRef.current.rotation.y = currentRotation.current.y
    }
  })

  return currentRotation.current
}
