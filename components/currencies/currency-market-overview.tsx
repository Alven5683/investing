"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { forexAPI, type ForexPair } from "@/lib/api/forex"

export function CurrencyMarketOverview() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [currencyData, setCurrencyData] = useState<ForexPair[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y"]

  useEffect(() => {
    const fetchCurrencyData = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await forexAPI.getMajorPairs()
        setCurrencyData(data)
      } catch (err) {
        setError("Failed to fetch currency data")
        console.error("Error fetching currency data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrencyData()

    const interval = setInterval(fetchCurrencyData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Currency market at a glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading currency data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Currency market at a glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-red-600">
            <span>{error}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-xl font-bold">Currency market at a glance</CardTitle>
          <div className="flex items-center space-x-1 text-green-600 text-sm">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
        <div className="flex space-x-1">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 text-sm rounded ${
                selectedTimeframe === timeframe
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3 font-medium text-gray-600">Name</th>
                <th className="pb-3 font-medium text-gray-600">Last</th>
                <th className="pb-3 font-medium text-gray-600">Chg.</th>
                <th className="pb-3 font-medium text-gray-600">Chg. %</th>
                <th className="pb-3 font-medium text-gray-600">High</th>
                <th className="pb-3 font-medium text-gray-600">Low</th>
                <th className="pb-3 font-medium text-gray-600">Time</th>
              </tr>
            </thead>
            <tbody>
              {currencyData.map((currency, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium flex items-center">
                    <div className="w-6 h-4 bg-gray-200 rounded mr-2"></div>
                    {currency.symbol}
                  </td>
                  <td className="py-3">{currency.price.toFixed(4)}</td>
                  <td className={`py-3 ${currency.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {currency.change >= 0 ? "+" : ""}
                    {currency.change.toFixed(4)}
                  </td>
                  <td
                    className={`py-3 flex items-center ${currency.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {currency.changePercent >= 0 ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {currency.changePercent >= 0 ? "+" : ""}
                    {currency.changePercent.toFixed(2)}%
                  </td>
                  <td className="py-3">{currency.high.toFixed(4)}</td>
                  <td className="py-3">{currency.low.toFixed(4)}</td>
                  <td className="py-3 text-gray-500">Live</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
