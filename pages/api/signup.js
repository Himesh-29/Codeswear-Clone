var CryptoJS = require("crypto-js");

import User from "../../models/User";
import connectDb from "../../middlewares/connectDb";

const handler = async (req, res) => {
  if (req.method == "POST") {
    if (
      Object.keys(req.body).length == 0 ||
      req.body.name == "" ||
      req.body.email == "" ||
      req.body.password == ""
    ) {
      res.status(400).json({
        error: "Provide all details!",
      });
    } else if (await User.findOne({ email: req.body["email"] }))
      res.status(400).json({
        error: "User with this email already exists! Try login instead",
      });
    else {
      let { name, email } = req.body;
      let p = new User({
        name,
        email,
        password: CryptoJS.AES.encrypt(
          JSON.stringify(req.body.password),
          process.env.SECRETPASSWORDKEY
        ).toString(),
      });
      await p.save();
      res.status(200).json({ success: "User created" });
    }
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
