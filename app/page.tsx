import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold">GrowthGear</h1>
          <nav className="ml-auto flex gap-4">
            <Link href="/sign-in" className="text-sm font-medium hover:underline underline-offset-4">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-sm font-medium hover:underline underline-offset-4">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Welcome to GrowthGear</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  An internal tool for managing queries and support requests
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/sign-up"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Get Started
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} GrowthGear. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

