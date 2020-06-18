const path = require("path");
const fs = require("fs");

const rootPath = require("../util/path");
const Cart = require("./cart");

const productDataPath = path.join(rootPath, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(productDataPath, (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save(cb) {
    getProductsFromFile((products) => {
      var newProductList = [...products];
      if (this.id) {
        var updatedProductIndex = newProductList.findIndex(
          (p) => p.id == this.id
        );
        newProductList[updatedProductIndex] = this;
      } else {
        this.id = Math.random().toString();
        newProductList.push(this);
      }

      fs.writeFile(
        productDataPath,
        JSON.stringify(newProductList),
        (err, data) => {
          if (err) {
            cb(null);
          } else {
            cb(this);
          }
        }
      );
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(productId, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === productId);
      cb(product);
    });
  }

  static deleteById(productId, cb) {
    getProductsFromFile((products) => {
      const newProductList = products.filter((p) => p.id !== productId);
      const product = products.find((p) => p.id === productId);

      fs.writeFile(
        productDataPath,
        JSON.stringify(newProductList),
        (err, data) => {
          if (!err) {
            Cart.deleteProduct(product);
            cb(newProductList);
          }
        }
      );
    });
  }
};
