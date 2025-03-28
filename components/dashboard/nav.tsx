"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, MessageSquare, Users, Settings } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  adminOnly?: boolean
}

export function DashboardNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Queries",
      href: "/dashboard/queries",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "netM Queries",
      href: "/dashboard/netm-queries",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: <Users className="mr-2 h-4 w-4" />,
      adminOnly: true,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  const isAdmin = user?.role === "admin"

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => {
        // Skip admin-only items for non-admin users
        if (item.adminOnly && !isAdmin) return null

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href || pathname.startsWith(item.href + "/")
                ? "bg-accent text-accent-foreground"
                : "transparent",
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}

