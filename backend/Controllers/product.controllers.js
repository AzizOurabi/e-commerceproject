const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// @desc   Create a new product
// @route  POST /api/products
exports.createProduct = asyncHandler(async (req, res) => {
  const { title } = req.body;
  req.body.slug = slugify(title);

  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @desc   Get all products
// @route  GET /api/products
exports.getAllProducts = asyncHandler(async (req, res) => {
  // 1. Filter query
  const queryObj = { ...req.query };
  const excludeFields = ['page', 'limit', 'fields', 'sort'];
  excludeFields.forEach((field) => delete queryObj[field]);

  // 2. Replace operators with $gte, $lte, etc.
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

// 3. Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  // 4. Create MongoDB query
  let mongooseQuery = Product.find(JSON.parse(queryStr)).populate({
    path: 'category',
    select: 'name',
  }).limit(limit).skip(skip);

  

  // 5. Execute
  const products = await mongooseQuery;

  // 6. Send response
  res.status(200).json({
    results: products.length,
    page,
    data: products,
  });
});


// @desc   Get single product by ID
// @route  GET /api/products/:id
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category brand subcategories");

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

// @desc   Update product by ID
// @route  PUT /api/products/:id
exports.updateProduct = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (title) {
    req.body.slug = slugify(title);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

// @desc   Delete product by ID
// @route  DELETE /api/products/:id
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ message: "Product deleted successfully" });
});
