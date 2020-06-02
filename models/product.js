const path = require("path");
const fs = require("fs");

const rootPath = require("../util/path");

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
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    this.id = Math.random().toString();

    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(productDataPath, JSON.stringify(products), (err, data) => {
        if (err) {
          console.log(err);
        }
      });
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
};
