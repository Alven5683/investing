import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MarketOverview } from "@/components/market-overview"
import { NewsSection } from "@/components/news-section"
import { MarketData } from "@/components/market-data"
import { TrendingStocks } from "@/components/trending-stocks"
import { BrokersSection } from "@/components/brokers-section"
import { CalendarSection } from "@/components/calendar-section"
import { ProPicksSection } from "@/components/pro-picks-section"
import { PopularScreens } from "@/components/popular-screens"
import { ToolsSection } from "@/components/tools-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <MarketOverview />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <NewsSection />
            <MarketData />
            <BrokersSection />
            <CalendarSection />
            <ProPicksSection />
            <PopularScreens />
            <ToolsSection />
          </div>
          <div className="space-y-6">
            <TrendingStocks />
          </div>
        </div>
      </div>
    </div>
  )
}
