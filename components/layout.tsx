"use client"

import { useEffect } from "react"

export function SmoothScroll() {
  useEffect(() => {
    // 内部リンクのクリックを処理
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]')

      if (link) {
        e.preventDefault()
        const targetId = link.getAttribute("href")

        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId)

          if (targetElement) {
            // スムーズスクロール
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })

            // URLにハッシュを追加（オプション）
            history.pushState(null, "", targetId)
          }
        }
      }
    }

    // イベントリスナーを追加
    document.addEventListener("click", handleLinkClick)

    // クリーンアップ
    return () => {
      document.removeEventListener("click", handleLinkClick)
    }
  }, [])

  return null
}
