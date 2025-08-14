import { Card } from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main story */}
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="relative">
              <img
                src="/asian-stock-market.png"
                alt="Asia stocks climb tracking Wall St rally"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-xl font-bold mb-2">
                  Asia stocks climb tracking Wall St rally; Japan shares set new record
                </h2>
                <p className="text-sm opacity-90">
                  Investing.com - Asian stocks climbed on Wednesday in broad-based buying, tracking sharp overnight
                  gains on Wall Street after...
                </p>
              </div>
            </div>
          </Card>

          {/* Side stories */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <img src="/placeholder-2h6zo.png" alt="Asia tech stocks rally" className="w-full h-24 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold">
                  Asia tech stocks rally on Tencent record, China courtesy of Nvidia chips
                </h3>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <img src="/placeholder-7xqyg.png" alt="Ether price surge" className="w-full h-24 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold">
                  Ether price near $4,400 record high amid flurry of corporate buying
                </h3>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <img src="/wall-street-trading-floor.png" alt="Broker Q4 earnings" className="w-full h-24 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold">Broker Q4 earnings preview: analysts eye China's sales trends</h3>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <img src="/gold-stacks.png" alt="Gold prices" className="w-full h-24 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold">
                  Gold prices steady amid Fed rate cut hopes; Trump-Putin talks awaited
                </h3>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
