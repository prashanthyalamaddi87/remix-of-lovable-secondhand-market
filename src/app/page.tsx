"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Share2 } from "lucide-react"

export default function HomePage() {
  const categories = [
    { name: "Food", img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800&auto=format&fit=crop" },
    { name: "Clothing", img: "https://images.unsplash.com/photo-1520975582071-a24e66b02493?q=80&w=800&auto=format&fit=crop" },
    { name: "Books", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop" },
    { name: "Clothes", img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=800&auto=format&fit=crop" },
  ]

  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    const title = "Infinite Loopers — Pre‑loved treasures"
    const text = "Check out this adorable second‑hand marketplace!"

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // silently ignore (user may cancel native share)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 pb-16 pt-10 md:grid-cols-2 md:pt-16">
        <div className="flex flex-col items-start gap-4">
          <Badge className="rounded-full px-3 py-1" variant="secondary">Infinite Loopers & eco-friendly</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Give items a second hug</h1>
          <p className="text-muted-foreground max-w-prose">Find adorable deals and rehome pre-loved treasures. Shop smarter, cuter, and greener.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/marketplace"><Button className="rounded-full">Browse cozy finds</Button></Link>
            <Link href="/marketplace/sell"><Button variant="secondary" className="rounded-full">Sell something</Button></Link>
            <Button onClick={handleShare} variant="outline" className="rounded-full" aria-label="Share this site">
              <Share2 className="mr-2 h-4 w-4" /> {copied ? "Link copied!" : "Share"}
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-4 ring-primary/10">
          <Image
            src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1200&auto=format&fit=crop"
            alt="Infinite Loopers marketplace collage"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="mb-6 text-2xl font-semibold">Popular Categories</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.name} href={{ pathname: "/marketplace", query: { category: c.name.toLowerCase() } }}>
              <Card className="group overflow-hidden rounded-2xl transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image src={c.img} alt={c.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-sm text-muted-foreground">➜</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}