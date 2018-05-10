const mongoCollections = require("./config/mongoCollections");
const postComments = mongoCollections.postComments;
const users = require("./users");
const posts = require("./posts");
const uuid = require("node-uuid");

let exportedMethods = {
    getPostCommentsById(id) {
        return postComments().then(postCommentsCollection => {
          return postCommentsCollection.findOne({ _id: id }).then(postComments => {
            if (!postComments) throw "Post Comment not found";
            return postComments;
          });
        });
      },
  getAllPostComments() {
    return postComments().then(coll => {
      return coll.find({}).toArray();
    })
  },
  addPostComment(parentId, timestamp, content, userId) {
    return postComments().then(postCollection => {
      return users.getUserById(userId).then(userThatPosted => {
        return posts.addComment ( parentId ).then(post => {
          let newPost = {
            _id: uuid.v4(),
            parentId: parentId,
            timestamp: timestamp,
            content: content,
            userId: userId,
            author: userThatPosted.nickname,
            voteScore: 0,
            deleted: false,
            parentDeleted: false
          };
  
          return postCollection
            .insertOne(newPost)
            .then(newInsertInformation => {
              return newInsertInformation.insertedId;
            })
            .then(newId => {
              return this.getPostCommentsById(newId);
            });
        });
      });
    });
  },
  changeVoteScore(id, am){
    return postComments().then(postCollection => {
        return postCollection.updateOne({ _id: id }, { $inc: {quantity: am} })
        .then(result => {
          return this.getPostCommentsById(id);
        });
    });
  },
  removePostComment(id) {
    return postComments().then(postCollection => {
      return postCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete post with id of ${id}`;
        } else {
          return true;
        }
      });
    });
  },
  getPostCommentsByParentId ( id ) {
    return postComments().then(postCommentsCollection => {
      return postCommentsCollection.find({ parentId: id }).toArray();
    });
  },
  async empty () {
    const commentCollection = await postComments();
    const data = await commentCollection.remove({});
    return data;
  }
};

module.exports = exportedMethods;
