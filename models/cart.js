const fs = require("fs");
const path = require("path");

const rootPath = require("../util/path");

const cartDataPath = path.join(rootPath, "data", "cart.json");

module.exports = class Cart {
  static addProduct(product, cb) {
    fs.readFile(cartDataPath, (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }

      var exisitingProductIndex = cart.products.findIndex(
        (p) => p.id === product.id
      );
      var exisitingProduct = cart.products[exisitingProductIndex];

      let updatedProduct;
      if (exisitingProduct) {
        updatedProduct = exisitingProduct;
        updatedProduct.quantity += 1;
        cart.products[exisitingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: product.id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +product.price;

      fs.writeFile(cartDataPath, JSON.stringify(cart), (err) => {
        if (!err) {
          cb(null);
        } else {
          cb(cart);
        }
      });
    });
  }

  static deleteProduct(product, cb) {
    fs.readFile(cartDataPath, (err, data) => {
      const updatedCart = { ...JSON.parse(data) };
      const deletedCartProduct = updatedCart.products.find(
        (p) => p.id === product.id
      );
      if (!deletedCartProduct) {
        return;
      }

      const productQuantity = deletedCartProduct.quantity;
      const productPrice = product.price;

      updatedCart.products = updatedCart.products.filter(
        (p) => p.id !== product.id
      );
      updatedCart.totalPrice -= productPrice * productQuantity;

      fs.writeFile(cartDataPath, JSON.stringify(updatedCart), (err) => {
        if (!err) {
          cb(null);
        } else {
          cb(updatedCart);
        }
      });
    });
  }

  static getCart(cb) {
    fs.readFile(cartDataPath, (err, data) => {
      const cart = JSON.parse(data);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
