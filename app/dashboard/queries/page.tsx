import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { QueriesTable } from "@/components/dashboard/queries-table"

export default function QueriesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Queries" text="Manage your queries and support requests.">
        <Link href="/dashboard/queries/new">
          <Button>New Query</Button>
        </Link>
      </DashboardHeader>
      <QueriesTable />
    </DashboardShell>
  )
}

