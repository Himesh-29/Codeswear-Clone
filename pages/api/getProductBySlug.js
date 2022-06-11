import Product from "../../models/Product";
import connectDb from "../../middlewares/connectDb";

const handler = async (req, res) => {
  let product = await Product.findOne({ slug: req.body.slug });
  res.status(200).json({ product });
};

export default connectDb(handler);
