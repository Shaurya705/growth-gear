import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QueryOverviewProps {
  title: string
  value: string
}

export function QueryOverview({ title, value }: QueryOverviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

