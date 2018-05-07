const mongoCollections = require("./config/mongoCollections");
const postComments = mongoCollections.postComments;
const users = mongoCollections.users;
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
  
  addPostComment(postId,title, body, tags, posterId) {
    return posts().then(postCollection => {
      return users.getUserById(posterId).then(userThatPosted => {
        let newPost = {
          _id: uuid.v4(),
          postId:postId,
          title:title,
          posterId: posterId,
          name: `${userThatPosted.nickName}`,
          timestamp: timestamp,
          body: body,
          upVotes: upVotes
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
  incrementUpVotes(id){
    var post = this.getPostCommentsById(id);
    var updatedUpVotes = post.upVotes;
    $inc: {upVotes:1};
    var newPost = {
      upVotes:updatedUpVotes,
    }
    this.updatePostComment(id,newPost)
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
  updatePostComment(id, updatedPost) {
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
