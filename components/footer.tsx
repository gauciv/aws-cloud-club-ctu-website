import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} AWS Cloud Club – Cebu Technological University</p>
        <div className="flex items-center gap-4">
          <Link href="https://aws.amazon.com/education/awseducate/" className="hover:text-foreground" target="_blank">
            AWS Educate
          </Link>
          <a href="#about" className="hover:text-foreground">
            About
          </a>
          <a href="#subscribe" className="hover:text-foreground">
            Subscribe
          </a>
        </div>
      </div>
    </footer>
  )
}
