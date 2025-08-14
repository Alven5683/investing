import Link from "next/link"
import { Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Top section with logo and social icons */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white text-2xl font-bold">
            Investing<span className="text-yellow-500">.com</span>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Risk disclosure text */}
        <div className="text-sm text-gray-400 leading-relaxed mb-8 space-y-4">
          <p>
            <strong>Risk Disclosure:</strong> Trading in financial instruments and/or cryptocurrencies involves high
            risks including the risk of losing some, or all, of your investment amount, and may not be suitable for all
            investors. Prices of cryptocurrencies are extremely volatile and may be affected by external factors such as
            financial, regulatory or political events. Trading on margin increases the financial risks.
          </p>
          <p>
            Before deciding to trade in financial instrument or cryptocurrencies you should be fully informed of the
            risks and costs associated with trading the financial markets, carefully consider your investment
            objectives, level of experience, and risk appetite, and seek professional advice where needed.
          </p>
          <p>
            <strong>Fusion Media</strong> would like to remind you that the data contained in this website is not
            necessarily real-time nor accurate. The data and prices on the website are not necessarily provided by any
            market or exchange, but may be provided by market makers, and so prices may not be accurate and may differ
            from the actual price at any given market, meaning prices are indicative and not appropriate for trading
            purposes. <strong>Fusion Media</strong> and any provider of the data contained in this website will not
            accept liability for any loss or damage as a result of your trading, or your reliance on the information
            contained within this website.
          </p>
          <p>
            It is prohibited to use, store, reproduce, display, modify, transmit or distribute the data contained in
            this website without the explicit prior written permission of Fusion Media and/or the data provider. All
            intellectual property rights are reserved by the providers and/or the exchange providing the data contained
            in this website.
          </p>
          <p>
            <strong>Fusion Media</strong> may be compensated by the advertisers that appear on the website, based on
            your interaction with the advertisements or advertisers.
          </p>
        </div>

        {/* Bottom section with copyright and links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2007-2025 - Fusion Media Limited. All Rights Reserved.
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms And Conditions
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Risk Disclosure
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Advertise With Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
