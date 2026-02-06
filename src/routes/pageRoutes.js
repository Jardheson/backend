const express = require("express");
const router = express.Router();
const PageController = require("../controllers/PageController");
const authMiddleware = require("../middleware/auth");

router.get("/", PageController.index);
router.get("/:idOrSlug", PageController.show);

router.post("/", authMiddleware, PageController.create);
router.put("/:id", authMiddleware, PageController.update);
router.delete("/:id", authMiddleware, PageController.delete);

module.exports = router;
