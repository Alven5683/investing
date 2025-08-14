import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const stockData = [
  { symbol: "AAPL", name: "Apple Inc", price: "229.87", change: "+2.45", percent: "+1.08%", trend: "up" },
  { symbol: "MSFT", name: "Microsoft Corp", price: "441.58", change: "+8.92", percent: "+2.06%", trend: "up" },
  { symbol: "GOOGL", name: "Alphabet Inc", price: "178.42", change: "+3.21", percent: "+1.83%", trend: "up" },
  { symbol: "AMZN", name: "Amazon.com Inc", price: "197.12", change: "+4.67", percent: "+2.43%", trend: "up" },
  { symbol: "TSLA", name: "Tesla Inc", price: "248.98", change: "-2.34", percent: "-0.93%", trend: "down" },
  { symbol: "META", name: "Meta Platforms", price: "563.27", change: "+12.45", percent: "+2.26%", trend: "up" },
]

export function MarketData() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Most Undervalued & Overvalued Stocks</h2>
        <Button variant="link" className="text-blue-600">
          Show all indices
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-600">
              <th className="pb-2">Name</th>
              <th className="pb-2 text-right">Price</th>
              <th className="pb-2 text-right">Change</th>
              <th className="pb-2 text-right">Change %</th>
              <th className="pb-2 text-right">Fair Value</th>
              <th className="pb-2 text-right">Discount</th>
              <th className="pb-2 text-right">Opinion</th>
              <th className="pb-2 text-right">P/E Ratio</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-xs font-bold text-blue-600">
                      {stock.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{stock.symbol}</div>
                      <div className="text-xs text-gray-500">{stock.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right font-medium">{stock.price}</td>
                <td className={`py-3 text-right ${stock.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stock.change}
                </td>
                <td className={`py-3 text-right ${stock.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stock.percent}
                </td>
                <td className="py-3 text-right">Fair</td>
                <td className="py-3 text-right">Good</td>
                <td className="py-3 text-right">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Buy</span>
                </td>
                <td className="py-3 text-right">24.5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
