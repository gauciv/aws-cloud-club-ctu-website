import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ComingSoon({
  rows = 3,
  message = "Coming soon",
}: {
  rows?: number
  message?: string
}) {
  return (
    <div className="relative">
      {/* Skeleton grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: rows * 2 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-28 w-full" />
            <CardContent className="space-y-2 p-4">
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overlay message */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="rounded-xl border border-white/60 bg-white/70 px-5 py-2 text-sm font-medium text-slate-700 backdrop-blur-md shadow dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200">
          {message}
        </div>
      </div>
    </div>
  )
}
