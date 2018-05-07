const mongoCollections = require("./config/mongoCollections");
const posts = mongoCollections.posts;
const products = require("./products");
const uuid = require("node-uuid");

let exportedMethods = {
  getAllPosts() {
    return posts().then(postCollection => {
      return postCollection.find({}).toArray();
    });
  },
  getPostsByTitle(title) {
    return posts().then(postCollection => {
      return postCollection.find({ title: title }).toArray();
    });
  },
  getPostById(id) {
    return posts().then(postCollection => {
      return postCollection.findOne({ _id: id }).then(post => {
        if (!post) throw "Post not found";
        return post;
      });
    });
  },
  addPost(title, body, tags, posterId) {
    return posts().then(postCollection => {
      return products.getUserById(posterId).then(userThatPosted => {
        let newPost = {
          _id: uuid.v4(),
          title:title,
          posterId: posterId,
          name: `${userThatPosted.nickName}`,
          timestamp: timestamp,
          body: body,
          upVotes: upVotes,
          downVotes: downVotes
        };

        return postCollection
          .insertOne(newPost)
          .then(newInsertInformation => {
            return newInsertInformation.insertedId;
          })
          .then(newId => {
            return this.getPostById(newId);
          });
      });
    });
  },
  removePost(id) {
    return posts().then(postCollection => {
      return postCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete post with id of ${id}`;
        } else {
        }
      });
    });
  },
  updatePost(id, updatedPost) {
    return posts().then(postCollection => {
      let updatedPostData = {};

      if (updatedPost.timestamp) {
        updatedPostData.timestamp = updatedPost.timestamp;
      }

      if (updatedPost.posterId) {
        updatedPostData.posterId = updatedPost.posterId;
      }

      if (updatedPost.title) {
        updatedPostData.title = updatedPost.title;
      }

      if (updatedPost.body) {
        updatedPostData.body = updatedPost.body;
      }

      if (updatedPost.upVotes) {
        updatedPostData.upVotes = updatedPost.upVotes;
      }

      if (updatedPost.downVotes) {
        updatedPostData.downVotes = updatedPost.downVotes;
      }

      let updateCommand = {
        $set: updatedPostData
      };

      return postCollection
        .updateOne({ _id: id }, updateCommand)
        .then(result => {
          return this.getPostById(id);
        });
    });
  }
};

module.exports = exportedMethods;
