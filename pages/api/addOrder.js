import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDb from "../../middlewares/connectDb";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let item in req.body.cart) {
      let product = await Product.findOne({ slug: item });
      if (product.availableQty <= 0) {
        return res.status(400).json({
          error:
            "The stock of some items in your cart have been finished. Please try again later.",
        });
      }
      if (product.availableQty < req.body.cart[item].qty) {
        return res.status(400).json({
          error:
            "We have limited stock of some items in your cart left. Please try again with fewer quantity.",
        });
      } else {
        await Product.findByIdAndUpdate(product._id, {
          availableQty: product.availableQty - req.body.cart[item].qty,
        });
      }
    }
    let order = new Order({
      email: req.body.email,
      orderid: req.body.orderid,
      address: req.body.address,
      amount: req.body.subTotal,
      products: req.body.cart,
    });
    await order.save();
    res.status(200).json({ success: "Order confirmed", _id: order._id });
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
