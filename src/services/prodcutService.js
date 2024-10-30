const Product = require("../models/product");
const { handleError } = require("../utils/callbacks");
const redisClient = require("../utils/redis");

class ProductService {
  async getProducts(queryParams) {
    try {
      // More field can be parsed as parameter for proper filtering of data

      // Checking from cache
      const cachedProducts = await redisClient.get("products");
      if (cachedProducts) {
        return {
          message: "Product Fetched Successfully",
          data: JSON.parse(cachedProducts),
        };
      }
      const products = await Product.find();
      redisClient.set("products", JSON.stringify(products), "EX", 60); // cache for 60 seconds
      return {
        message: "Product Fetched Successfully",
        data: products,
      };
    } catch (error) {
      handleError(error);
    }
  }
}

exports.productService = new ProductService();
