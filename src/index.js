import path from "path";
import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import viewsRouter from "./routes/views.js";

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "src", "public")));

// Configuração do Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "views"));

// Rotas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.get("/", (req, res) => {
  res.send("Bem-vindo ao servidor!");
});

// Comunicação via WebSocket
io.on("connection", (socket) => {
  console.log("Novo cliente conectado");

  // Enviar lista inicial de produtos
  socket.emit("updateProducts", readData());

  // Atualizar lista quando um produto for adicionado ou removido
  socket.on("productAdded", () => {
    io.emit("updateProducts", readData());
  });

  socket.on("productDeleted", () => {
    io.emit("updateProducts", readData());
  });
});

export { io };
