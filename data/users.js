const mongoCollections = require("./config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("node-uuid");
let exportedMethods = {
  getAllUsers() {
    return users().then(userCollection => {
      return userCollection.find({}).toArray();
    });
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  getUserById(id) {
    return users().then(userCollection => {
      return userCollection.findOne({ _id: id }).then(user => {
        if (!user) throw "User not found";

        return user;
      });
    });
  },
  getUserByEmail(email) {
		return users().then((userCollection)=> {
			return userCollection.findOne({email: email}).then((user)=> {
				if (user) {
					return user;
				} else {
          throw "User not found";
				}
			});
		});
	},
  addUser(nickname, email, password) {
    return users().then(userCollection => {
      let newUser = {
        nickname,
        _id: uuid.v4(),
        email,
        password
      };

      return userCollection
        .insertOne(newUser)
        .then(info => {
          return this.getUserById(newUser._id);
        });
    });
  },
  removeUser(id) {
    return users().then(userCollection => {
      return userCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete user with id of ${id}`;
        }
      });
    });
  },
  updateUser(id, body) {
    return users().then(userCollection => {
      return userCollection.updateOne ( {_id: id}, body ).then(info => {
        return this.getUserById ( id );
      })
    });
  }
};

module.exports = exportedMethods;
