import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MascotCard() {
  return (
    <Card className="overflow-hidden border-cyan-200/60 dark:border-cyan-900/40">
      <CardHeader>
        <CardTitle>Meet Nimbus</CardTitle>
        <CardDescription>Our friendly cloud dragon mascot</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
        <div className="order-2 md:order-1">
          <p className="text-sm text-muted-foreground">
            Nimbus embodies curiosity, kindness, and the spirit of building in public. You&apos;ll spot Nimbus at our
            workshops, study groups, and showcases—always cheering on learners as they deploy to the cloud.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Loves serverless and snacks</li>
            <li>Favorite tool: the AWS Console</li>
            <li>
              Go-to mantra: {'"'}Ship small, ship often{'"'}
            </li>
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dQP9heVMMbx5xEVunOp2PD7TicJsUD.png"
            alt="Nimbus mascot illustration"
            className="mx-auto h-auto w-48 md:w-56"
          />
        </div>
      </CardContent>
    </Card>
  )
}
