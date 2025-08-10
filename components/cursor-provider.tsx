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
      // Convert to normalized coordinates (-1 to 1)
      const x = (event.clientX / window.innerWidth) * 2 - 1
      // Fix the Y-axis - remove the negative sign so top = positive, bottom = negative
      const y = (event.clientY / window.innerHeight) * 2 - 1
      
      setCursorPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
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
