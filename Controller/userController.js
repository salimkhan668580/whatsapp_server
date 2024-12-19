const UserModel = require('../Models/User');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const createTokenAndSaveCookie=require('../JWT/generateToken');
const signup=async(req,res)=>{

   try {
      const {username, password,email ,conformPassword} = req.body;

      const userfound=await UserModel.findOne({email});
      if(userfound){
         return res.status(400).json({message: 'email already exists'});
      }
      if(password !== conformPassword){
         return res.status(400).json({message: 'Passwords do not match'});
      }
      
      const hashpassword = await bcrypt.hash(password, 10);
      const user = new UserModel({username, hashpassword,email});
      await user.save();
      createTokenAndSaveCookie(user._id, res);
      res.status(201).json({message: 'User created successfully',user: {
         _id: user._id,
         username: user.username,
         email: user.email,
      }});
      
   } catch (error) {
      console.log(error);
   }

}

const login=async(req,res)=>{
   try {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email});
      if(!user){
         return res.status(404).json({message: 'User not found'});
      }
      const isMatch = await bcrypt.compare(password, user.hashpassword);
      if(!isMatch){
         return res.status(400).json({message: 'Invalid credentials'});
      }
      createTokenAndSaveCookie(user._id, res);
      res.json({message: 'Logged in successfully', user: {
         _id: user._id,
         username: user.username,
         email: user.email,
      }});

   } catch (error) {
      
   }

}

const logout=async(req,res)=>{
   try {
      res.clearCookie("jwt");
      res.status(201).json({ message: "User logged out successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
}

const allUsers = async (req, res) => {
 
   try {
     const loggedInUser = req.user._id;
     const filteredUsers = await User.find({
       _id: { $ne: loggedInUser },
     }).select("-password");
     res.status(201).json(filteredUsers);
   } catch (error) {
     console.log("Error in allUsers Controller: " + error);
   }
 };

module.exports={ signup, login ,logout, allUsers };