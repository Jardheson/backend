const { Product, ProductImage, ProductOption, Category } = require("../models");
const { Op } = require("sequelize");

class ProductService {
  static async search({
    limit = 12,
    page = 1,
    fields,
    match,
    category_ids,
    "price-range": priceRange,
  }) {
    limit = parseInt(limit);
    page = parseInt(page);

    const queryOptions = {
      where: {},
      include: [
        { model: ProductImage, as: "images", attributes: ["id", "path"] },
        { model: ProductOption, as: "options" },
      ],
      distinct: true,
    };

    if (limit !== -1) {
      queryOptions.limit = limit;
      queryOptions.offset = (page - 1) * limit;
    }

    if (match) {
      queryOptions.where[Op.or] = [
        { name: { [Op.like]: `%${match}%` } },
        { description: { [Op.like]: `%${match}%` } },
      ];
    }

    if (category_ids) {
      const catIds = category_ids.split(",").map((id) => parseInt(id));
      queryOptions.include.push({
        model: Category,
        as: "categories",
        where: { id: { [Op.in]: catIds } },
        through: { attributes: [] },
      });
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map((p) => parseFloat(p));
      queryOptions.where.price = { [Op.between]: [min, max] };
    }

    const { count, rows } = await Product.findAndCountAll(queryOptions);

    const data = rows.map((product) => product.toJSON());

    return {
      data,
      total: count,
      limit,
      page,
    };
  }

  static async getById(id) {
    return Product.findByPk(id, {
      include: [
        { model: ProductImage, as: "images" },
        { model: ProductOption, as: "options" },
        { model: Category, as: "categories", through: { attributes: [] } },
      ],
    });
  }

  static async create(data) {
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
      technical_specs,
    } = data;

    const product = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      technical_specs,
    });

    if (category_ids && category_ids.length > 0) {
      await product.setCategories(category_ids);
    }

    if (images && images.length > 0) {
      const imagePromises = images.map((img) =>
        ProductImage.create({
          product_id: product.id,
          enabled: true,
          path: img.content || img,
        }),
      );
      await Promise.all(imagePromises);
    }

    if (options && options.length > 0) {
      const optionPromises = options.map((opt) =>
        ProductOption.create({
          product_id: product.id,
          title: opt.title,
          shape: opt.shape,
          radius: opt.radius ? parseInt(opt.radius) : 0,
          type: opt.type,
          values: Array.isArray(opt.values)
            ? opt.values.join(",")
            : opt.values || "",
        }),
      );
      await Promise.all(optionPromises);
    }

    return product;
  }

  static async update(id, data) {
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
      technical_specs,
    } = data;

    const product = await Product.findByPk(id);
    if (!product) return null;

    await product.update({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      technical_specs,
    });

    if (category_ids) {
      await product.setCategories(category_ids);
    }

    if (images) {
      const existingImages = await ProductImage.findAll({ where: { product_id: id } });
      const existingImageMap = new Map(existingImages.map((img) => [img.id, img]));

      for (const img of images) {
        if (img.id) {
          const existing = existingImageMap.get(img.id);
          if (!existing) continue;
          if (img.deleted) {
            await existing.destroy();
            continue;
          }
          if (img.content) {
            existing.path = img.content;
            await existing.save();
          }
        } else if (img.content) {
          await ProductImage.create({
            product_id: id,
            enabled: true,
            path: img.content,
          });
        }
      }
    }

    if (options) {
      const existingOptions = await ProductOption.findAll({ where: { product_id: id } });
      const existingOptionMap = new Map(existingOptions.map((opt) => [opt.id, opt]));

      for (const opt of options) {
        if (opt.id) {
          const existing = existingOptionMap.get(opt.id);
          if (!existing) continue;
          if (opt.deleted) {
            await existing.destroy();
            continue;
          }
          const updatedValues = {
            title: opt.title || existing.title,
            shape: opt.shape || existing.shape,
            radius: opt.radius ? parseInt(opt.radius) : existing.radius,
            type: opt.type || existing.type,
            values:
              opt.values !== undefined
                ? Array.isArray(opt.values)
                  ? opt.values.join(",")
                  : opt.values
                : existing.values,
          };
          await existing.update(updatedValues);
        } else {
          await ProductOption.create({
            product_id: id,
            title: opt.title,
            shape: opt.shape,
            radius: opt.radius ? parseInt(opt.radius) : 0,
            type: opt.type,
            values: Array.isArray(opt.values) ? opt.values.join(",") : opt.values || "",
          });
        }
      }
    }

    return product;
  }

  static async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return true;
  }
}

module.exports = ProductService;
