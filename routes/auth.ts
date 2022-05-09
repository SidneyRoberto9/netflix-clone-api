import * as jwt from "jsonwebtoken";
import User from "../models/User";
import CryptoJS from "crypto-js";
import { Router } from "express";

const AuthRouter = Router();

//REGISTER
AuthRouter.post("/register", async (req: any, res: any) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username: username,
    email: email,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
    profilePic:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

//LOGIN
AuthRouter.post("/login", async (req: any, res: any) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("Wrong password or username!");
    }

    const { password, ...info } = JSON.parse(JSON.stringify(user));
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== req.body.password) {
      return res.status(401).json("Incorrect password");
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "365d" }
    );

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default AuthRouter;
