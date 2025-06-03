import express from "express";
import fs from "fs";

const router = express.Router();
const productsFile = "./data/products.json";

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(productsFile, "utf8"));
  } catch (error) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(productsFile, JSON.stringify(data, null, 2), "utf8");
};

// Listar todos os produtos
router.get("/", (req, res) => {
  res.json(readData());
});

// Obter produto por ID
router.get("/:pid", (req, res) => {
  const products = readData();
  const product = products.find((p) => p.id === req.params.pid);
  if (!product)
    return res.status(404).json({ message: "Produto não encontrado" });
  res.json(product);
});

// Adicionar novo produto
router.post("/", (req, res) => {
  const products = readData();
  const newProduct = { id: Date.now().toString(), ...req.body };
  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
});

// Atualizar produto por ID
router.put("/:pid", (req, res) => {
  const products = readData();
  const index = products.findIndex((p) => p.id === req.params.pid);
  if (index === -1)
    return res.status(404).json({ message: "Produto não encontrado" });

  products[index] = { ...products[index], ...req.body };
  writeData(products);
  res.json(products[index]);
});

// Remover produto por ID
router.delete("/:pid", (req, res) => {
  let products = readData();
  products = products.filter((p) => p.id !== req.params.pid);
  writeData(products);
  res.json({ message: "Produto removido" });
});

export default router;
