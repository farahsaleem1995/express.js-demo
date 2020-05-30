const express = require("express");

const productsController = require("../controllers/products");

var router = express.Router();

router.get("/", productsController.getProducts);

module.exports = router;
