"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { authClient, useSession } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession()
  const router = useRouter()

  const onSignOut = async () => {
    const token = localStorage.getItem("bearer_token")
    await authClient.signOut({
      fetchOptions: { headers: { Authorization: `Bearer ${token}` } },
    })
    localStorage.removeItem("bearer_token")
    refetch()
    router.push("/")
  }

  if (isPending) return <main className="grid min-h-[60vh] place-items-center">Loading...</main>
  if (!session?.user) return null

  const badges = [
    { label: "First Sale", color: "bg-emerald-100 text-emerald-700" },
    { label: "Great Buyer", color: "bg-sky-100 text-sky-700" },
    { label: "Eco Hero", color: "bg-amber-100 text-amber-700" },
  ]

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-primary/10">
          <Image src={session.user.image || "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop"} alt="Avatar" fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{session.user.name || "Infinite Looper"}</h1>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </div>
        <div className="ml-auto">
          <Button className="rounded-full" onClick={onSignOut}>Sign out</Button>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <h2 className="mb-3 text-lg font-medium">Achievement Badges</h2>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <span key={b.label} className={`rounded-full px-3 py-1 text-xs ${b.color}`}>{b.label}</span>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}