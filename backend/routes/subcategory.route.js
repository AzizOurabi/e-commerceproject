const express = require("express");
const {
  CreateSubCategory,
  GetSubCategories,
  GetSubCategoryById,
  UpdateSubCategoryById,
  DeleteSubCategoryById,
  GetSubCategoriesById,
  SetCategoryIdToBody,
  CreateFilterObj
} = require("../Controllers/subcategory.controllers");
const { getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require("../utils/validators/subcategoryvalidators");
const { createCategoryValidator } = require("../utils/validators/categoryvalidators");


const router = express.Router({mergeParams:true});

// Routes
router
  .route('/')
  .post(SetCategoryIdToBody,createCategoryValidator,CreateSubCategory)
  .get(CreateFilterObj,GetSubCategories)

router
  .route('/:id')
  .get(getSubCategoryValidator,GetSubCategoryById)
  .put(updateSubCategoryValidator,UpdateSubCategoryById)
  .delete(deleteSubCategoryValidator,DeleteSubCategoryById)
  

module.exports = router;