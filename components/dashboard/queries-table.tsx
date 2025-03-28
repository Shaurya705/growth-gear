"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

// Mock data for demonstration
const mockQueries = [
  {
    id: "1",
    title: "Login issue with the application",
    status: "New",
    submissionDate: "2023-03-15T10:30:00Z",
    assignedTo: "John Doe",
  },
  {
    id: "2",
    title: "Cannot access reports section",
    status: "In Progress",
    submissionDate: "2023-03-14T09:15:00Z",
    assignedTo: "Jane Smith",
  },
  {
    id: "3",
    title: "Data not syncing properly",
    status: "Resolved",
    submissionDate: "2023-03-13T14:45:00Z",
    assignedTo: "John Doe",
  },
]

export function QueriesTable() {
  const [queries, setQueries] = useState(mockQueries)

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

  // Handle status change
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setQueries((prev) => prev.map((query) => (query.id === id ? { ...query, status: newStatus } : query)))

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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queries.length > 0 ? (
            queries.map((query) => (
              <TableRow key={query.id}>
                <TableCell className="font-medium">
                  <Link href={`/dashboard/queries/${query.id}`} className="hover:underline">
                    {query.title}
                  </Link>
                </TableCell>
                <TableCell>{getStatusBadge(query.status)}</TableCell>
                <TableCell>{formatDate(query.submissionDate)}</TableCell>
                <TableCell>{query.assignedTo}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(query.id, "In Progress")}
                      disabled={query.status === "In Progress"}
                    >
                      We Looking for
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-50 hover:bg-green-100"
                      onClick={() => handleStatusChange(query.id, "Resolved")}
                      disabled={query.status === "Resolved"}
                    >
                      Resolve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-50 hover:bg-red-100"
                      onClick={() => handleStatusChange(query.id, "Cancelled")}
                      disabled={query.status === "Cancelled"}
                    >
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No queries found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

