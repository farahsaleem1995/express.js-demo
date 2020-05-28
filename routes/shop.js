const path = require("path");

const express = require("express");

const rootPath = require("../util/path");
const adminData = require("./admin");

var router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { prods: products, pageTitle: "Shop", path: "/" });
});

module.exports = router;
