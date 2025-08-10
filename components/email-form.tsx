"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Mail, ArrowRight, Sparkles, AlertTriangle, Shield } from "lucide-react"
import { triggerSuccessConfetti, isConfettiAvailable } from "@/lib/confetti"

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

  return { valid: true }
}

export default function EmailForm() {
  const [state, setState] = useState({ 
    ok: false, 
    message: "", 
    rateLimited: false 
  })
  const [pending, setPending] = useState(false)
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Trigger confetti on successful subscription
  useEffect(() => {
    if (state.ok && state.message && !hasTriggeredConfetti) {
      // Small delay to ensure the success message is visible first
      const timer = setTimeout(() => {
        if (isConfettiAvailable()) {
          try {
            triggerSuccessConfetti()
            setHasTriggeredConfetti(true)
            
            // Reset form after successful submission
            if (formRef.current) {
              formRef.current.reset()
            }
            
            // Reset confetti flag after some time
            setTimeout(() => {
              setHasTriggeredConfetti(false)
            }, 5000)
            
          } catch (error) {
            console.warn('Failed to trigger confetti:', error)
          }
        }
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [state.ok, state.message, hasTriggeredConfetti])

  // Reset confetti flag when form is reset or new submission starts
  useEffect(() => {
    if (pending) {
      setHasTriggeredConfetti(false)
    }
  }, [pending])

  // Focus email input on rate limit error
  useEffect(() => {
    if (state.rateLimited && emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [state.rateLimited])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    setState({ ok: false, message: "", rateLimited: false })

    const formData = new FormData(e.currentTarget)
    const email = String(formData.get("email") || "").trim().toLowerCase()

    // Email validation
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      setState({ 
        ok: false, 
        message: emailValidation.message || "Invalid email address.",
        rateLimited: false
      })
      setPending(false)
      return
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // For static site, we'll just show a success message
    // In a real app, you'd send this to an API endpoint
    const domain = email.includes('@ctu.edu') ? 'CTU' : 'our'
    setState({ 
      ok: true, 
      message: `🎉 Welcome to ${domain} AWS Cloud Club! We'll be in touch soon.`,
      rateLimited: false
    })
    setPending(false)
  }

  const getMessageIcon = () => {
    if (state.ok) return <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
    if (state.rateLimited) return <Shield className="h-5 w-5 flex-shrink-0" />
    return <AlertTriangle className="h-5 w-5 flex-shrink-0" />
  }

  const getMessageStyles = () => {
    if (state.ok) {
      return "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
    }
    if (state.rateLimited) {
      return "border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-300"
    }
    return "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
  }

  return (
    <section id="subscribe" className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 dark:from-cyan-400/10 dark:to-indigo-400/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Stay Updated
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Be the first to know about workshops, events, and opportunities. Get exclusive access to AWS resources and certification study materials.
          </p>
        </div>

        {/* Email Form */}
        <div className="max-w-md mx-auto">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  ref={emailInputRef}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@ctu.edu"
                  required
                  disabled={pending || state.rateLimited}
                  className={`pl-10 h-12 text-base border-slate-200 dark:border-slate-700 focus:border-cyan-500 focus:ring-cyan-500 transition-all duration-200 ${
                    state.rateLimited ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                  aria-describedby="email-help"
                  autoComplete="email"
                />
              </div>
              <p id="email-help" className="text-xs text-slate-500 dark:text-slate-400">
                {state.rateLimited 
                  ? "Rate limited. Please wait before trying again." 
                  : "We'll only send you important updates. No spam, ever."
                }
              </p>
            </div>

            <Button
              type="submit"
              disabled={pending || state.rateLimited}
              className={`w-full h-12 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 ${
                state.rateLimited ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {pending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Subscribing...
                </div>
              ) : state.rateLimited ? (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Rate Limited
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Subscribe Now
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>

            {/* Status Messages */}
            {state.message && (
              <div
                className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 ${getMessageStyles()}`}
                role="status"
                aria-live="polite"
              >
                {getMessageIcon()}
                <span className="text-sm font-medium">{state.message}</span>
              </div>
            )}

            {/* Success celebration message */}
            {state.ok && hasTriggeredConfetti && (
              <div className="text-center py-2">
                <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium animate-pulse">
                  🎉 Welcome to the community! 🎉
                </p>
              </div>
            )}
          </form>

          {/* Additional info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Join <span className="font-semibold text-cyan-600 dark:text-cyan-400">500+</span> students already subscribed
            </p>
            {!isConfettiAvailable() && (
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                Enable JavaScript for the full experience
              </p>
            )}
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 hover:bg-white/70 dark:hover:bg-slate-800/70">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Workshop Alerts</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Get notified about upcoming hands-on AWS workshops</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 hover:bg-white/70 dark:hover:bg-slate-800/70">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Exclusive Content</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Access to study materials and certification guides</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 hover:bg-white/70 dark:hover:bg-slate-800/70">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Event Updates</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Stay informed about community events and meetups</p>
          </div>
        </div>
      </div>
    </section>
  )
}
