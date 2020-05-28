const path = require("path");

const express = require("express");

const rootPath = require("../util/path");
const adminData = require("./admin");

var router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    hasProds: products.length > 0,
    pageTitle: "Shop",
    path: "/",
    productCSS: true,
    activeShop: true,
  });
});

module.exports = router;
