import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "investing_clone"

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(DB_NAME)

    // Clear existing data
    await db.collection("categories").deleteMany({})
    await db.collection("authors").deleteMany({})
    await db.collection("blog_posts").deleteMany({})

    // Seed categories
    const categories = [
      {
        name: "Markets",
        slug: "markets",
        description: "Stock market analysis and trends",
        color: "#10B981",
        icon: "TrendingUp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Crypto",
        slug: "crypto",
        description: "Cryptocurrency news and analysis",
        color: "#F59E0B",
        icon: "Bitcoin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Earnings",
        slug: "earnings",
        description: "Company earnings reports and analysis",
        color: "#3B82F6",
        icon: "BarChart3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Commodities",
        slug: "commodities",
        description: "Commodity market updates and trends",
        color: "#EF4444",
        icon: "Coins",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const categoryResult = await db.collection("categories").insertMany(categories)
    console.log(`Inserted ${categoryResult.insertedCount} categories`)

    // Seed authors
    const authors = [
      {
        name: "Sarah Johnson",
        email: "sarah@investing.com",
        avatar: "/professional-woman-diverse.png",
        bio: "Senior Market Analyst with 10+ years of experience in financial markets",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Michael Chen",
        email: "michael@investing.com",
        avatar: "/professional-man.png",
        bio: "Cryptocurrency expert and blockchain technology specialist",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Emily Rodriguez",
        email: "emily@investing.com",
        avatar: "/professional-woman-analyst.png",
        bio: "Commodities trader and market researcher",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const authorResult = await db.collection("authors").insertMany(authors)
    console.log(`Inserted ${authorResult.insertedCount} authors`)

    // Get inserted IDs for relationships
    const insertedCategories = await db.collection("categories").find({}).toArray()
    const insertedAuthors = await db.collection("authors").find({}).toArray()

    // Seed blog posts
    const blogPosts = [
      {
        title: "S&P 500 Reaches New All-Time High Amid Tech Rally",
        slug: "sp500-new-high-tech-rally",
        excerpt:
          "The S&P 500 index closed at a record high yesterday, driven by strong performance in technology stocks.",
        content:
          "The S&P 500 index reached unprecedented heights yesterday, closing at 4,850 points, marking a significant milestone for the broader market. This surge was primarily driven by exceptional performance in the technology sector, with major players like Apple, Microsoft, and Google leading the charge...",
        featuredImage: "/sp500-chart.png",
        categoryId: insertedCategories.find((c) => c.slug === "markets")._id,
        authorId: insertedAuthors.find((a) => a.name === "Sarah Johnson")._id,
        tags: ["S&P 500", "Technology", "Stock Market", "Rally"],
        status: "published",
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        readTime: 5,
        views: 0,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Bitcoin Surges Past $45,000 as Institutional Adoption Grows",
        slug: "bitcoin-45k-institutional-adoption",
        excerpt: "Bitcoin's price momentum continues as more institutional investors enter the cryptocurrency market.",
        content:
          "Bitcoin has broken through the $45,000 resistance level, marking its highest price point in several months. This surge comes amid growing institutional adoption, with several major corporations and investment funds announcing significant Bitcoin allocations...",
        featuredImage: "/bitcoin-institutional-chart.png",
        categoryId: insertedCategories.find((c) => c.slug === "crypto")._id,
        authorId: insertedAuthors.find((a) => a.name === "Michael Chen")._id,
        tags: ["Bitcoin", "Cryptocurrency", "Institutional Investment", "Price Analysis"],
        status: "published",
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        readTime: 4,
        views: 0,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Apple Reports Record Q4 Earnings, Beats Analyst Expectations",
        slug: "apple-q4-earnings-record",
        excerpt:
          "Apple's fourth quarter results exceeded Wall Street expectations with strong iPhone and services revenue.",
        content:
          "Apple Inc. reported exceptional fourth-quarter earnings yesterday, surpassing analyst expectations across all major product categories. The tech giant posted revenue of $89.5 billion, representing a 8% year-over-year increase...",
        featuredImage: "/broker-earnings-chart.png",
        categoryId: insertedCategories.find((c) => c.slug === "earnings")._id,
        authorId: insertedAuthors.find((a) => a.name === "Sarah Johnson")._id,
        tags: ["Apple", "Earnings", "iPhone", "Technology"],
        status: "published",
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        readTime: 6,
        views: 0,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Gold Prices Climb to $2,100 Amid Economic Uncertainty",
        slug: "gold-prices-2100-economic-uncertainty",
        excerpt: "Gold continues its upward trajectory as investors seek safe-haven assets during market volatility.",
        content:
          "Gold prices have reached $2,100 per ounce, marking a significant milestone for the precious metal. This surge reflects growing investor concern about economic uncertainty and inflation pressures...",
        featuredImage: "/gold-price-chart.png",
        categoryId: insertedCategories.find((c) => c.slug === "commodities")._id,
        authorId: insertedAuthors.find((a) => a.name === "Emily Rodriguez")._id,
        tags: ["Gold", "Commodities", "Safe Haven", "Economic Uncertainty"],
        status: "published",
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        readTime: 4,
        views: 0,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const blogPostResult = await db.collection("blog_posts").insertMany(blogPosts)
    console.log(`Inserted ${blogPostResult.insertedCount} blog posts`)

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
