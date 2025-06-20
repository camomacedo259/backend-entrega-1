import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  const filter = query
    ? { $or: [{ category: query }, { status: query === "true" }] }
    : {};

  const options = {
    page,
    limit,
    lean: true,
    sort: sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {},
  };

  const result = await Product.paginate(filter, options);

  res.json({
    status: "success",
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage
      ? `/api/products?page=${result.prevPage}`
      : null,
    nextLink: result.hasNextPage
      ? `/api/products?page=${result.nextPage}`
      : null,
  });
});

export default router;
