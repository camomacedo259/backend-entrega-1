import express from "express";
import fs from "fs";

const router = express.Router();
const cartsFile = "./data/carts.json";

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(cartsFile, "utf8"));
  } catch (error) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(cartsFile, JSON.stringify(data, null, 2), "utf8");
};

// Criar um novo carrinho
router.post("/", (req, res) => {
  const carts = readData();
  const newCart = { id: Date.now().toString(), products: [] };
  carts.push(newCart);
  writeData(carts);
  res.status(201).json(newCart);
});

// Listar produtos do carrinho
router.get("/:cid", (req, res) => {
  const carts = readData();
  const cart = carts.find((c) => c.id === req.params.cid);
  if (!cart)
    return res.status(404).json({ message: "Carrinho não encontrado" });
  res.json(cart.products);
});

// Adicionar produto ao carrinho
router.post("/:cid/product/:pid", (req, res) => {
  const carts = readData();
  const cartIndex = carts.findIndex((c) => c.id === req.params.cid);
  if (cartIndex === -1)
    return res.status(404).json({ message: "Carrinho não encontrado" });

  const existingProduct = carts[cartIndex].products.find(
    (p) => p.product === req.params.pid
  );
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    carts[cartIndex].products.push({ product: req.params.pid, quantity: 1 });
  }

  writeData(carts);
  res.json(carts[cartIndex]);
});

export default router;
