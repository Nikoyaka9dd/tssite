"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// 管理者アカウント情報（実際のプロダクションでは環境変数や安全な認証システムを使用してください）
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "password123"

interface AuthContextType {
  isAdmin: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // ローカルストレージから認証状態を復元
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth)
        setIsAdmin(authData.isAdmin)
        setIsAuthenticated(authData.isAuthenticated)
      } catch (error) {
        console.error("認証データの解析に失敗しました:", error)
        // 認証データが壊れている場合はリセット
        localStorage.removeItem("auth")
      }
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // 実際のプロダクションでは、APIリクエストを使用して認証を行うべきです
    // ここでは簡易的な認証を行います
    return new Promise((resolve) => {
      // 認証の遅延をシミュレート
      setTimeout(() => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          setIsAdmin(true)
          setIsAuthenticated(true)

          // 認証状態をローカルストレージに保存
          localStorage.setItem("auth", JSON.stringify({ isAdmin: true, isAuthenticated: true }))

          resolve(true)
        } else {
          resolve(false)
        }
      }, 500)
    })
  }

  const logout = () => {
    setIsAdmin(false)
    setIsAuthenticated(false)
    localStorage.removeItem("auth")
  }

  return <AuthContext.Provider value={{ isAdmin, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
