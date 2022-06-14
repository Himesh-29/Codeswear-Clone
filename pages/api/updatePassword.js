import User from "../../models/User";
import connectDb from "../../middlewares/connectDb";

var jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const token = req.body.token;
      const data = jwt.verify(token, `${process.env.JSONWEBTOKEN}`);
      const user = await User.findOne({
        email: data.email,
      });
      if (
        user &&
        JSON.parse(
          CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRETPASSWORDKEY
          ).toString(CryptoJS.enc.Utf8)
        ) == req.body.currentPassword
      ) {
        let newPassword = CryptoJS.AES.encrypt(
          JSON.stringify(req.body.newPassword),
          process.env.SECRETPASSWORDKEY
        ).toString();
        await User.findByIdAndUpdate(user._id, { password: newPassword });
        return res
          .status(200)
          .json({ success: "Password updated successfully" });
      } else {
        return res
          .status(500)
          .json({ error: "Please try again later with correct credentials" });
      }
    } catch (e) {
      res
        .status(500)
        .json({ error: "Please try again later with correct credentials." });
    }
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
