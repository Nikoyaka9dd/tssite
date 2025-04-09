"use client"

import { useEffect } from "react"

export function TwitterTimeline() {
  useEffect(() => {
    // Twitter widgets
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    script.charset = "utf-8"
    document.body.appendChild(script)

    return () => {
      // スクリプトが存在する場合のみ削除
      const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="timeline-container">
      <div className="timeline">
        <a
          className="twitter-timeline"
          data-width="300"
          data-height="400"
          href="https://twitter.com/g_keppeki?ref_src=twsrc%5Etfw"
        >
          Tweets by g_keppeki
        </a>
      </div>
      <div className="timeline">
        <a
          className="twitter-timeline"
          data-width="300"
          data-height="400"
          href="https://twitter.com/c_a_c_official?ref_src=twsrc%5Etfw"
        >
          Tweets by c_a_c_official
        </a>
      </div>
      <div className="timeline">
        <a
          className="twitter-timeline"
          data-width="300"
          data-height="400"
          href="https://twitter.com/ise_girls?ref_src=twsrc%5Etfw"
        >
          Tweets by ise_girls
        </a>
      </div>
      <div className="timeline">
        <a
          className="twitter-timeline"
          data-width="300"
          data-height="400"
          href="https://twitter.com/ISEMAKERS?ref_src=twsrc%5Etfw"
        >
          Tweets by ISEMAKERS
        </a>
      </div>
    </div>
  )
}
