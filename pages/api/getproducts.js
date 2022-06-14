import Product from "../../models/Product";
import connectDb from "../../middlewares/connectDb";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let products = await Product.find({ category: req.body.category });
    res.status(200).json({ products });
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
