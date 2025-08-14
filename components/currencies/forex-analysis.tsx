import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const forexAnalysis = [
  {
    title: "EUR-USD bulls target 1.09 support as technical recovery continues",
    author: "James Stanley",
    excerpt:
      "Technical analysis suggests EUR/USD may find support at key levels as bulls attempt to stage a recovery from recent lows.",
    image: "/placeholder-xayhq.png",
    time: "1 hour ago",
    category: "Technical Analysis",
  },
  {
    title: "GBP/USD Unleashes a Deeper Dive as Divergence Widens",
    author: "Christopher Lewis",
    excerpt:
      "Sterling faces additional pressure as monetary policy divergence between the Bank of England and Federal Reserve continues to widen.",
    image: "/placeholder-xayhq.png",
    time: "3 hours ago",
    category: "Currency Analysis",
  },
  {
    title: "Russell 2000 Could Extend Gains/Losses as Momentum Builds on Monetary Policy",
    author: "Michael Boutros",
    excerpt:
      "Small-cap index momentum builds as investors position for potential Federal Reserve policy shifts in the coming months.",
    image: "/placeholder-xayhq.png",
    time: "5 hours ago",
    category: "Market Analysis",
  },
  {
    title: "Silver Futures Priced for Cycle Lows and Expansion Move",
    author: "Peter Hanks",
    excerpt:
      "Precious metals analysis indicates silver may be positioned for a significant move as cycle patterns suggest potential expansion.",
    image: "/placeholder-xayhq.png",
    time: "7 hours ago",
    category: "Commodities",
  },
]

export function ForexAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Forex Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {forexAnalysis.map((analysis, index) => (
          <div key={index} className="flex space-x-4 pb-4 border-b last:border-b-0">
            <Image
              src={analysis.image || "/placeholder.svg"}
              alt={analysis.author}
              width={60}
              height={60}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                {analysis.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{analysis.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>By {analysis.author}</span>
                <span>{analysis.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
