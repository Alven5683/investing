const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

async function createAdminUser() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/investing-clone"
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db()

    // Check if admin user already exists
    const existingAdmin = await db.collection("users").findOne({ email: "admin@investing.com" })

    if (existingAdmin) {
      console.log("Admin user already exists")
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 12)

    const adminUser = {
      email: "admin@investing.com",
      password: hashedPassword,
      name: "Admin User",
      role: "admin",
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.collection("users").insertOne(adminUser)
    console.log("Admin user created successfully!")
    console.log("Email: admin@investing.com")
    console.log("Password: admin123")
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await client.close()
  }
}

createAdminUser()
