const { Model, DataTypes } = require("sequelize");

class ProductImage extends Model {
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
        enabled: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "ProductImage",
        tableName: "product_images",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
  }
}

module.exports = ProductImage;
