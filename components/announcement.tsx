import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Wrench } from "lucide-react"

export default function Announcement() {
  return (
    <section
      aria-live="polite"
      className="border-b bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="mx-auto max-w-6xl px-4 py-3">
        <Alert className="border-cyan-200/60 bg-white/70 backdrop-blur dark:border-cyan-900/40 dark:bg-slate-900/60">
          <Wrench className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          <AlertTitle className="text-slate-800 dark:text-slate-100">Website in development</AlertTitle>
          <AlertDescription className="text-slate-600 dark:text-slate-300">
            We’re crafting the full experience. Subscribe below to get notified when we launch.
          </AlertDescription>
        </Alert>
      </div>
    </section>
  )
}
