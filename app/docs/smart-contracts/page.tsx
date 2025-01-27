import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Info } from "lucide-react"

export default function SmartContractsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Smart Contracts</h1>
        <p className="text-muted-foreground mt-2">Technical documentation for the CrowdCare smart contracts</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Contract Addresses</AlertTitle>
        <AlertDescription>
          Main Contract: 0x1234...5678 (Ethereum Mainnet)
          <br />
          Test Contract: 0x8765...4321 (Goerli Testnet)
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Contract Overview</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              The CrowdCare smart contract system consists of several key components:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Request management and funding</li>
              <li>Voting system for request approval</li>
              <li>Dispute resolution mechanism</li>
              <li>Security features and access controls</li>
            </ul>
          </CardContent>
        </Card>

        <h3 className="text-xl font-bold">Key Functions</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Function</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Access</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono">createRequest</TableCell>
              <TableCell>Creates a new fund request</TableCell>
              <TableCell>Public</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">donate</TableCell>
              <TableCell>Makes a donation to a request</TableCell>
              <TableCell>Public Payable</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">createDispute</TableCell>
              <TableCell>Creates a new dispute</TableCell>
              <TableCell>Donors Only</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">voteOnDispute</TableCell>
              <TableCell>Votes on an active dispute</TableCell>
              <TableCell>Donors Only</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-xl font-bold">Events</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Parameters</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono">RequestCreated</TableCell>
              <TableCell>requestId, creator, amount</TableCell>
              <TableCell>Emitted when a new request is created</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">DonationReceived</TableCell>
              <TableCell>requestId, donor, amount</TableCell>
              <TableCell>Emitted when a donation is made</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">DisputeCreated</TableCell>
              <TableCell>disputeId, requestId, creator</TableCell>
              <TableCell>Emitted when a dispute is created</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-xl font-bold">Security Considerations</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The contract uses OpenZeppelin's Ownable for admin functions and implements custom modifiers for
                donor-only actions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Reentrancy Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All functions that handle ETH transfers use ReentrancyGuard to prevent reentrancy attacks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

