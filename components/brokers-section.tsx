import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

const brokers = [
  {
    name: "Plus500",
    rating: 4.2,
    description: "Trade with leverage on rising and falling prices",
    features: ["Regulated by multiple authorities", "Free demo account"],
  },
  {
    name: "eToro",
    rating: 4.1,
    description: "Join the millions who have already discovered smarter investing",
    features: ["Copy successful traders", "Social trading platform"],
  },
]

export function BrokersSection() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Top Brokers</h2>
      <div className="space-y-6">
        {brokers.map((broker, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="w-16 h-16 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
              {broker.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold">{broker.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{broker.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{broker.description}</p>
              <div className="flex flex-wrap gap-2">
                {broker.features.map((feature, j) => (
                  <span key={j} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button className="bg-blue-600 hover:bg-blue-700">Open Account</Button>
              <Button variant="outline" size="sm">
                Read Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
