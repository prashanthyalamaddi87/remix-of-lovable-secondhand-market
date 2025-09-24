"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignInPage() {
  const router = useRouter()
  const search = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
      callbackURL: "/profile",
    })
    setLoading(false)
    if (error?.code) {
      setError("Invalid email or password.")
      return
    }
    router.push("/profile")
  }

  const onGoogle = async () => {
    setLoading(true)
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/profile" })
    } finally {
      setLoading(false)
    }
  }

  const registered = search.get("registered")

  return (
    <main className="mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-md place-items-center px-4 py-10">
      <Card className="w-full rounded-2xl">
        <CardContent className="p-6">
          <div className="space-y-1 pb-4 text-center">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your cozy account</p>
            {registered && (
              <p className="mt-2 rounded-md bg-secondary px-3 py-2 text-xs">Account created! Please sign in.</p>
            )}
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button disabled={loading} className="w-full rounded-full" type="submit">Sign in</Button>
          </form>

          <div className="py-4">
            <Separator />
          </div>

          <Button disabled={loading} variant="secondary" className="w-full rounded-full" onClick={onGoogle}>
            Continue with Google
          </Button>

          <p className="pt-4 text-center text-sm">
            New here? <Link className="underline" href="/sign-up">Create an account</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}