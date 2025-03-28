import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { UsersTable } from "@/components/dashboard/users-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UsersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Manage users and their roles.">
        <Link href="/dashboard/users/new">
          <Button>Add User</Button>
        </Link>
      </DashboardHeader>
      <UsersTable />
    </DashboardShell>
  )
}

