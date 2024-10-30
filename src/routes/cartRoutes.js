const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/", cartController.getUserCart);
router.post("/add", cartController.addToCart);
router.put("/update-item", cartController.updateCartItemQuantity);
router.put("/remove-product", cartController.removeProductFromCart);

router.post("/checkout", cartController.checkout);

module.exports = router;
