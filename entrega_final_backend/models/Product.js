import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const schema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: [String],
});

schema.plugin(paginate);
export default mongoose.model("Product", schema);
