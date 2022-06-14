import Product from "../../models/Product";
import connectDb from "../../middlewares/connectDb";
import pincode from "../../pincodes.json";

const handler = async (req, res) => {
  let data = await fetch(`${process.env.HOST}/api/pincode`);
  let pinJson = await data.json();
  if (!pinJson.includes(req.body.pincode)) {
    return res.status(400).json({
      error: "Sorry! We don't deliver to this pincode yet.",
    });
  }
  let check_subTotal = 0;
  let cart = req.body.cart;
  let subTotal = req.body.subTotal;
  for (let item in cart) {
    let product = await Product.findOne({ slug: item });
    if (!product || cart[item].price != product.price) {
      return res.status(404).json({
        error:
          "The price of some items in your cart have changed. Please try again later.",
      });
    } else if (cart[item].qty <= 0) {
      return res.status(404).json({
        error:
          "Some products in your cart have gone out of stock. Please try again later.",
      });
    } else {
      check_subTotal += cart[item].price * cart[item].qty;
    }
  }
  if (check_subTotal != subTotal) {
    return res.status(404).json({
      error:
        "The price of some items in your cart have changed. Please try again later.",
    });
  } else {
    return res.status(200).json({ success: true });
  }
};

export default connectDb(handler);
