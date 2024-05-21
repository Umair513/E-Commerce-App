import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js"

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone number is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if(!answer){
      return res.send({message:"answer is required"})
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "user already existes",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();
    res.status(201).send({
      success: true,
      message: "user register success",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register controller",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
        role: user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res)  => {
  try {
    const {email, answer, newPassword} = req.body
    if(!email){
      res.status(400).send({message:"email is required"})
    }
    if(!answer){
      res.status(400).send({message:"answer is required"})
    }
    if(!newPassword){
      res.status(400).send({message:"password is required"})
    }
    
    const user = await userModel.findOne({email, answer})
    if(!user){
      return res.status(404).send({
        success: false,
        message:"wrong email or answer"
      })
    }

    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
      success: true,
      message:"password reset success"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message:"something went wrong",
      error
    })
  }
}
export const testController = (req, res) => {
  res.send("Protected Route");
};

export const updateProfileController = async (req, res)  => {
  try {
    const {name, email, password, adddress, phone} = req.body
    const user = await userModel.findById(req.user._id)
    if(password && password.length < 6){
        return res.json({error:"Password is required and 6 character long"})
    }
    const hashedPassword = password ? await hashPassword(password) : undefined
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
      name: name || user.name,
      password: hashPassword || user.password,
      phone: phone || user.phone,
      address: adddress || user.address
    }, {new: true})
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success: false,
      message:"Error while update profile",
      error
    })
  }
}

export const getOrdersController = async  (req, res) => {
  try {
    const orders = await orderModel.find({buyer: req.user._id}).populate("products", "-photo").populate("buyer", "name")
    res.json(orders)   
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "error while getting orders",
      error
    })
  }
}