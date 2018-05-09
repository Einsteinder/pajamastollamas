const dbConnection = require("./mongoConnection");

let getCollectionFn = collection => {
  let _col = undefined;

  return () => {
    if (!_col) {
      _col = dbConnection().then(db => {
        return db.collection ( collection );
      });
    }

    return _col;
  };
};

module.exports = {
  products: getCollectionFn("products"),
  users: getCollectionFn("users"),
  posts: getCollectionFn("posts"),
  reviews: getCollectionFn("reviews"),
  postComments: getCollectionFn("postComments")
};
