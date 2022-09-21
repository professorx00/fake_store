import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  hash: { type: String, required: true },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  createdDate: { type: Date, default: Date.now() },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
