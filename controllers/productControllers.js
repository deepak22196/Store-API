const product = require("../models/productSchema");
const asyncWrapper = require("../utils/asyncWrapper");
const createCustomError = require("../utils/customApiError");

const getAllProducts = asyncWrapper(async (req, res) => {
  let queryObject = {};
  let allProducts;
  let result;
  const { sort, fields, numericFilters, name } = req.query;
  if (name) {
    queryObject.name = { $regex: name, $options: i };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEX = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEX,
      (match) => `-${operatorMap[match]}-`
    );
    const filterOptions = ["price"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (filterOptions.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  const allProductsQueryObj = product.find(queryObject);
  result = allProductsQueryObj;

  if (sort) {
    const sortList = sort.split(",").join(" ");

    result = allProductsQueryObj.sort(sortList);
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");

    result = result.select(fieldsList);
  }
  // if (limit) {
  //   result = result.limit(Number(limit));
  // }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  allProducts = await result;
  res.status(200).json({ hits: allProducts.length, products: allProducts });
});

const getSingleProduct = asyncWrapper(async (req, res, next) => {
  const productid = req.params.id;
  const singleProduct = await product.findOne({ _id: productid });
  if (!singleProduct) {
    return next(createCustomError("no product with given id", 404));
    // return res.status(404).json({ msg: "no task with given id" });
  }
  res.status(200).json({ task: singleProduct });
});

const addProducts = asyncWrapper(async (req, res) => {
  const newproduct = await product.create(req.body);
  res.status(201).json({ newproduct });
});
const updateProduct = asyncWrapper(async (req, res) => {
  const productid = req.params.id;
  const singleProduct = await product.findOneAndUpdate(
    { _id: productid },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!singleProduct) {
    return next(createCustomError("no product with given id", 404));
  }
  res.status(200).json({ task: singleProduct });
});

const deleteProduct = asyncWrapper(async (req, res) => {
  const productid = req.params.id;
  const singleProduct = await product.findOneAndDelete({ _id: productid });
  if (!singleProduct) {
    return next(createCustomError("no product with given id", 404));
  }
  res.status(200).json({ task: singleProduct });
});

module.exports = {
  getAllProducts,
  addProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
};
