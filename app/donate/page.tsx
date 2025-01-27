import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DonatePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Make a Donation</h1>
        <p className="text-muted-foreground mt-2">Support your community with as little as $1</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation Amount</CardTitle>
          <CardDescription>
            Enter the amount you wish to donate. All donations are recorded on the blockchain for complete transparency.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount (USD)
              </label>
              <Input id="amount" type="number" placeholder="Enter amount" min="1" />
              <p className="text-xs text-muted-foreground">Minimum donation: $1</p>
            </div>
            <Button className="w-full">Donate Now</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Donation Badges</CardTitle>
          <CardDescription>Earn badges based on your cumulative donations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Badge variant="outline">Bronze</Badge>
              <p className="text-sm font-medium">$10+</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Badge variant="outline">Silver</Badge>
              <p className="text-sm font-medium">$50+</p>
            </div>
            <div className="p-4 border rounded-lg text-center space-y-2">
              <Badge variant="outline">Gold</Badge>
              <p className="text-sm font-medium">$100+</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

