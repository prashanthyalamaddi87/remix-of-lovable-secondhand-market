"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, ShoppingBag, User, Moon, Sun } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [q, setQ] = useState("")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme")
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const dark = stored ? stored === "dark" : prefersDark
      setIsDark(dark)
    } catch {}
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    try {
      document.documentElement.classList.toggle("dark", next)
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {}
  }

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    const p = new URLSearchParams()
    if (q) p.set("q", q)
    router.push(`/marketplace?${p.toString()}`)
  }

  const LinkItem = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={
        `rounded-full px-4 py-2 text-sm transition-colors ` +
        (pathname === href
          ? "bg-foreground text-background"
          : "hover:bg-secondary text-foreground")
      }
    >
      {label}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="mt-8 grid gap-2">
              <LinkItem href="/" label="Home" />
              <LinkItem href="/marketplace" label="Marketplace" />
              <LinkItem href="/marketplace/sell" label="Sell" />
              <LinkItem href="/dashboard" label="Dashboard" />
              <LinkItem href="/profile" label="Profile" />
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-primary/40">
            <Image
              src="https://images.unsplash.com/photo-1600697395543-ef3ee6e98a5f?q=80&w=240&auto=format&fit=crop"
              alt="Infinite Loopers mascot"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-semibold tracking-tight">Infinite Loopers</span>
        </Link>

        <form onSubmit={onSearch} className="ml-auto hidden flex-1 items-center gap-2 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cozy deals..."
              className="pl-9 rounded-full"
            />
          </div>
          <Button type="submit" className="rounded-full" variant="default">Search</Button>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link href="/marketplace" className="hidden md:inline-flex">
            <Button variant="ghost" className="rounded-full">
              <ShoppingBag className="mr-2 h-4 w-4" /> Browse
            </Button>
          </Link>
          <Link href="/dashboard" className="hidden md:inline-flex">
            <Button variant="ghost" className="rounded-full">Dashboard</Button>
          </Link>
          <Link href="/sign-in">
            <Button className="rounded-full">
              <User className="mr-2 h-4 w-4" /> Sign in
            </Button>
          </Link>
        </div>
      </div>

      <form onSubmit={onSearch} className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search cozy deals..."
            className="pl-9 rounded-full"
          />
        </div>
      </form>
    </header>
  )
}