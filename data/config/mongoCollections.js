const dbConnection = require("./mongoConnection");

let getCollectionFn = collection => {
  let _col = undefined;

  return () => {
    if (!_col) {
      _col = dbConnection().then(db => {
      db.createCollection(collection,function(err,res){
          if(err) throw err;
          console.log("Collection created!");
          return res;
        });
      });
    }

    return _col;
  };
};

module.exports = {
  products: getCollectionFn("products"),
  users: getCollectionFn("users"),
  posts: getCollectionFn("posts"),
  reviews: getCollectionFn("reviews")
};
