"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useSession, signOut } from "next-auth/react"

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  user: { id: string; name: string } | null
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const isAdmin = isAuthenticated
  const user = session?.user ? { id: session.user.id as string, name: session.user.name || "" } : null

  const logout = () => {
    signOut({ redirect: true, callbackUrl: "/" })
  }

  return <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
