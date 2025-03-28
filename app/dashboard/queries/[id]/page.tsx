"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for demonstration
const mockQueries = [
  {
    id: "1",
    title: "Login issue with the application",
    description: "Users are unable to log in to the application. The login button doesn't respond when clicked.",
    status: "New",
    submissionDate: "2023-03-15T10:30:00Z",
    assignedTo: "John Doe",
    assignedToInitials: "JD",
    module: "General",
  },
  {
    id: "2",
    title: "Cannot access reports section",
    description: "When trying to access the reports section, users are getting a 404 error.",
    status: "In Progress",
    submissionDate: "2023-03-14T09:15:00Z",
    assignedTo: "Jane Smith",
    assignedToInitials: "JS",
    module: "General",
  },
  {
    id: "3",
    title: "Data not syncing properly",
    description: "Data entered in one module is not being reflected in other modules.",
    status: "Resolved",
    submissionDate: "2023-03-13T14:45:00Z",
    assignedTo: "John Doe",
    assignedToInitials: "JD",
    module: "General",
  },
]

export default function QueryDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [query, setQuery] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchQuery = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const foundQuery = mockQueries.find((q) => q.id === params.id)
        if (foundQuery) {
          setQuery(foundQuery)
        }
      } catch (error) {
        console.error("Error fetching query:", error)
        toast({
          title: "Error",
          description: "Failed to load query details.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuery()
  }, [params.id])

  const handleStatusChange = async (newStatus: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setQuery((prev) => ({ ...prev, status: newStatus }))

      toast({
        title: "Status updated",
        description: `Query status changed to ${newStatus}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update query status.",
        variant: "destructive",
      })
    }
  }

  // Function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge variant="default">{status}</Badge>
      case "In Progress":
        return <Badge variant="secondary">{status}</Badge>
      case "Resolved":
        return (
          <Badge variant="success" className="bg-green-500">
            {status}
          </Badge>
        )
      case "Cancelled":
        return <Badge variant="destructive">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-medium">Loading query details...</h2>
          </div>
        </div>
      </DashboardShell>
    )
  }

  if (!query) {
    return (
      <DashboardShell>
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-medium">Query not found</h2>
            <p className="text-sm text-muted-foreground">
              The query you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => router.push("/dashboard/queries")}>
              Back to Queries
            </Button>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={query.title} text={`Query ID: ${query.id}`}>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/dashboard/queries")}>
            Back to Queries
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Query Information</CardTitle>
              <CardDescription>Details about this query</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <div className="mt-1">{getStatusBadge(query.status)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Submission Date</h3>
                  <div className="mt-1">{formatDate(query.submissionDate)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Module</h3>
                  <div className="mt-1">{query.module}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="" alt={query.assignedTo} />
                      <AvatarFallback>{query.assignedToInitials}</AvatarFallback>
                    </Avatar>
                    <span>{query.assignedTo}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1 whitespace-pre-wrap">{query.description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("In Progress")}
                  disabled={query.status === "In Progress"}
                >
                  We Looking for
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-50 hover:bg-green-100"
                  onClick={() => handleStatusChange("Resolved")}
                  disabled={query.status === "Resolved"}
                >
                  Resolve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-red-50 hover:bg-red-100"
                  onClick={() => handleStatusChange("Cancelled")}
                  disabled={query.status === "Cancelled"}
                >
                  Cancel
                </Button>
              </div>
              <Button variant="outline" size="sm">
                Edit Query
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Query History</CardTitle>
              <CardDescription>History of changes to this query</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No history available</h3>
                  <p className="text-sm text-muted-foreground">The history for this query will be displayed here.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>Discussion about this query</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No comments yet</h3>
                  <p className="text-sm text-muted-foreground">Be the first to comment on this query.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

