import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/user.js"; // model/User.js
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
  email: req.body.email;
  // const token = jwt.sign(
  //   {
  //     userInfo: {
  //       //names: req.User.names,
  //       email: req.body.email,
  //     },
  //   },
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c, //process.env.JWT_SEKRET",
  //   { expiresIn: "1h" }
  //);
  let foundUser = req.body;
  // foundUser.token = token;
  let result = await foundUser.save();

  // Creates Secure Cookie with refresh token
  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  //   maxAge: 60 * 60 * 1000,
  // });
  return res.json({ message: "login successful" });
};

export const handleLogout = async (req, res) => {
  const currentUser = await User.findOne({ email: req.body.email });

  if (!currentUser) return res.sendStatus(400);

  currentUser.token = "";
  const result = await currentUser.save();

  res.json({ message: "Logged out" });
};
export const getUsers = async (req, res) => {
  const users = await User.find();

  if (!users) return res.status(400).json({ message: "No users found" });

  res.json(users);
};
export default {
  getUsers,
  handleLogout,
  handleLogin_simple,
  handleSignup_simple,
};
