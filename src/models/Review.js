const { Model, DataTypes } = require("sequelize");

class Review extends Model {
  static init(sequelize) {
    super.init(
      {
        product_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "products",
            key: "id",
          },
        },
        user_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 5,
          },
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("approved", "rejected", "pending"),
          defaultValue: "pending",
        },
      },
      {
        sequelize,
        modelName: "Review",
        tableName: "reviews",
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
  }
}

module.exports = Review;
