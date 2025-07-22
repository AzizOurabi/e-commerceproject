const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Create Brand Validator
exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 2 })
    .withMessage("Too short brand name")
    .isLength({ max: 32 })
    .withMessage("Too long brand name"),

  // Manual validation for image because it's a file (multer puts it in req.file)
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        errors: [
          {
            type: "field",
            msg: "Brand image is required",
            path: "image",
            location: "body"
          }
        ]
      });
    }
    next();
  },

  validatorMiddleware,
];

// Get Brand by ID Validator
exports.getBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand ID"),

  validatorMiddleware,
];

// Update Brand Validator
exports.updateBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand ID"),

  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Too short brand name")
    .isLength({ max: 32 })
    .withMessage("Too long brand name"),

  validatorMiddleware,
];

// Delete Brand Validator
exports.deleteBrandValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Brand ID"),

  validatorMiddleware,
];
