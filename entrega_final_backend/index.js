import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { connectDB } from "./config/db.js";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import viewsRouter from "./routes/views.js";

const app = express();
const PORT = 8080;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "views"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.listen(PORT, () => console.log(`🚀 Rodando em http://localhost:${PORT}`));
