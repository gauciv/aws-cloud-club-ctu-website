"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Cloud, Loader2, Users } from "lucide-react"

const Nimbus3D = dynamic(() => import("./nimbus-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] w-full items-center justify-center rounded-2xl bg-white/60 dark:bg-slate-900/40">
      <Loader2 className="h-6 w-6 animate-spin text-cyan-600" />
    </div>
  ),
})

export default function Hero() {
  const [enable3D, setEnable3D] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const should = !media.matches && window.innerWidth >= 768
    setEnable3D(should)
  }, [])

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Sky background using Source URL */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SRkpCbadZNSNmirnPXnFrirE0kHdll.png)",
        }}
        aria-hidden="true"
      />
      {/* Soft light to dark overlay for contrast */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white/30 via-white/0 to-white dark:from-slate-900/40 dark:via-slate-950/20 dark:to-slate-950" />

      {/* Animated glow blobs (CSS-in-component) */}
      <div className="pointer-events-none absolute -top-24 -left-20 -z-10 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl dark:bg-cyan-900/40 animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-900/30 animate-float" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-5">
          <Badge className="bg-cyan-600 hover:bg-cyan-700 text-white border-0">AWS Cloud Club</Badge>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-white/70 px-3 py-1 text-xs text-cyan-700 backdrop-blur dark:border-cyan-400/30 dark:bg-slate-900/60 dark:text-cyan-300">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan-600 dark:bg-cyan-400" />
            Under construction — full site coming soon
          </div>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-cyan-700 via-sky-600 to-emerald-600 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-300 dark:to-indigo-300">
              AWSCC-CTU
            </span>
          </h1>
          <p className="text-pretty text-base text-slate-700 dark:text-slate-300 sm:text-lg">
            A student community for builders who love the cloud. Learn AWS, ship projects, and grow your network with
            AWSCC-CTU.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#subscribe">
              <Button size="lg" className="relative overflow-hidden bg-cyan-600 text-white hover:bg-cyan-700">
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/0 via-white/20 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a 
              href="https://www.meetup.com/aws-cloud-club-at-cebu-technological-university/?utm_version=v2" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-slate-900">
                <Users className="mr-2 h-4 w-4" />
                Join Club
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3 text-sm text-slate-600 dark:text-slate-300/90">
            <span>Hands-on workshops • Certification study groups • Projects and showcases</span>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -left-10 -top-8 hidden h-48 w-48 rounded-full bg-cyan-200/50 blur-3xl dark:bg-cyan-900/30 md:block" />
          {enable3D ? (
            <Nimbus3D />
          ) : (
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dQP9heVMMbx5xEVunOp2PD7TicJsUD.png"
                alt="Nimbus, the AWSCC-CTU mascot"
                className="h-auto w-full max-w-md rounded-2xl border border-white/40 bg-white/60 p-2 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/40"
              />
            </div>
          )}
          
          {/* 3D Toggle moved below the model */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <Cloud className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            <label htmlFor="toggle-3d" className="text-sm text-slate-600 dark:text-slate-300/90">
              Enable 3D Nimbus
            </label>
            <input
              id="toggle-3d"
              type="checkbox"
              className="h-4 w-4 accent-cyan-600"
              checked={enable3D}
              onChange={(e) => setEnable3D(e.target.checked)}
              aria-describedby="toggle-3d-desc"
            />
            <span id="toggle-3d-desc" className="sr-only">
              Toggle rendering the 3D mascot in the hero
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes float-slow {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
