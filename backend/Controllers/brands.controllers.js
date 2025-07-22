const Brand = require("../models/brands.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc    Create new brand
// @route   POST /api/v1/brands
// @access  Private (Admin)
const CreateBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const image = req.file ? req.file.path : null;

  const brand = await Brand.create({
    name,
    slug: slugify(name),
    image,
  });

  res.status(201).json({
    status: "success",
    data: brand,
  });
});


// @desc    Get all brands with pagination
// @route   GET /api/v1/brands
// @access  Public
const GetBrands = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const data = await Brand.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Brand.countDocuments();

  if (data.length === 0) {
    throw new ApiError("No brands found", 404);
  }

  res.status(200).json({
    totalBrands: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    results: data.length,
    data,
  });
});

// @desc    Get single brand by ID
// @route   GET /api/v1/brands/:id
// @access  Public
const GetBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`Brand with ID ${id} not found`, 404));
  }

  res.status(200).json({
    status: "success",
    data: brand,
  });
});

// @desc    Update brand by ID
// @route   PUT /api/v1/brands/:id
// @access  Private (Admin)
const UpdateBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, image } = req.body;

  const updatedData = {};
  if (name) {
    updatedData.name = name;
    updatedData.slug = slugify(name);
  }
  if (image) updatedData.image = image;

  const brand = await Brand.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!brand) {
    return next(new ApiError(`Brand with ID ${id} not found`, 404));
  }

  res.status(200).json({
    status: "success",
    data: brand,
  });
});

// @desc    Delete brand by ID
// @route   DELETE /api/v1/brands/:id
// @access  Private (Admin)
const DeleteBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`Brand with ID ${id} not found`, 404));
  }

  res.status(200).json({
    status: "success",
    message: "Brand deleted successfully",
  });
});

module.exports = {
  CreateBrand,
  GetBrands,
  GetBrandById,
  UpdateBrandById,
  DeleteBrandById,
};
