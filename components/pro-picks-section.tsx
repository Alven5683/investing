import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProPicksSection() {
  return (
    <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">ProPicks</div>
            <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm">AI</div>
          </div>
          <h3 className="text-lg font-bold mb-2">Tech Titans</h3>
          <p className="text-sm text-gray-600 mb-4">
            They should see the stock reach new heights with their aggressively-advanced portfolio of AI top-tier stocks
            each month.
          </p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">+2,286.7%</div>
              <div className="text-xs text-gray-500">Since inception</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">+1,868.4%</div>
              <div className="text-xs text-gray-500">Last 12 months</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">+58.4%</div>
              <div className="text-xs text-gray-500">This month</div>
            </div>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Unlock Strategy</Button>
        </div>
        <div className="w-48 h-32">
          <img
            src="/stock-market-upward-trend.png"
            alt="Performance chart"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </Card>
  )
}
