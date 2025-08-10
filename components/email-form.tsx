"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Mail, ArrowRight, Sparkles } from "lucide-react"
import { subscribe } from "@/app/actions/subscribe"

export default function EmailForm() {
  const [state, action, pending] = useActionState(subscribe, { ok: false, message: "" })

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
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@ctu.edu"
                  required
                  className="pl-10 h-12 text-base border-slate-200 dark:border-slate-700 focus:border-cyan-500 focus:ring-cyan-500"
                  aria-describedby="email-help"
                />
              </div>
              <p id="email-help" className="text-xs text-slate-500 dark:text-slate-400">
                We'll only send you important updates. No spam, ever.
              </p>
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-12 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {pending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Subscribing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Subscribe Now
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>

            {state.message && (
              <div
                className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 ${
                  state.ok
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
                }`}
                role="status"
                aria-live="polite"
              >
                {state.ok && <CheckCircle2 className="h-5 w-5 flex-shrink-0" />}
                <span className="text-sm font-medium">{state.message}</span>
              </div>
            )}
          </form>

          {/* Additional info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Join <span className="font-semibold text-cyan-600 dark:text-cyan-400">500+</span> students already subscribed
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Workshop Alerts</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Get notified about upcoming hands-on AWS workshops</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Exclusive Content</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Access to study materials and certification guides</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50">
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
