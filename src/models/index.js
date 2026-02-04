const Sequelize = require('sequelize');
const config = require('../config/database');

const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const ProductImage = require('./ProductImage');
const ProductOption = require('./ProductOption');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const models = {
  User: User,
  Category: Category,
  Product: Product,
  ProductImage: ProductImage,
  ProductOption: ProductOption,
};

// Initialize models
Object.values(models).forEach((model) => model.init(sequelize));

// Associate models
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

const db = {
  ...models,
  sequelize,
  Sequelize,
};

module.exports = db;
