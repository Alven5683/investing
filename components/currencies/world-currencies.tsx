"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { forexAPI, type CurrencyRate } from "@/lib/api/forex"

const staticWorldCurrencies = {
  "North America": [
    { name: "US Dollar", code: "USD" },
    { name: "Canadian Dollar", code: "CAD" },
    { name: "Mexican Peso", code: "MXN" },
  ],
  Europe: [
    { name: "Euro", code: "EUR" },
    { name: "British Pound", code: "GBP" },
    { name: "Swiss Franc", code: "CHF" },
    { name: "Norwegian Krone", code: "NOK" },
    { name: "Swedish Krona", code: "SEK" },
    { name: "Danish Krone", code: "DKK" },
  ],
  "Asia-Pacific": [
    { name: "Japanese Yen", code: "JPY" },
    { name: "Australian Dollar", code: "AUD" },
    { name: "New Zealand Dollar", code: "NZD" },
    { name: "Chinese Yuan", code: "CNY" },
    { name: "Hong Kong Dollar", code: "HKD" },
    { name: "Singapore Dollar", code: "SGD" },
  ],
  "South America": [
    { name: "Brazilian Real", code: "BRL" },
    { name: "Argentine Peso", code: "ARS" },
    { name: "Chilean Peso", code: "CLP" },
    { name: "Colombian Peso", code: "COP" },
  ],
}

export function WorldCurrencies() {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const rates = await forexAPI.getWorldCurrencies()
        setCurrencyRates(rates)
      } catch (err) {
        setError("Failed to fetch currency rates")
        console.error("Error fetching currency rates:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrencyRates()
  }, [])

  const enhancedWorldCurrencies = Object.entries(staticWorldCurrencies).map(([region, currencies]) => ({
    region,
    currencies: currencies.map((currency) => {
      const rate = currencyRates.find((r) => r.code === currency.code)
      return {
        ...currency,
        rate: rate?.rate,
        change: rate?.changePercent,
        flag: rate?.flag,
      }
    }),
  }))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CardTitle className="text-xl font-bold">World Currencies</CardTitle>
          {!loading && !error && (
            <div className="flex items-center space-x-1 text-green-600 text-sm">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span>Live Rates</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2">Loading currency rates...</span>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enhancedWorldCurrencies.map(({ region, currencies }) => (
              <div key={region}>
                <h3 className="font-semibold text-sm mb-3 text-gray-700">{region}</h3>
                <ul className="space-y-2">
                  {currencies.map((currency) => (
                    <li key={currency.code} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {currency.flag && (
                          <img
                            src={currency.flag || "/placeholder.svg"}
                            alt={currency.code}
                            className="w-4 h-3 object-cover rounded-sm"
                            onError={(e) => {
                              e.currentTarget.style.display = "none"
                            }}
                          />
                        )}
                        <a
                          href={`/currencies/${currency.code.toLowerCase()}`}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {currency.name}
                        </a>
                      </div>
                      {currency.rate && (
                        <div className="text-xs text-gray-500">
                          {currency.rate.toFixed(4)}
                          {currency.change && (
                            <span className={`ml-1 ${currency.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                              ({currency.change >= 0 ? "+" : ""}
                              {currency.change.toFixed(2)}%)
                            </span>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
