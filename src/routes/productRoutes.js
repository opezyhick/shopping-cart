const express = require("express");
const productController = require("../controllers/produtController");

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/add", productController.getProducts);

module.exports = router;
