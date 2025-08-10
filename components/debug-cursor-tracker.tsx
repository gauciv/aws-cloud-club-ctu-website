"use client"

import { useState, useEffect } from "react"
import { useCursor } from "./cursor-provider"

export default function DebugCursorTracker() {
  const { cursorPosition } = useCursor()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/* Cursor crosshair */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 border-2 border-red-500 bg-red-500/20"
        style={{
          left: mousePos.x - 16,
          top: mousePos.y - 16,
          transform: 'translate(0, 0)'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Debug panel */}
      <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg font-mono text-sm z-50 min-w-[300px]">
        <h3 className="text-yellow-400 font-bold mb-2">🐛 CURSOR DEBUG</h3>
        
        <div className="space-y-1">
          <div>
            <span className="text-gray-400">Raw Mouse:</span> 
            <span className="text-green-400"> X={mousePos.x}px, Y={mousePos.y}px</span>
          </div>
          
          <div>
            <span className="text-gray-400">Screen Size:</span> 
            <span className="text-blue-400"> {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Loading...'}</span>
          </div>
          
          <div>
            <span className="text-gray-400">Normalized:</span> 
            <span className="text-purple-400"> X={cursorPosition.x.toFixed(3)}, Y={cursorPosition.y.toFixed(3)}</span>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className="text-yellow-400 text-xs">Expected Behavior:</div>
            <div className="text-xs text-gray-300">
              • Top of screen: Y = +1 (model should look UP)<br/>
              • Bottom of screen: Y = -1 (model should look DOWN)<br/>
              • Left of screen: X = -1 (model should look LEFT)<br/>
              • Right of screen: X = +1 (model should look RIGHT)
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className="text-red-400 text-xs">Current Issue:</div>
            <div className="text-xs text-gray-300">
              Model looks opposite direction of cursor
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
