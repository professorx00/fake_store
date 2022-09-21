import mongoose from "mongoose";

const CartProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
  products: [CartProductSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdDate: { type: Date, default: Date.now() },
  total: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
