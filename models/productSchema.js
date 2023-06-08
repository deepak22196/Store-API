const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // name: String, without validation
  name: {
    type: String,
    required: [true, "must provide a product name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  price: {
    type: Number,
    required: [true, "must provide a price for product"],
  },

  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  company: {
    type: String,
    enum: ["sony", "onePlus", "nokia", "apple"],
    message: "{value is not supported}",
  },
});

module.exports = mongoose.model("product", productSchema);
