import confetti from 'canvas-confetti'

// Rate limiting for confetti to prevent spam
let lastConfettiTime = 0
const CONFETTI_COOLDOWN = 3000 // 3 seconds

export const triggerSuccessConfetti = () => {
  const now = Date.now()
  
  // Anti-spam: Don't trigger if called too frequently
  if (now - lastConfettiTime < CONFETTI_COOLDOWN) {
    console.log('Confetti rate limited')
    return
  }
  
  lastConfettiTime = now
  
  try {
    // First burst - from left
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.2, y: 0.6 },
      colors: ['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
      drift: 0,
      gravity: 0.8,
      ticks: 200
    })

    // Second burst - from right (delayed)
    setTimeout(() => {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.8, y: 0.6 },
          colors: ['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'],
          shapes: ['circle', 'square'],
          scalar: 1.2,
          drift: 0,
          gravity: 0.8,
          ticks: 200
        })
      } catch (error) {
        console.warn('Confetti error (burst 2):', error)
      }
    }, 250)

    // Third burst - from center (delayed)
    setTimeout(() => {
      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#ffffff'],
          shapes: ['star', 'circle'],
          scalar: 1.4,
          drift: 0,
          gravity: 0.6,
          ticks: 300
        })
      } catch (error) {
        console.warn('Confetti error (burst 3):', error)
      }
    }, 500)

  } catch (error) {
    console.warn('Confetti error (main burst):', error)
  }
}

export const triggerCelebrationConfetti = () => {
  const now = Date.now()
  
  // Anti-spam check
  if (now - lastConfettiTime < CONFETTI_COOLDOWN) {
    return
  }
  
  lastConfettiTime = now
  
  try {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      colors: ['#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#ffffff']
    }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      try {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        
        // Since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      } catch (error) {
        console.warn('Confetti celebration error:', error)
        clearInterval(interval)
      }
    }, 250)

    // Cleanup after duration
    setTimeout(() => {
      clearInterval(interval)
    }, duration + 100)

  } catch (error) {
    console.warn('Confetti celebration setup error:', error)
  }
}

// Utility to check if confetti is available
export const isConfettiAvailable = () => {
  try {
    return typeof confetti === 'function'
  } catch {
    return false
  }
}

// Reset rate limiting (useful for testing)
export const resetConfettiCooldown = () => {
  lastConfettiTime = 0
}
