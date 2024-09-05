import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function Component() {
  return (
    <main className="w-full min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <Card className="bg-primary text-primary-foreground p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Transporter</CardTitle>
            <CardDescription className="text-muted-foreground">
              As a Transporter, you are responsible for safely moving goods from one location to another. You'll have
              access to our fleet of vehicles and logistics tools to optimize your deliveries.
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-6">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Become a Transporter
            </Link>
          </CardFooter>
        </Card>
        <Card className="bg-secondary text-secondary-foreground p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Consignee</CardTitle>
            <CardDescription className="text-muted-foreground">
              As a Consignee, you'll receive goods from our Transporters. You can track your shipments, manage your
              inventory, and communicate with Transporters through our platform.
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-6">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-secondary-foreground px-8 text-sm font-medium text-secondary shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Become a Consignee
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}