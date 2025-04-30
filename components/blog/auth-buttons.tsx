"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function AuthButtons() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <Link href="/admin/blog/new">
      <Button>新規イベント追加</Button>
    </Link>
  )
}
