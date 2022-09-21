import dbConnect from "../../lib/dbConnect";
import User from "../../models/Users";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();
  const method = req.method;

  if (method !== "POST") {
    res.status(400).json({ success: false, error: "Method not allowed" }).end();
    return;
  }

  try {
    const { username, email, password, firstName, lastName } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(401).json({ success: false, data: "User already exists" });
      return;
    }
    const hashedPassword = await hash(password, 13);
    const newUser = await User.create({
      username,
      email,
      hash: hashedPassword,
      firstName,
      lastName,
    });
    if (newUser) {
      res.json({ success: true, data: username });
      return;
    } else {
      res
        .status(402)
        .json({ success: false, data: "User could not be created" });
      return;
    }
  } catch (err) {
    console.error("Error in Function", err);
    res.status(500).json({ success: false, data: err.message });
    return;
  }
}
