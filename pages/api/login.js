var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

import User from "../../models/User";
import connectDb from "../../middlewares/connectDb";

const handler = async (req, res) => {
  if (req.method == "POST") {
    if (
      Object.keys(req.body).length == 0 ||
      req.body.email == "" ||
      req.body.password == ""
    ) {
      res.status(400).json({
        error: "Provide all details!",
      });
    } else {
      let user = await User.findOne({
        email: req.body["email"],
      });
      if (user) {
        if (
          JSON.parse(
            CryptoJS.AES.decrypt(
              user.password,
              process.env.SECRETPASSWORDKEY
            ).toString(CryptoJS.enc.Utf8)
          ) == req.body.password
        ) {
          var token = jwt.sign(
            {
              success: "Login successful.",
              name: user.name,
              email: user.email,
            },
            `${process.env.JSONWEBTOKEN}`,
            {
              expiresIn: "1d",
            }
          );
          res.status(200).json({ token });
        } else
          res
            .status(400)
            .json({ error: "Please login with correct credentials" });
      } else {
        res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }
    }
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
