"use client"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const ITEMS = [
  { id: 1, title: "Smiley Camera", price: 45, img: "https://images.unsplash.com/photo-1519183071298-a2962be96f83?q=80&w=800&auto=format&fit=crop", category: "food" },
  { id: 2, title: "Cozy Sweater", price: 20, img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=800&auto=format&fit=crop", category: "clothing" },
  { id: 3, title: "Adventure Books", price: 15, img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=800&auto=format&fit=crop", category: "books" },
  { id: 4, title: "Winking Chair", price: 60, img: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop", category: "clothes" },
]

export default function MarketplacePage() {
  const search = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const cat = search.get("category")?.toLowerCase() || null
  const q = search.get("q")?.toLowerCase() || ""
  const byCategory = cat ? ITEMS.filter((i) => i.category === cat) : ITEMS
  const filtered = q ? byCategory.filter((i) => i.title.toLowerCase().includes(q)) : byCategory

  const updateParam = (key: string, value?: string) => {
    const params = new URLSearchParams(search.toString())
    if (!value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-semibold">Marketplace</h1>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {cat && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Showing</span>
              <Badge variant="secondary" className="capitalize">{cat}</Badge>
              <Link href="/marketplace" className="text-sm text-muted-foreground hover:underline">Clear</Link>
            </div>
          )}
        </div>
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search items..."
            value={q}
            onChange={(e) => updateParam("q", e.target.value.trim() ? e.target.value : undefined)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No items found{q ? ` for "${q}"` : ""}{cat ? ` in ${cat}` : ""}.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((item) => (
            <Link key={item.id} href={`/marketplace/${item.id}`}>
              <Card className="group overflow-hidden rounded-2xl transition-all hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm">${item.price}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}