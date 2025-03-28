"use client"

import type React from "react"

import { useAuth } from "@/components/auth/auth-provider"
import { DashboardNav } from "@/components/dashboard/nav"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { user, signOut, isLoading } = useAuth()
  const router = useRouter()

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/sign-in")
    }
  }, [user, isLoading, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium">Loading...</h2>
          <p className="text-sm text-muted-foreground">Please wait while we load your dashboard.</p>
        </div>
      </div>
    )
  }

  // Don't render the dashboard if not authenticated
  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-lg font-bold">GrowthGear</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">{user.name}</span>
            </span>
            <Button variant="outline" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}

