const express = require("express");
const dotenv = require("dotenv");
const database = require("./src/config/database");

dotenv.config();
const PORT = process.env.PORT || 3000;

const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");

const app = express();
app.use(express.json());

app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);

main();

async function main() {
  try {
    await database.connect();

    app.listen(PORT, () => {
      console.info(`🚀 Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = app;
