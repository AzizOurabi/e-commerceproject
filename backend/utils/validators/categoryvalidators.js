const {check } = require("express-validator");
const validateMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Category Id"),
    validateMiddleware,
]

exports.createCategoryValidator = [
    check("name")
    .notEmpty().withMessage("Category name is required")
    .isLength({min:3}).withMessage("Category name must be at least 3 characters")
    .isLength({max:32}).withMessage("Category name must be at most 32 characters"),
    validateMiddleware

]

exports.updateCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Category Id"),
    validateMiddleware,
]

exports.deleteCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Category Id"),
    validateMiddleware,
]
