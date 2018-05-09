const mongoCollections = require("./config/mongoCollections");
const posts = mongoCollections.posts;
const users = require("./users");
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
  addPost(userId, timestamp, title, content) {
    return posts().then(postCollection => {
      return users.getUserById(userId).then(userThatPosted => {
        let newPost = {
          _id: uuid.v4(),
          userId,
          author: userThatPosted.nickname,
          title,
          content,
          voteScore: 0,
          deleted: false,
          commentCount: 0
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
  changeVoteScore(id, am){
    return posts().then(postCollection => {
        return postCollection.updateOne({ _id: id }, { $inc: {voteScore: am} })
        .then(result => {
          return this.getPostById(id);
        });
    });
  },
  addComment(id) {
    return posts().then(postCollection => {
      return postCollection.updateOne({ _id: id }, { $inc: { commentCount: 1} })
      .then ( res => {
        return this.getPostById(id);
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
};

module.exports = exportedMethods;
