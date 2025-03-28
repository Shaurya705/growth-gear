"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock data for demonstration
const data = [
  {
    name: "Mon",
    total: 4,
    new: 2,
    inProgress: 1,
    resolved: 1,
  },
  {
    name: "Tue",
    total: 6,
    new: 3,
    inProgress: 2,
    resolved: 1,
  },
  {
    name: "Wed",
    total: 8,
    new: 4,
    inProgress: 3,
    resolved: 1,
  },
  {
    name: "Thu",
    total: 9,
    new: 3,
    inProgress: 4,
    resolved: 2,
  },
  {
    name: "Fri",
    total: 7,
    new: 2,
    inProgress: 3,
    resolved: 2,
  },
  {
    name: "Sat",
    total: 3,
    new: 1,
    inProgress: 1,
    resolved: 1,
  },
  {
    name: "Sun",
    total: 2,
    new: 1,
    inProgress: 0,
    resolved: 1,
  },
]

export function QueryStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="new" fill="#adfa1d" radius={[4, 4, 0, 0]} stackId="a" />
        <Bar dataKey="inProgress" fill="#0ea5e9" radius={[4, 4, 0, 0]} stackId="a" />
        <Bar dataKey="resolved" fill="#22c55e" radius={[4, 4, 0, 0]} stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  )
}

