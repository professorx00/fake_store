import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 999999.9999 },
  category: { type: String, default: "other" },
  image: { type: String, default: "https://via.placeholder.com/150" },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
