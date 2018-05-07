const mongoCollections = require("./config/mongoCollections");
const reviews = mongoCollections.reviews;
const users = mongoCollections.users;
const uuid = require("node-uuid");

let exportedMethods = {
  getAllReviews() {
    return reviews().then(reviewCollection => {
      return reviewCollection.find({}).toArray();
    });
  },
  getReviewsByUserId(id) {
    return reviews().then(reviewCollection => {
      return reviewCollection.find({ userId: userId }).toArray();
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
  addReview(title, body, tags, ReviewerId) {
    return reviews().then(reviewCollection => {
      return users.getUserById(reviewerId).then(userThatReviewed => {
        let newReview = {
          _id: uuid.v4(),
          body: body,
          userId: userId,
          name: `${userThatReviewed.nickname}`,
          productId: productId,
          timestamp: timestamp,
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
  },
  updateReview(id, updatedReview) {
    return reviews().then(reviewCollection => {
      let updatedReviewData = {};

      if (updatedReview.body) {
        updatedReviewData.body = updatedReview.body;
      }

      if (updatedReview.name){
        updatedReviewData.name = updatedReview.name;
      }

      if (updatedReview.userId){
        updatedReviewData.userId = updatedReview.userId;
      }

      let updateCommand = {
        $set: updatedReviewData
      };

      return reviewCollection
        .updateOne({ _id: id }, updateCommand)
        .then(result => {
          return this.getReviewById(id);
        });
    });
  }
};

module.exports = exportedMethods;
