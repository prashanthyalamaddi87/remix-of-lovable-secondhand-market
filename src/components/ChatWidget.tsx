"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, Send, X } from "lucide-react"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  ts: number
}

const cannedReplies = [
  "Hi! I'm your friendly AI helper. How can I assist you today?",
  "I can help you find items, suggest categories, or answer questions about selling.",
  "Tip: Use the search or explore Popular categories on the homepage!",
]

function generateReply(input: string): string {
  const q = input.toLowerCase()
  if (q.includes("sell") || q.includes("post")) {
    return "To sell an item, go to Marketplace → Sell. Add photos, set a price, and publish!"
  }
  if (q.includes("buy") || q.includes("find") || q.includes("search")) {
    return "Try Browse cozy finds or filter by category like Electronics, Clothing, Books, or Furniture."
  }
  if (q.includes("share") || q.includes("link")) {
    return "Use the Share button on the homepage to share a link with friends."
  }
  return cannedReplies[Math.floor(Math.random() * cannedReplies.length)]
}

export const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  // Seed a welcome message once when opened first time
  const welcomed = useMemo(() => messages.length > 0, [messages.length])

  useEffect(() => {
    if (open && !welcomed) {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Hey there! I can help you find pre-loved treasures or guide you to sell yours.",
          ts: Date.now(),
        },
      ])
    }
  }, [open, welcomed])

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isThinking])

  const send = async () => {
    const trimmed = input.trim()
    if (!trimmed || isThinking) return

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed, ts: Date.now() }
    setMessages((m) => [...m, userMsg])
    setInput("")

    // Fake AI response
    setIsThinking(true)
    const reply = generateReply(trimmed)
    await new Promise((r) => setTimeout(r, 650))
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "assistant", content: reply, ts: Date.now() },
    ])
    setIsThinking(false)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setOpen((v) => !v)}
          className="h-12 w-12 rounded-full shadow-lg"
          variant="default"
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </Button>
      </div>

      {/* Chat Panel */}
      {open && (
        <Card className="fixed bottom-20 right-4 z-50 w-[360px] max-w-[calc(100%-2rem)] overflow-hidden rounded-2xl border bg-card shadow-xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-primary" />
              <h3 className="text-sm font-semibold">AI Helper</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div ref={listRef} className="max-h-72 min-h-56 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    "rounded-2xl px-3 py-2 text-sm " +
                    (m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-secondary-foreground rounded-bl-sm")
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.2s]" />
                <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
                <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0.2s]" />
                <span className="sr-only">Assistant is typing…</span>
              </div>
            )}
          </div>

          <div className="border-t p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about browsing or selling…"
                className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Message"
                autoComplete="off"
              />
              <Button onClick={send} size="icon" className="h-9 w-9" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}