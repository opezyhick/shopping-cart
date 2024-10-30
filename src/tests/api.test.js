const request = require("supertest");
const Product = require("../models/product");
const Cart = require("../models/cart");
const app = require("../../server");
const { default: mongoose } = require("mongoose");

describe("Shopping Cart API", () => {
  let productId;

  // Seed products before tests
  beforeAll(async () => {
    const product = await Product.create({
      name: "Tablet",
      price: 200,
      stock: 5,
    });
    productId = product._id;
  });

  // Clean up after tests
  afterAll(async () => {
    await Product.deleteMany();
    await Cart.deleteMany();
    await mongoose.connection.close(); // Close DB connection
  });

  describe("POST /api/v1/cart/add", () => {
    it("should add an item to the cart", async () => {
      const response = await request(app).post("/api/v1/cart/add").send({
        userId: "user1",
        productId: productId.toString(),
        quantity: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.items[0].productId).toEqual(
        productId.toString()
      );
    });

    it("should not add an item if stock is insufficient", async () => {
      const response = await request(app).post("/api/v1/cart/add").send({
        userId: "user1",
        productId: productId.toString(),
        quantity: 10,
      });

      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/v1/cart/checkout", () => {
    it("should not allow checkout if an item is out of stock", async () => {
      await Product.findByIdAndUpdate(productId, { stock: 0 });

      const response = await request(app)
        .post("/api/v1/cart/checkout")
        .send({ userId: "user1" });

      expect(response.status).toBe(400);
    });
  });
});
