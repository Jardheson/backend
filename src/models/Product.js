/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *         - price
 *         - price_with_discount
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         enabled:
 *           type: boolean
 *           description: Whether the product is enabled
 *         name:
 *           type: string
 *           description: The name of the product
 *         slug:
 *           type: string
 *           description: The slug of the product
 *         stock:
 *           type: integer
 *           description: The stock quantity
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         price_with_discount:
 *           type: number
 *           description: The price with discount
 *         technical_specs:
 *           type: object
 *           description: JSON object with technical specifications
 *       example:
 *         name: Nike Air Force 1
 *         slug: nike-air-force-1
 *         price: 199.99
 *         price_with_discount: 149.99
 *         stock: 10
 *         description: Classic sneaker
 */
const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        enabled: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        use_in_menu: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        description: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        price_with_discount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        technical_specs: {
          type: DataTypes.JSON,
          defaultValue: {},
        },
      },
      {
        sequelize,
        modelName: "Product",
        tableName: "products",
        timestamps: true,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.ProductImage, {
      foreignKey: "product_id",
      as: "images",
    });
    this.hasMany(models.ProductOption, {
      foreignKey: "product_id",
      as: "options",
    });
    this.belongsToMany(models.Category, {
      foreignKey: "product_id",
      through: "product_categories",
      as: "categories",
    });
  }
}

module.exports = Product;
