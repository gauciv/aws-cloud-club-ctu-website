import SiteHeader from "@/components/site-header"
import Announcement from "@/components/announcement"
import Hero from "@/components/hero"
import EmailForm from "@/components/email-form"
import SiteFooter from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <SiteHeader />
      <Announcement />
      <Hero />
      <EmailForm />
      <SiteFooter />
    </main>
  )
}
