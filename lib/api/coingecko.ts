const API_KEY = "CG-T9g9UiueJgsnntj758KkEo9w"
const BASE_URL = "https://api.coingecko.com/api/v3"

export interface CoinData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  high_24h: number
  low_24h: number
  image: string
  last_updated: string
}

export interface ExchangeRate {
  name: string
  unit: string
  value: number
  type: string
}

export interface MarketData {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

class CoinGeckoAPI {
  private async fetchWithAuth(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`${BASE_URL}${endpoint}`)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    const response = await fetch(url.toString(), {
      headers: {
        "X-CG-Demo-API-Key": API_KEY,
        Accept: "application/json",
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    })

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    return response.json()
  }

  // Get top cryptocurrencies by market cap
  async getTopCoins(limit = 100): Promise<CoinData[]> {
    return this.fetchWithAuth("/coins/markets", {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: limit.toString(),
      page: "1",
      sparkline: "false",
      price_change_percentage: "24h",
    })
  }

  // Get specific coin data
  async getCoin(coinId: string): Promise<any> {
    return this.fetchWithAuth(`/coins/${coinId}`, {
      localization: "false",
      tickers: "false",
      market_data: "true",
      community_data: "false",
      developer_data: "false",
    })
  }

  // Get exchange rates
  async getExchangeRates(): Promise<{ rates: Record<string, ExchangeRate> }> {
    return this.fetchWithAuth("/exchange_rates")
  }

  // Get market chart data
  async getMarketChart(coinId: string, days = 7): Promise<MarketData> {
    return this.fetchWithAuth(`/coins/${coinId}/market_chart`, {
      vs_currency: "usd",
      days: days.toString(),
      interval: days <= 1 ? "hourly" : "daily",
    })
  }

  // Get trending coins
  async getTrendingCoins(): Promise<any> {
    return this.fetchWithAuth("/search/trending")
  }

  // Get global market data
  async getGlobalData(): Promise<any> {
    return this.fetchWithAuth("/global")
  }

  // Get supported currencies
  async getSupportedCurrencies(): Promise<string[]> {
    return this.fetchWithAuth("/simple/supported_vs_currencies")
  }

  // Get price data for multiple coins
  async getSimplePrices(
    coinIds: string[],
    currencies: string[] = ["usd"],
  ): Promise<Record<string, Record<string, number>>> {
    return this.fetchWithAuth("/simple/price", {
      ids: coinIds.join(","),
      vs_currencies: currencies.join(","),
      include_24hr_change: "true",
      include_24hr_vol: "true",
      include_market_cap: "true",
    })
  }
}

export const coinGeckoAPI = new CoinGeckoAPI()

// Helper functions for common data transformations
export const formatCurrency = (value: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
}

export const formatMarketCap = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  return `$${value.toLocaleString()}`
}
