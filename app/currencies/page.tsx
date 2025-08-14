import { Suspense } from "react"
import { CurrenciesHeader } from "@/components/currencies/currencies-header"
import { CurrencyMarketOverview } from "@/components/currencies/currency-market-overview"
import { PerformanceTable } from "@/components/currencies/performance-table"
import { PerformanceChart } from "@/components/currencies/performance-chart"
import { DailyCorrelationHeatMap } from "@/components/currencies/correlation-heatmap"
import { ForexNews } from "@/components/currencies/forex-news"
import { ForexAnalysis } from "@/components/currencies/forex-analysis"
import { WorldCurrencies } from "@/components/currencies/world-currencies"

export default function CurrenciesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CurrenciesHeader />

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Currency Market at a Glance */}
        <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96" />}>
          <CurrencyMarketOverview />
        </Suspense>

        {/* Performance Table */}
        <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-64" />}>
          <PerformanceTable />
        </Suspense>

        {/* Performance Chart */}
        <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-80" />}>
          <PerformanceChart />
        </Suspense>

        {/* Daily Correlation Heat Map */}
        <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96" />}>
          <DailyCorrelationHeatMap />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Forex News */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96" />}>
            <ForexNews />
          </Suspense>

          {/* Forex Analysis */}
          <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-96" />}>
            <ForexAnalysis />
          </Suspense>
        </div>

        {/* World Currencies */}
        <Suspense fallback={<div className="animate-pulse bg-white rounded-lg h-64" />}>
          <WorldCurrencies />
        </Suspense>
      </div>
    </div>
  )
}
