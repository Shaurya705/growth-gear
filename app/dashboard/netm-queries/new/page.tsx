import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { NetMQueryForm } from "@/components/dashboard/netm-query-form"

export default function NewNetMQueryPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="New netM Query" text="Create a new query related to the netM module." />
      <div className="grid gap-8">
        <NetMQueryForm />
      </div>
    </DashboardShell>
  )
}

