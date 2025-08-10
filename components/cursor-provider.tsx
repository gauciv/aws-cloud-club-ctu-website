"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface CursorPosition {
  x: number
  y: number
}

interface CursorContextType {
  cursorPosition: CursorPosition
}

const CursorContext = createContext<CursorContextType>({
  cursorPosition: { x: 0, y: 0 }
})

export const useCursor = () => useContext(CursorContext)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize coordinates to -1 to 1 range
      // X: left = -1, right = 1
      const x = (event.clientX / window.innerWidth) * 2 - 1
      
      // Y: top = 1, bottom = -1 (inverted from screen coordinates)
      // This ensures when cursor is at top, y = 1 (positive)
      // When cursor is at bottom, y = -1 (negative)
      const y = 1 - (event.clientY / window.innerHeight) * 2
      
      setCursorPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <CursorContext.Provider value={{ cursorPosition }}>
      {children}
    </CursorContext.Provider>
  )
}
