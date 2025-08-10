export default function SectionHeader({
  id,
  title,
  subtitle,
}: {
  id: string
  title: string
  subtitle?: string
}) {
  return (
    <div id={id} className="mx-auto max-w-6xl px-4 pt-16">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
        {subtitle ? <p className="mt-2 text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  )
}
