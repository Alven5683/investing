"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const chartData = [
  { currency: "EUR", value: 2.3 },
  { currency: "GBP", value: 1.8 },
  { currency: "JPY", value: 1.2 },
  { currency: "CHF", value: 0.8 },
  { currency: "AUD", value: -0.5 },
  { currency: "CAD", value: -1.2 },
  { currency: "NZD", value: -1.8 },
  { currency: "SEK", value: -2.1 },
]

export function PerformanceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("1Y")
  const periods = ["1W", "1M", "3M", "6M", "1Y"]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Performance Chart (%)</CardTitle>
        <div className="flex space-x-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-sm rounded ${
                selectedPeriod === period ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="currency" />
              <YAxis />
              <Bar dataKey="value" fill={(entry) => (entry.value >= 0 ? "#10b981" : "#ef4444")} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
