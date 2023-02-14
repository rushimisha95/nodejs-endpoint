import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import model from "../models/user.js";
import jwt from "jsonwebtoken";

export const handleSignup_simple = async (req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const result = await User.create({
      names: req.body.names,
      email: req.body.email,
      password: hashedPwd,
      token: "",
    });

    res.json({ message: "user registered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const handleLogin_simple = async (req, res) => {
  const token = jwt.sign(
    {
      userInfo: {
        names: req.body.names,
        email: req.body.email,
      },
    },
    process.env.JWT_SEKRET,
    { expiresIn: "1h" }
  );
  let foundUser = req.body;
  foundUser.token = token;
  let result = await foundUser.save();

  // Creates Secure Cookie with refresh token
  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  //   maxAge: 60 * 60 * 1000,
  // });

  return res.json({ message: "login successful", token: result.token });
};

export const handleLogout = async (req, res) => {
  const currentUser = await model.findOne({ email: req.body.email });

  if (!currentUser) return res.sendStatus(400);

  currentUser.token = "";
  const result = await currentUser.save();

  res.json({ message: "Logged out" });
};
export const getUsers = async (req, res) => {
  const users = await model.find();

  if (!users) return res.status(400).json({ message: "No users found" });

  res.json(users);
};
export default {
  getUsers,
  handleLogout,
  handleLogin_simple,
  handleSignup_simple,
};
