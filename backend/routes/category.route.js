const express = require("express");
const {
  CreateCategory,
  GetCategories,
  GetCategoryById,
  UpdateCategoryById,
  DeleteCategoryById
} = require("../Controllers/category.controllers");

const subcategoriesRoute = require("./subcategory.route")
const { getCategoryValidator, updateCategoryValidator, deleteCategoryValidator } = require("../utils/validators/categoryvalidators");

const router = express.Router();

// Routes

router.use('/:categoryId/subcategories',subcategoriesRoute)

router
  .route('/')
  .post(CreateCategory)    // @PRIVATE
  .get(GetCategories);     // @PUBLIC

router
  .route('/:id')
  .get(getCategoryValidator,GetCategoryById)                         // @PUBLIC
  .put(updateCategoryValidator,UpdateCategoryById)                   // @PRIVATE
  .delete(deleteCategoryValidator,DeleteCategoryById);               // @PRIVATE

module.exports = router;
