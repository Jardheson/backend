const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");

router.get("/", ReviewController.index);
router.post("/", ReviewController.store);
router.put("/:id", ReviewController.update);
router.delete("/:id", ReviewController.delete);

module.exports = router;
