const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../db");
const { Admin } = require("../db");
const router=express.Router();

dotenv.config(); //load environment variables

router.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  if(!name||!email || !password|| !phone){
    return res.status(400).json({msg:'Missing Inputs'});
  }
  //check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "User already exists in database" });
  }
  try {
    //create a new user
    const newuser = await User.create({
      name,
      email,
      password,
      phone,
    });
    //create token
    const userId = newuser._id;
    const token = await jwt.sign({ userId }, process.env.JWT_KEY);

    //return user token
    res.status(200).json({ token: token });
  } catch (e) {
    console.log('inside catch');
    console.log("error while creating user");
    return res.status(400).json({ msg: "error while creating user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({msg:'Email and Password are required'});
  }
  try {
    const isValidUser = await User.findOne({ email, password });
    if (!isValidUser) {
      return res.status(400).json({ msg: "Invalid Crudentials" });
    }
    const userId = isValidUser._id;
    const token = await jwt.sign({ userId }, process.env.JWT_KEY);
    res.status(200).json({ token: token });
  } catch (e) {
    console.log("error while logging in");
    return res.status(400).json({ msg: e });
  }
});

router.post("/Adminlogin", async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({msg:'Email and Password are required'});
  }
  try {
    const isValidAdmin = await Admin.findOne({ email, password });
    if (!isValidAdmin) {
      return res.status(400).json({ msg: "Invalid Crudentials" });
    }
    const AdminId = isValidAdmin._id;
    const token = await jwt.sign({ AdminId }, process.env.JWT_KEY);
    res.status(200).json({ token: token });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e });
  }
});

module.exports = router;
