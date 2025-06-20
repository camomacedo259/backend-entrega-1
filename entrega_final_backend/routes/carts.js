import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid);
  cart.products = cart.products.filter(
    (p) => p.product.toString() !== req.params.pid
  );
  await cart.save();
  res.send(cart);
});

router.put("/:cid", async (req, res) => {
  const cart = await Cart.findByIdAndUpdate(
    req.params.cid,
    {
      products: req.body.products,
    },
    { new: true }
  );
  res.send(cart);
});

router.put("/:cid/products/:pid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid);
  const prod = cart.products.find(
    (p) => p.product.toString() === req.params.pid
  );
  if (prod) prod.quantity = req.body.quantity;
  await cart.save();
  res.send(cart);
});

router.delete("/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid);
  cart.products = [];
  await cart.save();
  res.send(cart);
});

router.get("/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid)
    .populate("products.product")
    .lean();
  res.render("cart", { cart });
});

export default router;
