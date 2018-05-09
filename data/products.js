const mongoCollections = require("./config/mongoCollections");
const products = mongoCollections.products;
const uuid = require("node-uuid");

let exportedMethods = {
  getAllProducts() {
    return products().then(productCollection => {
      return productCollection.find({}).toArray();
    });
  },
  getProductById(id) {
    return products().then(productCollection => {
      return productCollection.findOne({ _id: id }).then(product => {
        if (!product) throw "Product not found";
        return product;
      });
    });
  },
  addProduct(imgURL, name, price, description) {
    return products().then(productCollection => {
      let newProduct = {
        _id: uuid.v4(),
        imgURL,
        name,
        description,
        price
      };

      return productCollection
      .insertOne(newProduct)
      .then(newInsertInformation => {
        return newInsertInformation.insertedId;
      })
      .then(newId => {
        return this.getProductById(newId);
      });
    });
  },
  removeProduct(id) {
    return products().then(productCollection => {
      return productCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete product with id of ${id}`;
        } else {
        }
      });
    });
  }
};

module.exports = exportedMethods;
