// models/brand.model.js

const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Brand name is required"],
        unique: true,
        trim: true,
        minlength: [2, "Too short brand name"],
        maxlength: [32, "Too long brand name"]
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: {
        type: String,
        required: [true, "Brand image is required"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
