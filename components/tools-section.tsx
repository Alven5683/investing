import { Card } from "@/components/ui/card"

const tools = [
  { name: "Stock Screener", description: "Filter stocks by various criteria" },
  { name: "Currency Converter", description: "Convert between currencies" },
  { name: "Fibonacci Calculator", description: "Calculate Fibonacci retracements" },
  { name: "Pivot Points", description: "Calculate pivot points for trading" },
  { name: "Profit Calculator", description: "Calculate potential profits" },
  { name: "Margin Calculator", description: "Calculate margin requirements" },
]

export function ToolsSection() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
          <div key={i} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <h3 className="font-medium mb-1">{tool.name}</h3>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
