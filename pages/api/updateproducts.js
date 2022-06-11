import Product from "../../models/Product";
import connectDb from "../../middlewares/connectDb";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; ++i) {
      await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
    }
    res.status(200).json({ success: "Updated the products" });
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
