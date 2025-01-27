import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "./profile-form"

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your profile and view your activity</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile information and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Badges earned through donations and participation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="p-4 border rounded-lg text-center space-y-2">
                <Badge variant="outline">Bronze Donor</Badge>
                <p className="text-sm text-muted-foreground">$10+ donated</p>
              </div>
              <div className="p-4 border rounded-lg text-center space-y-2">
                <Badge variant="outline">Active Voter</Badge>
                <p className="text-sm text-muted-foreground">10+ votes cast</p>
              </div>
              <div className="p-4 border rounded-lg text-center space-y-2">
                <Badge variant="outline">Early Supporter</Badge>
                <p className="text-sm text-muted-foreground">Joined in 2024</p>
              </div>
              <div className="p-4 border rounded-lg text-center space-y-2">
                <Badge variant="outline">Community Leader</Badge>
                <p className="text-sm text-muted-foreground">5+ approved requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="donations">
              <TabsList>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
                <TabsTrigger value="votes">Votes</TabsTrigger>
              </TabsList>
              <TabsContent value="donations" className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Donated $50</p>
                      <p className="text-sm text-muted-foreground">To: Medical Emergency Support</p>
                    </div>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="requests" className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Educational Support Fund</p>
                      <p className="text-sm text-muted-foreground">$3,000 requested</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="votes" className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Voted Yes</p>
                      <p className="text-sm text-muted-foreground">On: Medical Emergency Support</p>
                    </div>
                    <p className="text-sm text-muted-foreground">1 week ago</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

