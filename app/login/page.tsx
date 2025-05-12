"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/admin/blog"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // 直接フェッチを使用してログイン処理を行う
      const response = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          redirect: false,
          callbackUrl,
        }),
      })

      if (response.ok) {
        // 成功した場合はリダイレクト
        router.push(callbackUrl)
        router.refresh()
      } else {
        // エラーレスポンスの処理
        try {
          const errorData = await response.json()
          setError(`ログインに失敗しました: ${errorData.error || "認証エラー"}`)
        } catch (jsonError) {
          // JSONパースエラーの場合はテキストで取得
          const errorText = await response.text()
          setError(`ログインに失敗しました: ${errorText || `ステータスコード: ${response.status}`}`)
        }
      }
    } catch (err) {
      console.error("Login error:", err)
      setError(`ログイン中にエラーが発生しました: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  // 代替ログイン処理 - 直接APIを呼び出す
  const handleDirectLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        router.push(callbackUrl)
        router.refresh()
      } else {
        try {
          const errorData = await response.json()
          setError(`ログインに失敗しました: ${errorData.error || "認証エラー"}`)
        } catch (jsonError) {
          const errorText = await response.text()
          setError(`ログインに失敗しました: ${errorText || `ステータスコード: ${response.status}`}`)
        }
      }
    } catch (err) {
      console.error("Direct login error:", err)
      setError(`ログイン中にエラーが発生しました: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>管理者ログイン</CardTitle>
          <CardDescription>管理画面にアクセスするにはログインしてください。</CardDescription>
        </CardHeader>
        <form onSubmit={handleDirectLogin}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">ユーザー名</Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
