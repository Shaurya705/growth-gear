import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { QueriesTable } from "@/components/dashboard/queries-table"

export default function NetMQueriesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="netM Queries" text="Manage queries related to the netM module.">
        <Link href="/dashboard/netm-queries/new">
          <Button>New netM Query</Button>
        </Link>
      </DashboardHeader>
      <QueriesTable />
    </DashboardShell>
  )
}

