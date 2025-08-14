import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const events = [
  {
    time: "09:30",
    country: "US",
    event: "Jobless Claims (YoY) (Jan)",
    impact: "medium",
    actual: "2.1%",
    forecast: "2.0%",
    previous: "1.9%",
  },
  {
    time: "10:00",
    country: "US",
    event: "Existing Home Sales (YoY) (Jan)",
    impact: "high",
    actual: "-",
    forecast: "2.4%",
    previous: "2.1%",
  },
  {
    time: "14:00",
    country: "US",
    event: "German IFO Business Climate",
    impact: "high",
    actual: "-",
    forecast: "2.0%",
    previous: "1.8%",
  },
  {
    time: "15:30",
    country: "US",
    event: "Retail Sales (YoY) (Jan)",
    impact: "high",
    actual: "-",
    forecast: "2.4%",
    previous: "2.0%",
  },
]

export function CalendarSection() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Calendars</h2>
        <Button variant="link" className="text-blue-600">
          Show all events
        </Button>
      </div>

      <div className="flex space-x-4 mb-4">
        <Button variant="default" size="sm">
          Economic
        </Button>
        <Button variant="outline" size="sm">
          Earnings
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-gray-600">
              <th className="pb-2">Time</th>
              <th className="pb-2">Cur</th>
              <th className="pb-2">Event</th>
              <th className="pb-2">Actual</th>
              <th className="pb-2">Forecast</th>
              <th className="pb-2">Previous</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3 text-sm">{event.time}</td>
                <td className="py-3">
                  <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                    {event.country}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${event.impact === "high" ? "bg-red-500" : "bg-yellow-500"}`}
                    ></div>
                    <span className="text-sm">{event.event}</span>
                  </div>
                </td>
                <td className="py-3 text-sm font-medium">{event.actual}</td>
                <td className="py-3 text-sm">{event.forecast}</td>
                <td className="py-3 text-sm">{event.previous}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
