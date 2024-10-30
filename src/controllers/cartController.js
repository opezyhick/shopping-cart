const { cartService } = require("../services/cartService");

exports.getUserCart = async (req, res) => {
  try {
    const data = await cartService.getUserCart(req.query);
    res.json(data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        error.toObject
          ? error.toObject()
          : { message: error.message || "Internal Server Error" }
      );
  }
};

exports.addToCart = async (req, res) => {
  try {
    const data = await cartService.addToCart(req.body);
    res.json(data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        error.toObject
          ? error.toObject()
          : { message: error.message || "Internal Server Error" }
      );
  }
};

exports.removeProductFromCart = async (req, res) => {
  try {
    const data = await cartService.removeProductFromCart(req.query);
    res.json(data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        error.toObject
          ? error.toObject()
          : { message: error.message || "Internal Server Error" }
      );
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  try {
    const data = await cartService.updateCartItemQuantity(req.query);
    res.json(data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        error.toObject
          ? error.toObject()
          : { message: error.message || "Internal Server Error" }
      );
  }
};

exports.checkout = async (req, res) => {
  try {
    const data = await cartService.checkOutCart(req.query);
    res.json(data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        error.toObject
          ? error.toObject()
          : { message: error.message || "Internal Server Error" }
      );
  }
};
