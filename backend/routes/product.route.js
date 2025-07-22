const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/product.controllers");
const {
  createProductValidator,
} = require("../utils/validators/productvalidators");

const router = express.Router();

router
  .route("/")
  .post(createProductValidator, createProduct) // apply validator here
  .get(getAllProducts);

router
  .route("/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
