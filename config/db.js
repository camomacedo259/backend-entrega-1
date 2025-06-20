import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("📦 MongoDB conectado!");
  } catch (err) {
    console.error("Erro de conexão:", err);
  }
};
