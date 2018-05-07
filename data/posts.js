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
  getPostCommentsByPostId(id) {
    return post().then(postCollection => {
      return postCollection.find({ _id: id }).then(post => {
        if (!post.Comments) return null;
        return post.Comments;
      });
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
  addPost(title, body, tags, posterId, timestamp, upVotes) {
    return posts().then(postCollection => {
      return users.getUserById(posterId).then(userThatPosted => {
        let newPost = {
          _id: uuid.v4(),
          title:title,
          posterId: posterId,
          name: `${userThatPosted.nickName}`,
          timestamp: timestamp,
          body: body,
          upVotes: upVotes,
          postComments:[]
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
    var post = this.getPostById(id);
    var updatedUpVotes = post.upVotes;
    $inc: {upVotes:1};
    var newPost = {
      upVotes:updatedUpVotes,
    }
    this.updatePost(id,newPost)
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
