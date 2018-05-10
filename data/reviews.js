const mongoCollections = require("./config/mongoCollections");
const reviews = mongoCollections.reviews;
const users = require("./users");
const uuid = require("node-uuid");

let exportedMethods = {
  getAllReviews() {
    return reviews().then(reviewCollection => {
      return reviewCollection.find({}).toArray();
    });
  },
  getReviewsByUserId(id) {
    return reviews().then(reviewCollection => {
      return reviewCollection.find({ userId: id }).toArray();
    });
  },
  getReviewsByProductId(id) {
    return reviews().then(reviewCollection => {
      return reviewCollection.find({ productId: id }).toArray();
    });
  },
  getReviewById(id) {
    return reviews().then(reviewCollection => {
      return reviewCollection.findOne({ _id: id }).then(review => {
        if (!review) throw "Review not found";
        return review;
      });
    });
  },
  addReview(userId, productId, content, timestamp) {
    return reviews().then(reviewCollection => {
      return users.getUserById(userId).then(userThatReviewed => {
        let newReview = {
          _id: uuid.v4(),
          userId: userId,
          author: userThatReviewed.nickname,
          productId,
          content,
          timestamp
        };

        return reviewCollection
          .insertOne(newReview)
          .then(newInsertInformation => {
            return newInsertInformation.insertedId;
          })
          .then(newId => {
            return this.getReviewById(newId);
          });
      });
    });
  },
  removeReview(id) {
    return reviews().then(reviewCollection => {
      return reviewCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete Review with id of ${id}`;
        } else {
        }
      });
    });
  }
};

module.exports = exportedMethods;
