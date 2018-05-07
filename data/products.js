const mongoCollections = require("./config/mongoCollections");
const products = mongoCollections.products;
const uuid = require("node-uuid");

let exportedMethods = {
  getAllProducts() {
    return products().then(productCollection => {
      return productCollection.find({}).toArray();
    });
  },
  getProductsByReviewId(reviewId) {
    return products().then(productCollection => {
      return productCollection.find({ reviewId: reviewId }).toArray();
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
      return products.getProductById(productId).then( product => {
        let newProduct = {
          _id: uuid.v4(),
          name: name,
          description: description,
          imageSrc: imageSrc,
          price:price,
          reviews:[]
        };

        return productCollection
        .insertOne(newProduct)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getUserById(newId);
        });
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
  updateReviewId(oldReviewId, newReviewId) {
    let findDocuments = {
      reviewId: oldReviewId
    };

    let firstUpdate = {
      $pull: oldReviewId
    };

    let secondUpdate = {
      $addToSet: newReviewId
    };

    return productCollection
      .updateMany(findDocuments, firstUpdate)
      .then(result => {
        return productCollection.updateMany(findDocuments, secondUpdate);
      })
      .then(secondUpdate => {
        return this.getProductsByReviewId(newReviewId);
      });
  }
};

module.exports = exportedMethods;
