const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Product = require("./src/models/product");

const products = [
  { name: "Laptop", price: 1000, stock: 10 },
  { name: "Smartphone", price: 600, stock: 15 },
  { name: "Headphones", price: 150, stock: 30 },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.deleteMany(); // Clear existing data

    const insertedProducts = await Product.insertMany(products);
    console.log("Products seeded:", insertedProducts);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
