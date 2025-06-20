import mongoose from "mongoose";
import Product from "./models/Product.js";
import { connectDB } from "./config/db.js";

const seedProducts = [
  {
    title: "Mouse Gamer",
    description: "Mouse com sensor de alta precisão",
    code: "MG001",
    price: 150,
    status: true,
    stock: 100,
    category: "periféricos",
    thumbnails: [],
  },
  {
    title: "Notebook Ultra",
    description: "Notebook com SSD e 16GB de RAM",
    code: "NB002",
    price: 4500,
    status: true,
    stock: 20,
    category: "eletrônicos",
    thumbnails: [],
  },
  {
    title: "Cadeira Ergonômica",
    description: "Ideal para longas horas de trabalho",
    code: "CE003",
    price: 900,
    status: true,
    stock: 35,
    category: "escritório",
    thumbnails: [],
  },
];

const seedDB = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(seedProducts);
  console.log("🌱 Banco populado com produtos iniciais!");
  mongoose.disconnect();
};

seedDB();
