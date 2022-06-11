import Product from "../../models/Product";
import connectDb from "../../middlewares/connectDb";

const handler = async (req, res) => {
  let products = await Product.find({ category: req.body.category });
  res.status(200).json({ products });
};

export default connectDb(handler);
