const { Review, Product } = require("../models");

const BAD_WORDS = [
  "feio",
  "ruim",
  "péssimo",
  "horrível",
  "droga",
  "idiota",
  "merda",
  "bosta",
  "lixo",
  "caralho",
  "porra",
  "viado",
  "viadinho",
  "puta",
  "vagabunda",
  "corno",
  "imbecil",
  "otário",
  "trouxa",
  "foda",
  "fuder",
  "cu",
  "arrombado",
];

module.exports = {
  async index(req, res) {
    try {
      const { product_id, status } = req.query;
      const where = {};

      if (product_id) where.product_id = product_id;
      if (status) where.status = status;

      const reviews = await Review.findAll({
        where,
        order: [["createdAt", "DESC"]],
        include: [
          { model: Product, as: "product", attributes: ["name", "id"] },
        ],
      });

      return res.json(reviews);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar avaliações." });
    }
  },

  async store(req, res) {
    try {
      const { product_id, user_name, user_avatar, rating, comment } = req.body;

      const containsBadWord = BAD_WORDS.some((word) =>
        comment.toLowerCase().includes(word.toLowerCase()),
      );
      const status = containsBadWord ? "rejected" : "approved";

      const review = await Review.create({
        product_id,
        user_name,
        user_avatar,
        rating,
        comment,
        status,
      });

      if (status === "rejected") {
        return res.status(201).json({
          review,
          message: "Sua avaliação contém termos inadequados e foi rejeitada.",
        });
      }

      return res
        .status(201)
        .json({ review, message: "Avaliação enviada com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar avaliação." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const review = await Review.findByPk(id);

      if (!review) {
        return res.status(404).json({ error: "Avaliação não encontrada." });
      }

      review.status = status;
      await review.save();

      return res.json(review);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar avaliação." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const review = await Review.findByPk(id);

      if (!review) {
        return res.status(404).json({ error: "Avaliação não encontrada." });
      }

      await review.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar avaliação." });
    }
  },
};
