const categoryModel = require("../models/category.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private (Admin)
const CreateCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json(category);
});

// @desc    Get all categories with pagination
// @route   GET /api/v1/categories
// @access  Public
const GetCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const data = await categoryModel.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await categoryModel.countDocuments();

  if (data.length === 0) {
    res.status(404);
    throw new Error("No categories found");
  }

  res.status(200).json({
    totalCategories: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    results: data.length,
    data,
  });
});

// @desc    Get category by ID
// @route   GET /api/v1/categories/:id
// @access  Public
const GetCategoryById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await categoryModel.findById(id);

  if (!data) {
    return next(new ApiError(`Category ${id} not found`, 404));
  }

  res.status(200).json(data);
});

// @desc    Update category by ID
// @route   PUT /api/v1/categories/:id
// @access  Private (Admin)
const UpdateCategoryById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;

  const data = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true, runValidators: true }
  );

  if (!data) {
    return next(new ApiError(`Category ${id} not found`, 404));
  }

  res.status(200).json(data);
});

// @desc    Delete category by ID
// @route   DELETE /api/v1/categories/:id
// @access  Private (Admin)
const DeleteCategoryById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await categoryModel.findByIdAndDelete(id);

  if (!data) {
    return next(new ApiError(`Category ${id} not found`, 404));
  }

  res.status(200).json({ message: "Category deleted successfully" });
});

module.exports = {
  CreateCategory,
  GetCategories,
  GetCategoryById,
  UpdateCategoryById,
  DeleteCategoryById,
};
