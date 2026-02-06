const { Model, DataTypes } = require("sequelize");

class Page extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        section: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "info", // info, blog, etc.
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        image_url: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Page",
        tableName: "pages",
        timestamps: true,
      },
    );
  }
}

module.exports = Page;
