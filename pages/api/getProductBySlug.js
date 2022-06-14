import Product from "../../models/Product";
import connectDb from "../../middlewares/connectDb";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let product = await Product.findOne({ slug: req.body.slug });
    res.status(200).json({ product });
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
