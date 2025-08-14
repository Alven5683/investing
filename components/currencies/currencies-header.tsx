"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const currencyTabs = [
  { name: "Currencies", href: "/currencies", active: true },
  { name: "Single Currency Crosses", href: "/currencies/crosses" },
  { name: "Currency Rates", href: "/currencies/rates" },
  { name: "Live Currency Cross Rates", href: "/currencies/live-rates" },
  { name: "Exchange Rates Table", href: "/currencies/exchange-rates" },
  { name: "US Dollar Index Futures", href: "/currencies/usd-index-futures" },
  { name: "Currency Futures", href: "/currencies/futures" },
  { name: "Currency Brokers", href: "/currencies/brokers" },
]

export function CurrenciesHeader() {
  const [activeTab, setActiveTab] = useState("Currencies")

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 overflow-x-auto scrollbar-hide">
          {currencyTabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "whitespace-nowrap py-4 px-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.name
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
              )}
            >
              {tab.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
