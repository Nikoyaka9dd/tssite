"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  user: { id: string; name: string } | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  login: async () => false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const isAdmin = isAuthenticated
  const user = session?.user ? { id: session.user as string, name: session.user.name || "" } : null

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      return result?.ok || false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = () => {
    signOut({ redirect: false })
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
