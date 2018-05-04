const mongoCollections = require("../config/mongoCollections");
const products = mongoCollections.products;
const uuid = require("node-uuid");

let exportedMethods = {
  getAllProducts() {
    return products().then(productCollection => {
      return productCollection.find({}).toArray();
    });
  },
  getProductsByTag(tag) {
    return products().then(productCollection => {
      return productCollection.find({ tags: tag }).toArray();
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
  addProduct(name, description, tags, imageSrc) {
    return products().then(productCollection => {
      return products.getUserById(productId).then( product => {
        let newProduct = {
          _id: uuid.v4(),
          name: name,
          description: description,
          tags: tags,
          imageSrc: imageSrc,
          reviews:[]
        };
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
  },
  updateProduct(id, updatedProduct) {
    return products().then(productCollection => {
      let updatedProductData = {};

      if (updatedProduct.tags) {
        updatedProductData.tags = updatedProduct.tags;
      }

      if (updatedProduct.title) {
        updatedProductData.title = updatedProduct.title;
      }

      if (updatedProduct.body) {
        updatedProductData.body = updatedProduct.body;
      }

      let updateCommand = {
        $set: updatedProductData
      };

      return productCollection
        .updateOne({ _id: id }, updateCommand)
        .then(result => {
          return this.getProductById(id);
        });
    });
  },
  renameTag(oldTag, newTag) {
    let findDocuments = {
      tags: oldTag
    };

    let firstUpdate = {
      $pull: oldTag
    };

    let secondUpdate = {
      $addToSet: newTag
    };

    return productCollection
      .updateMany(findDocuments, firstUpdate)
      .then(result => {
        return productCollection.updateMany(findDocuments, secondUpdate);
      })
      .then(secondUpdate => {
        return this.getProductsByTag(newTag);
      });
  }
};

module.exports = exportedMethods;
