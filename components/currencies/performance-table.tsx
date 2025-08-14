import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const performanceData = [
  { pair: "EUR/USD", "1W": "+0.45%", "1M": "-1.23%", "3M": "+2.67%", "6M": "-0.89%", "1Y": "+4.12%", trend: "up" },
  { pair: "GBP/USD", "1W": "+1.23%", "1M": "+0.67%", "3M": "+1.89%", "6M": "+2.34%", "1Y": "+5.67%", trend: "up" },
  { pair: "USD/JPY", "1W": "-0.67%", "1M": "+2.34%", "3M": "+4.56%", "6M": "+6.78%", "1Y": "+12.34%", trend: "up" },
  { pair: "USD/CHF", "1W": "-0.34%", "1M": "-0.78%", "3M": "+1.23%", "6M": "+0.45%", "1Y": "+2.89%", trend: "down" },
  { pair: "AUD/USD", "1W": "+0.89%", "1M": "+1.45%", "3M": "-0.67%", "6M": "-2.34%", "1Y": "+1.23%", trend: "up" },
  { pair: "USD/CAD", "1W": "-0.56%", "1M": "-1.12%", "3M": "+0.78%", "6M": "+1.45%", "1Y": "+3.67%", trend: "down" },
  { pair: "NZD/USD", "1W": "+0.78%", "1M": "+0.34%", "3M": "-1.23%", "6M": "-1.89%", "1Y": "+0.56%", trend: "up" },
  { pair: "EUR/GBP", "1W": "-0.78%", "1M": "-1.89%", "3M": "+0.45%", "6M": "-3.12%", "1Y": "-1.45%", trend: "down" },
]

export function PerformanceTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Performance Table</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 font-medium text-gray-600">Pair</th>
                <th className="pb-3 font-medium text-gray-600">1 Week</th>
                <th className="pb-3 font-medium text-gray-600">1 Month</th>
                <th className="pb-3 font-medium text-gray-600">3 Months</th>
                <th className="pb-3 font-medium text-gray-600">6 Months</th>
                <th className="pb-3 font-medium text-gray-600">1 Year</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium flex items-center">
                    <div className="w-6 h-4 bg-gray-200 rounded mr-2"></div>
                    {row.pair}
                  </td>
                  <td className={`py-3 ${row["1W"].startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {row["1W"]}
                  </td>
                  <td className={`py-3 ${row["1M"].startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {row["1M"]}
                  </td>
                  <td className={`py-3 ${row["3M"].startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {row["3M"]}
                  </td>
                  <td className={`py-3 ${row["6M"].startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {row["6M"]}
                  </td>
                  <td className={`py-3 ${row["1Y"].startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {row["1Y"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
