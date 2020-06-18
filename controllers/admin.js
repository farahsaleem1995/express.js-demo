const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/save-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editMode: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imageUrl, price, description);
  product.save((result) => {
    console.log(result);
    res.redirect("/");
  });
};

exports.getEditProduct = (req, res, next) => {
  var productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      res.redirect("/");
    }

    res.render("admin/save-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editMode: true,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const productTitle = req.body.title;
  const productImageUrl = req.body.imageUrl;
  const productPrice = req.body.price;
  const productDescription = req.body.description;
  const updatedProduct = new Product(
    productId,
    productTitle,
    productImageUrl,
    productPrice,
    productDescription
  );
  updatedProduct.save();

  res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId, (products) => {
    console.log(products);
    res.redirect("/admin/products");
  });
};
