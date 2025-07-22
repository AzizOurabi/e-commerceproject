const subCategoryModel = require("../models/subcategory.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");


const SetCategoryIdToBody = (req, res, next) => {
  if (!req.body.category && req.params.categoryId) {
    req.body.category = req.params.categoryId;
  }
  next();
};


// @desc    Create new subcategory
// @route   POST /api/v1/subcategories
// @access  Private (Admin)
const CreateSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subcategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json(subcategory);
});

const CreateFilterObj = (req,res,next) => {
  let filteredObject = {};
  if(req.params.categoryId){
    filteredObject = {category : req.params.categoryId}
  }
  req.filterObj = filteredObject; 
  next();
}


//Nested route GET /api/v1/categories/:categoryId/subcategories

// @desc    Get all subcategories with pagination
// @route   GET /api/v1/subcategories
// @access  Public
const GetSubCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;


  const data = await subCategoryModel.find(req.filterObj)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await subCategoryModel.countDocuments();

    res.status(200).json({
    status: "success",
    totalSubCategories: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    results: data.length,
    data: data,
  });

});

// @desc    Get a single subcategory by ID
// @route   GET /api/v1/subcategories/:id
// @access  Public
const GetSubCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const data = await subCategoryModel.findById(id);

  if (!data) {
    res.status(404);
    throw new Error("No subcategories found");
  }

  res.status(200).json({ data });
});

// @desc    Update subcategory by ID
// @route   PUT /api/v1/subcategories/:id
// @access  Private (Admin)
const UpdateSubCategoryById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { name , category } = req.body;

  const data = await subCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true, runValidators: true }
  );

  if (!data) {
    return next(new ApiError(`Subcategory ${id} not found`, 404));
  }

  res.status(200).json(data);
});

// @desc    Delete subcategory by ID
// @route   DELETE /api/v1/subcategories/:id
// @access  Private (Admin)
const DeleteSubCategoryById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await subCategoryModel.findByIdAndDelete(id);

  if (!data) {
    return next(new ApiError(`Subcategory ${id} not found`, 404));
  }

  res.status(200).json({ message: "Subcategory deleted successfully" });
});

module.exports = {
  CreateSubCategory,
  GetSubCategories,
  GetSubCategoryById,
  UpdateSubCategoryById,
  DeleteSubCategoryById,
  SetCategoryIdToBody,
  CreateFilterObj
};
