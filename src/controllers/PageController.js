const { Page } = require("../models");

class PageController {
  static async index(req, res) {
    try {
      const { section } = req.query;
      const where = {};
      if (section) where.section = section;

      const pages = await Page.findAll({ where });
      return res.status(200).json(pages);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async show(req, res) {
    try {
      const { idOrSlug } = req.params;
      let page;

      if (!isNaN(idOrSlug)) {
        page = await Page.findByPk(idOrSlug);
      } else {
        page = await Page.findOne({ where: { slug: idOrSlug } });
      }

      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

      return res.status(200).json(page);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { title, slug, content, section, is_active, image_url } = req.body;
      const page = await Page.create({
        title,
        slug,
        content,
        section,
        is_active,
        image_url,
      });
      return res.status(201).json(page);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, slug, content, section, is_active, image_url } = req.body;

      const page = await Page.findByPk(id);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

      await page.update({
        title,
        slug,
        content,
        section,
        is_active,
        image_url,
      });

      return res.status(200).json(page);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const page = await Page.findByPk(id);
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

      await page.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = PageController;
