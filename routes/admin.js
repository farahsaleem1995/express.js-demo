const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

// /admin/add-product => POST
router.get("/edit-product", adminController.getEditProduct);

// /admin/products => POST
router.get("/products", adminController.getProducts);

module.exports = router;
