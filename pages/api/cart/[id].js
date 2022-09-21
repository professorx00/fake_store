// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../utils/dbConnect";

dbConnect();

export default function handler(req, res) {
  const id = req.query.id;
  res.status(200).json({ id: id });
}
