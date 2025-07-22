const express = require("express");
const multer = require("multer");
const {
  CreateBrand,
  GetBrands,
  GetBrandById,
  UpdateBrandById,
  DeleteBrandById
} = require("../Controllers/brands.controllers");
const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator
} = require("../utils/validators/brandsvalidators");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/")
  .post(upload.single("image"), createBrandValidator, CreateBrand)
  .get(GetBrands);

router.route("/:id")
  .get(getBrandValidator, GetBrandById)
  .put(updateBrandValidator, UpdateBrandById)
  .delete(deleteBrandValidator, DeleteBrandById);

module.exports = router;
