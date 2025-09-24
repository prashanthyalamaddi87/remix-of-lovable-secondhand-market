import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Quick overview of your activity and shortcuts.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/marketplace/sell"><Button className="rounded-full">List an item</Button></Link>
          <Link href="/marketplace"><Button variant="secondary" className="rounded-full">Browse</Button></Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Items currently for sale</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">New inquiries this week</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">$128</div>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Get started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Boost your presence by listing an item or updating your profile.</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/marketplace/sell"><Button className="rounded-full">Create listing</Button></Link>
              <Link href="/profile"><Button variant="secondary" className="rounded-full">Edit profile</Button></Link>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>Use bright, clear photos for better visibility.</li>
              <li>Write friendly, detailed descriptions.</li>
              <li>Respond quickly to interested buyers.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}