"use server"

// Simple in-memory rate limiting (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT = {
  maxAttempts: 3, // Max attempts per window
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDurationMs: 60 * 60 * 1000, // 1 hour block after exceeding limit
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Suspicious patterns to detect spam
const SPAM_PATTERNS = [
  /test@test\./i,
  /example@example\./i,
  /fake@fake\./i,
  /spam@spam\./i,
  /admin@admin\./i,
  /noreply@/i,
  /no-reply@/i,
]

function getClientIP(): string {
  // In a real app, you'd get this from headers
  // For demo purposes, we'll use a placeholder
  return 'demo-ip'
}

function isRateLimited(ip: string): { limited: boolean; message?: string } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return { limited: false }
  }

  // Reset if window has passed
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    return { limited: false }
  }

  // Check if blocked
  if (record.count >= RATE_LIMIT.maxAttempts) {
    const blockEndTime = record.resetTime + RATE_LIMIT.blockDurationMs
    if (now < blockEndTime) {
      const minutesLeft = Math.ceil((blockEndTime - now) / (60 * 1000))
      return { 
        limited: true, 
        message: `Too many attempts. Please try again in ${minutesLeft} minutes.` 
      }
    } else {
      // Block period ended, reset
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
      return { limited: false }
    }
  }

  // Increment count
  record.count++
  return { limited: false }
}

function validateEmail(email: string): { valid: boolean; message?: string } {
  if (!email || email.length === 0) {
    return { valid: false, message: "Email address is required." }
  }

  if (email.length > 254) {
    return { valid: false, message: "Email address is too long." }
  }

  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, message: "Please enter a valid email address." }
  }

  // Check for suspicious patterns
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(email)) {
      return { valid: false, message: "Please use a valid email address." }
    }
  }

  // Check for CTU domain preference (optional)
  if (email.includes('@ctu.edu')) {
    return { valid: true }
  }

  return { valid: true }
}

// Simulate database storage with error handling
async function storeSubscription(email: string): Promise<{ success: boolean; message?: string }> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))

    // Simulate occasional failures (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Database connection failed')
    }

    // Simulate duplicate email check
    if (email === 'duplicate@example.com') {
      return { success: false, message: "This email is already subscribed!" }
    }

    console.log("New subscriber stored:", { email, timestamp: new Date().toISOString() })
    return { success: true }

  } catch (error) {
    console.error('Subscription storage error:', error)
    return { 
      success: false, 
      message: "Unable to process subscription. Please try again later." 
    }
  }
}

export async function subscribe(
  _prevState: { ok: boolean; message: string; rateLimited?: boolean },
  formData: FormData,
): Promise<{ ok: boolean; message: string; rateLimited?: boolean }> {
  try {
    const email = String(formData.get("email") || "").trim().toLowerCase()
    const clientIP = getClientIP()

    // Rate limiting check
    const rateLimitCheck = isRateLimited(clientIP)
    if (rateLimitCheck.limited) {
      return { 
        ok: false, 
        message: rateLimitCheck.message || "Too many attempts. Please try again later.",
        rateLimited: true
      }
    }

    // Email validation
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      return { 
        ok: false, 
        message: emailValidation.message || "Invalid email address." 
      }
    }

    // Store subscription
    const storageResult = await storeSubscription(email)
    if (!storageResult.success) {
      return { 
        ok: false, 
        message: storageResult.message || "Failed to subscribe. Please try again." 
      }
    }

    // Success response
    const domain = email.includes('@ctu.edu') ? 'CTU' : 'our'
    return { 
      ok: true, 
      message: `🎉 Welcome to ${domain} AWS Cloud Club! Check your email for confirmation.` 
    }

  } catch (error) {
    console.error('Subscription error:', error)
    return { 
      ok: false, 
      message: "An unexpected error occurred. Please try again later." 
    }
  }
}
