import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { QueryForm } from "@/components/dashboard/query-form"

export default function NewQueryPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="New Query" text="Create a new query or support request." />
      <div className="grid gap-8">
        <QueryForm />
      </div>
    </DashboardShell>
  )
}

