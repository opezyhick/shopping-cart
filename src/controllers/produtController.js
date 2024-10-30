const { productService } = require("../services/prodcutService");

exports.getProducts = async (req, res) => {
  try {
    const data = await productService.getProducts(req.query);
    res.json(data);
  } catch (error) {
    res.status(error.status).json(error.toObject());
  }
};
