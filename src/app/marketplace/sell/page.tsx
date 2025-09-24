"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SellPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setImagePreview(null)
      return
    }
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Pretend submit then redirect
    router.push("/marketplace")
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <h1 className="mb-4 text-2xl font-semibold">Sell an item</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Cozy lamp" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="20" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Tell buyers why this item is lovable" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Photos (optional)</Label>
              <Input id="image" type="file" accept="image/*" onChange={onImageChange} />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Selected preview"
                    className="h-40 w-40 rounded-xl object-cover ring-1 ring-border"
                  />
                </div>
              )}
            </div>
            <Button type="submit" className="w-full rounded-full">Post listing</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}