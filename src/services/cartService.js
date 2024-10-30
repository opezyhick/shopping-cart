const { default: mongoose } = require("mongoose");
const { InvalidPayloadError } = require("../config/error");
const Cart = require("../models/cart");
const Product = require("../models/product");
const { handleError } = require("../utils/callbacks");
const {
  addToCartValidationSchema,
  checkoutValidationSchema,
  userIdValidationSchema,
  updateCartValidationSchema,
} = require("../utils/validations");
const redisClient = require("../utils/redis");

class CartService {
  async getUserCart(queryParams = {}) {
    try {
      // Request Filter and Validation
      const { userId } = userIdValidationSchema.validateSync(queryParams);

      // Get User Cat , and Lookup the Product Information
      const cart = await Cart.find({ userId: userId }).populate(
        "items.productId"
      );
      return { message: "User Cart", data: cart };
    } catch (error) {
      handleError(error);
    }
  }
  async addToCart(payload) {
    try {
      // Request Filter and Validation
      const { userId, productId, quantity } =
        addToCartValidationSchema.validateSync(payload);

      // Check if product exists
      const product = await Product.findById(productId);
      if (!product) {
        throw new InvalidPayloadError("Oops!, Product Not found");
      }
      if (product.stock < quantity) {
        throw new InvalidPayloadError("Oops!, Insufficient stock");
      }

      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $push: { items: { productId, quantity } } },
        { new: true, upsert: true }
      );
      return { message: "Item Addedd", data: cart };
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  }
  async removeProductFromCart(queryParams) {
    try {
      // Validate the input payload
      const { userId, productId } =
        updateCartValidationSchema.validateSync(queryParams);

      // Check if the cart exists for the user
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new InvalidPayloadError("Cart not found for this user");
      }

      // Update the cart by removing the specified item
      const updatedCart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } } },
        { new: true } // Return the updated cart
      );

      // If the cart is empty after removal, delete the cart document
      if (updatedCart && updatedCart.items.length === 0) {
        await Cart.deleteOne({ _id: updatedCart._id });
      }

      return { message: "Item removed successfully", data: updatedCart };
    } catch (error) {
      handleError(error);
    }
  }

  async updateCartItemQuantity(queryParams) {
    try {
      const { userId, productId, quantity } =
        addToCartValidationSchema(queryParams).validateSync();
      // Ensure quantity is greater than zero
      if (quantity <= 0) {
        throw new InvalidPayloadError("Quantity must be greater than zero");
      }

      // Find the cart associated with the user
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        throw new InvalidPayloadError("Cart not found for this user");
      }

      // Check if the item exists in the cart
      const item = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (!item) {
        throw new InvalidPayloadError("Product not found in the cart");
      }

      // Check if sufficient stock is available for the product
      const product = await Product.findById(productId);
      if (!product || product.stock < quantity) {
        throw new InvalidPayloadError("Insufficient stock available");
      }

      // Update the quantity of the item in the cart
      item.quantity = quantity;
      await cart.save();

      return { message: "Item quantity updated successfully", data: cart };
    } catch (error) {
      handleError(error, "Error updating item quantity in cart");
    }
  }
  async checkOutCart(payload) {
    const session = await mongoose.startSession(); // Start session before try block

    try {
      // Start the transaction
      session.startTransaction();

      // Validate payload
      const { userId } = checkoutValidationSchema.validateSync(payload);

      // Retrieve the user's cart with populated items
      const cart = await Cart.findOne({ userId })
        .populate("items.productId")
        .session(session);

      if (!cart) {
        throw new InvalidPayloadError("Oops!, Empty Cart cannot be checkout");
      }

      // Check stock and update inventory for each item atomically
      for (const item of cart.items) {
        const product = await Product.findById(item.productId._id).session(
          session
        );

        if (product.stock < item.quantity) {
          throw new InvalidPayloadError("Oops!, Insufficient stock");
        }

        // Deduct stock
        product.stock -= item.quantity;
        await product.save({ session });
      }

      // Clear the cart after processing
      await Cart.deleteOne({ _id: cart._id }).session(session);

      // Commit the transaction

      // Optionally update Redis cache after successful transaction
      const allProducts = await Product.find();
      await redisClient.set("products", JSON.stringify(allProducts));
      await session.commitTransaction();

      return { message: "Checkout Successfully" };
    } catch (error) {
      console.log(error);
      await session.abortTransaction(); // Roll back if there's an error
      handleError(error);
    } finally {
      session.endSession(); // End session regardless of success or error
    }
  }
}

exports.cartService = new CartService();
