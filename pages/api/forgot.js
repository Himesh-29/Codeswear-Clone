import User from "../../models/User";
import Forgot from "../../models/Forgot";
import connectDb from "../../middlewares/connectDb";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    if (req.body.sendMail) {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        let forgot = await Forgot.findOne({ email: req.body.email });
        if (forgot) {
          return res.status(403).json({
            error:
              "You have already applied for password reset. We will redirect you to that URL",
            link: `forgot?token=${forgot.token}`,
          });
        }
        let token = Math.floor(Math.random() * Date.now());
        forgot = new Forgot({
          email: req.body.email,
          token: token,
        });
        await forgot.save();
        let email =
          "We have entertained your request. Now we will be redirecting you to another page where you can fill out your new password. We recommend that you keep your password secure and not share it with anyone. If you fell your password has been compromised, you can change it by going to your My Account Page and change your password";
        return res.status(200).json({
          msg: email,
          link: `forgot?token=${token}`,
        });
      }
    } else {
      if (req.body.newPassword.length < 5) {
        return res.status(400).json({
          error: "The length of new password should be atleast 5 characters",
        });
      } else if (req.body.newPassword != req.body.confirmNewPassword) {
        return res
          .status(400)
          .json({ error: "Password should match with each other!" });
      } else {
        let token = req.body.token;
        let forgot = await Forgot.findOne({ token: token });
        if (!forgot || forgot.token !== token) {
          return res
            .status(500)
            .json({ error: "You don't have permission to access this page." });
        }
        let email = forgot.email;
        let newEncryptedPass = CryptoJS.AES.encrypt(
          JSON.stringify(req.body.newPassword),
          process.env.SECRETPASSWORDKEY
        ).toString();
        await User.findOneAndUpdate(
          { email: email },
          { password: newEncryptedPass }
        );
        await Forgot.findOneAndDelete({ token: token });
        return res.status(200).json({
          success:
            "Password updated successfully. Redirecting you to login page",
        });
      }
    }
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
