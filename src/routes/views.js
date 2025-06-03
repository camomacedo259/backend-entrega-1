import express from "express";
import { readData } from "../helpers/fileManager.js";

const router = express.Router();

router.get("/home", (req, res) => {
  res.render("home", { products: readData() });
});

router.get("/", (req, res) => {
  res.redirect("/home"); // Redireciona para a página inicial
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
