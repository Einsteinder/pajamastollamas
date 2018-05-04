const productRoutes = require("./products");

let constructorMethod = app => {
  app.use("/products", productRoutes);
};

module.exports = {
  products: require("./products")
};
