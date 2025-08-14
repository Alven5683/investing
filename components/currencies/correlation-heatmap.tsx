import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const heatmapData = [
  ["USD", "EUR", "GBP", "JPY", "CHF", "AUD", "CAD", "NZD"],
  ["USD", 1.0, -0.85, -0.72, 0.45, -0.68, -0.79, 0.82, -0.71],
  ["EUR", -0.85, 1.0, 0.89, -0.32, 0.91, 0.68, -0.73, 0.65],
  ["GBP", -0.72, 0.89, 1.0, -0.28, 0.78, 0.71, -0.65, 0.69],
  ["JPY", 0.45, -0.32, -0.28, 1.0, -0.41, -0.35, 0.38, -0.33],
  ["CHF", -0.68, 0.91, 0.78, -0.41, 1.0, 0.59, -0.61, 0.57],
  ["AUD", -0.79, 0.68, 0.71, -0.35, 0.59, 1.0, -0.72, 0.85],
  ["CAD", 0.82, -0.73, -0.65, 0.38, -0.61, -0.72, 1.0, -0.68],
  ["NZD", -0.71, 0.65, 0.69, -0.33, 0.57, 0.85, -0.68, 1.0],
]

export function DailyCorrelationHeatMap() {
  const getColorIntensity = (value: number) => {
    if (typeof value !== "number") return "bg-gray-100"
    const intensity = Math.abs(value)
    if (value > 0) {
      if (intensity > 0.8) return "bg-green-600 text-white"
      if (intensity > 0.6) return "bg-green-500 text-white"
      if (intensity > 0.4) return "bg-green-400"
      if (intensity > 0.2) return "bg-green-300"
      return "bg-green-200"
    } else {
      if (intensity > 0.8) return "bg-red-600 text-white"
      if (intensity > 0.6) return "bg-red-500 text-white"
      if (intensity > 0.4) return "bg-red-400"
      if (intensity > 0.2) return "bg-red-300"
      return "bg-red-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Daily Correlation Heat Map</CardTitle>
        <p className="text-sm text-gray-600">Data updated 1 day 4 hr 15 min ago</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-9 gap-1 min-w-max">
            {heatmapData.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-12 h-12 flex items-center justify-center text-xs font-medium rounded
                    ${rowIndex === 0 || colIndex === 0 ? "bg-gray-100 font-bold" : getColorIntensity(cell as number)}
                  `}
                >
                  {typeof cell === "number" ? cell.toFixed(2) : cell}
                </div>
              )),
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
