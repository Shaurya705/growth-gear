"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user"
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string, role: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("growthgear-user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse stored user:", error)
          localStorage.removeItem("growthgear-user")
        }
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in a real app, this would validate against a database
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        role: email.includes("admin") ? "admin" : "user",
      }

      // Store user in localStorage for persistence
      localStorage.setItem("growthgear-user", JSON.stringify(mockUser))
      setUser(mockUser)
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string, role: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user creation - in a real app, this would create a user in the database
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: role as "admin" | "user",
      }

      // Store user in localStorage for persistence
      localStorage.setItem("growthgear-user", JSON.stringify(mockUser))
      setUser(mockUser)
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign up failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    localStorage.removeItem("growthgear-user")
    setUser(null)
    router.push("/sign-in")
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

