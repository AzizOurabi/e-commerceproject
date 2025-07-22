const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const mongoose = require("mongoose");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 10 })
    .withMessage("Description is too short"),

  check("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  check("priceAfterDiscount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price after discount must be a positive number")
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error("Price after discount must be lower than original price");
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("Colors should be an array of strings"),

  check("imageCover")
    .notEmpty()
    .withMessage("Product cover image is required"),

  check("images")
    .optional()
    .isArray()
    .withMessage("Images should be an array"),

  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category ID")
    .custom(async (categoryId)=> {
      const Category = require("../../models/category.model")
      const category = await Category.findById(categoryId)
      if(!category){
        return Promise.reject(`No Category for this Id : ${categoryId}`)
      }
      return true;
    }),

  check("subcategories")
  .optional()
  .isArray()
  .withMessage("Subcategories should be an array")
  .custom(async (subcategoriesIds, { req }) => {
    const Subcategory = require("../../models/subcategory.model");

    // Vérifie que tous les IDs sont valides
    for (const id of subcategoriesIds) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid subcategory ID: ${id}`);
      }
    }

    // Vérifie l'existence des sous-catégories
    const subcategories = await Subcategory.find({ _id: { $in: subcategoriesIds } });

    if (subcategories.length !== subcategoriesIds.length) {
      return Promise.reject("One or more subcategories do not exist");
    }

    // Vérifie qu'elles appartiennent à la même catégorie
    const invalidSubcats = subcategories.filter(
      (subcat) => subcat.category.toString() !== req.body.category
    );

    if (invalidSubcats.length > 0) {
      return Promise.reject("Some subcategories do not belong to the specified category");
    }

    return true;
  }),



  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Invalid brand ID"),

  validatorMiddleware,
];
