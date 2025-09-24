"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await authClient.signUp.email({ email, name, password })
    setLoading(false)
    if (error?.code) {
      setError("Registration failed. Try a different email.")
      return
    }
    router.push("/sign-in?registered=true")
  }

  const onGoogle = async () => {
    setLoading(true)
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/profile" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-md place-items-center px-4 py-10">
      <Card className="w-full rounded-2xl">
        <CardContent className="p-6">
          <div className="space-y-1 pb-4 text-center">
            <h1 className="text-2xl font-semibold">Create your cozy account</h1>
            <p className="text-sm text-muted-foreground">Join Infinite Loopers</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button disabled={loading} className="w-full rounded-full" type="submit">Sign up</Button>
          </form>

          <div className="py-4 text-center text-sm">
            or
          </div>

          <Button disabled={loading} variant="secondary" className="w-full rounded-full" onClick={onGoogle}>
            Continue with Google
          </Button>

          <p className="pt-4 text-center text-sm">
            Already have an account? <Link className="underline" href="/sign-in">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}