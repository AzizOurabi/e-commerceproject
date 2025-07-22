const mongoose = require("mongoose");
const { Schema } = mongoose;

// Assuming you already have the Category model
const Category = require("./category.model"); // Import the Category model if it's in a different file

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subcategory name is required"],
    unique: true,
    minlength: [3, "Subcategory name must be at least 3 characters"],
    maxlength: [32, "Subcategory name must be at most 32 characters"],
    trim: true
  },
  slug: {
    type: String,
    lowercase: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Subcategory must belong to a category"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Subcategory", subcategorySchema);
