const productRoutes = require("./products");
const reviewRoutes = require("./reviews");
const userRoutes = require("./users");
const postRoutes = require("./posts");

let constructorMethod = app => {
  app.use("/products", productRoutes);
  app.use("/reviews", reviewRoutes);
  app.use("/users", userRoutes);
  app.use("/posts", postRoutes);
};

module.exports = {
  products: require("./products"),
  review: require("./reviews"),
  users: require("./users"),
  posts: require("./posts")
};
