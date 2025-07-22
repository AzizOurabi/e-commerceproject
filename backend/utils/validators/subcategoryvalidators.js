const { check } = require("express-validator");
const validateMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Subcategory ID"),
  validateMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty().withMessage("Subcategory name is required")
    .isLength({ min: 3 }).withMessage("Subcategory name must be at least 3 characters")
    .isLength({ max: 32 }).withMessage("Subcategory name must be at most 32 characters"),

  check("category")
    .notEmpty().withMessage("Subcategory must belong to a category")
    .isMongoId().withMessage("Invalid Category ID"),

  validateMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Subcategory ID"),
  validateMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Subcategory ID"),
  validateMiddleware,
];
