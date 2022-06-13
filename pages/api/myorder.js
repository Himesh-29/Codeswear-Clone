import Order from "../../models/Order";
import connectDb from "../../middlewares/connectDb";
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  const token = req.body.token;
  try {
    const data = jwt.verify(token, `${process.env.JSONWEBTOKEN}`);
    let myorders = await Order.find({ email: data.email });
    res.status(200).json({ orders: myorders });
  } catch (e) {
    res
      .status(500)
      .json({ error: "Please try again later with correct credentials." });
  }
};

export default connectDb(handler);
