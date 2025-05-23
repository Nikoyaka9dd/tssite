"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownProps {
  content: string
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="my-3" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-3" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-3" {...props} />,
        li: ({ node, ...props }) => <li className="my-1" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-muted pl-4 italic my-3" {...props} />
        ),
        code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) =>
          inline ? (
            <code className={`bg-muted px-1 py-0.5 rounded text-sm font-mono ${className || ""}`} {...props}>
              {children}
            </code>
          ) : (
            <pre className="bg-muted p-4 rounded-md overflow-x-auto my-4">
              <code className={`text-sm font-mono ${className || ""}`} {...props}>
                {children}
              </code>
            </pre>
          ),
        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
