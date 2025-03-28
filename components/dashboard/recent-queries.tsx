"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for demonstration
const mockRecentQueries = [
  {
    id: "1",
    title: "Login issue with the application",
    status: "New",
    submissionDate: "2023-03-15T10:30:00Z",
    assignedTo: "John Doe",
    assignedToInitials: "JD",
  },
  {
    id: "2",
    title: "Cannot access reports section",
    status: "In Progress",
    submissionDate: "2023-03-14T09:15:00Z",
    assignedTo: "Jane Smith",
    assignedToInitials: "JS",
  },
  {
    id: "3",
    title: "Data not syncing properly",
    status: "New",
    submissionDate: "2023-03-13T14:45:00Z",
    assignedTo: "John Doe",
    assignedToInitials: "JD",
  },
  {
    id: "4",
    title: "Error when generating PDF reports",
    status: "New",
    submissionDate: "2023-03-13T11:20:00Z",
    assignedTo: "Unassigned",
    assignedToInitials: "UA",
  },
]

export function RecentQueries() {
  const [queries, setQueries] = useState(mockRecentQueries)

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

  return (
    <div className="space-y-4">
      {queries.map((query) => (
        <div key={query.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={query.assignedTo} />
              <AvatarFallback>{query.assignedToInitials}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/dashboard/queries/${query.id}`} className="font-medium hover:underline">
                {query.title}
              </Link>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{formatDate(query.submissionDate)}</span>
                <span>•</span>
                {getStatusBadge(query.status)}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </div>
      ))}
      <div className="mt-4 text-center">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/queries">View all queries</Link>
        </Button>
      </div>
    </div>
  )
}

