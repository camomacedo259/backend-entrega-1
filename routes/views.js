import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/products", async (req, res) => {
  const { page = 1 } = req.query;
  const result = await Product.paginate({}, { page, limit: 5, lean: true });
  res.render("products", result);
});

router.get("/products/:pid", async (req, res) => {
  const product = await Product.findById(req.params.pid).lean();
  res.render("productDetails", { product });
});

export default router;
