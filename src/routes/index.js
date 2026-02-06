const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const pageRoutes = require("./pageRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/page", pageRoutes);
router.use("/review", reviewRoutes);

module.exports = router;
