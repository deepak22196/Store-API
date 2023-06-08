const express = require("express");

const {
  getAllProducts,
  addProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

router.post("/", addProducts);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
