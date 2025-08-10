"use client"
import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import ThemeToggle from "./theme-toggle"

const links = [
  { href: "#hero", label: "Home" },
  { href: "#subscribe", label: "Subscribe" },
]

const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault()
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/70 dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a 
          href="#hero" 
          className="flex items-center gap-2"
          onClick={(e) => smoothScroll(e, '#hero')}
        >
          <div className="flex size-9 items-center justify-center">
            <img 
              src="/awscc-ctu-logo.png" 
              alt="AWSCC-CTU Logo" 
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-foreground">AWS Cloud Club</span>
            <span className="text-xs text-muted-foreground">Cebu Technological University</span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => smoothScroll(e, l.href)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">AWSCC-CTU</SheetTitle>
              </SheetHeader>
              <div className="mt-4 grid gap-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      smoothScroll(e, l.href)
                      setOpen(false)
                    }}
                    className="rounded-md px-2 py-2 text-sm hover:bg-muted"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
