export interface ForexPair {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  volume: number
  timestamp: string
}

export interface CurrencyRate {
  code: string
  name: string
  rate: number
  change: number
  changePercent: number
  flag: string
}

class ForexAPI {
  // Get major currency pairs
  async getMajorPairs(): Promise<ForexPair[]> {
    try {
      // Using exchange rates from CoinGecko as a fallback
      const { coinGeckoAPI } = await import("./coingecko")
      const rates = await coinGeckoAPI.getExchangeRates()

      const majorCurrencies = ["eur", "gbp", "jpy", "aud", "cad", "chf", "nzd"]

      return majorCurrencies.map((currency) => {
        const rate = rates.rates[currency]
        const basePrice = 1 / rate.value

        return {
          symbol: `${currency.toUpperCase()}/USD`,
          name: `${rate.name} / US Dollar`,
          price: basePrice,
          change: Math.random() * 0.02 - 0.01, // Mock change data
          changePercent: Math.random() * 2 - 1,
          high: basePrice * 1.005,
          low: basePrice * 0.995,
          volume: Math.floor(Math.random() * 1000000),
          timestamp: new Date().toISOString(),
        }
      })
    } catch (error) {
      console.error("Error fetching forex data:", error)
      return []
    }
  }

  // Get world currencies
  async getWorldCurrencies(): Promise<CurrencyRate[]> {
    try {
      const { coinGeckoAPI } = await import("./coingecko")
      const rates = await coinGeckoAPI.getExchangeRates()

      const currencies = Object.entries(rates.rates).map(([code, data]) => ({
        code: code.toUpperCase(),
        name: data.name,
        rate: data.value,
        change: Math.random() * 0.1 - 0.05,
        changePercent: Math.random() * 1 - 0.5,
        flag: `https://flagcdn.com/24x18/${code.slice(0, 2).toLowerCase()}.png`,
      }))

      return currencies.slice(0, 20) // Return top 20 currencies
    } catch (error) {
      console.error("Error fetching currency rates:", error)
      return []
    }
  }
}

export const forexAPI = new ForexAPI()
