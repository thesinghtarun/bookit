const mongoose=require('mongoose')
const USER = require('../model/user.model')
const chalk=require('chalk')
const EXPERIENCE = require('../model/experience.model')
const BOOKEXPERIENCE = require('../model/book_experience.model')

//new user registration
//bcrypt remaining............................................................................................................................................
const user=async (req,res)=>{
   try {
     const {name,email,password}=req.body
    if(!name || !email ||!password){
        return res.status(400).json({msg:"All fields required"})
    }
    const newUser=new USER({name,email,password})
    const data=await newUser.save()
    res.status(200).json({msg:"User added successfully",data})
    console.log(`Received data: ${name} ${email} ${password}`);
    
   } catch (error) {
    console.log(chalk.red(`Error................${error}`))
    res.status(500).json({msg:"Server error",error:error})
   }
}

//existing user login
const login=async (req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({msg:"All fields required"})
        }
        const existingUser=await USER.findOne({email})
        if(!existingUser){
            return res.status(404).json({msg:"User not found"})
        }
        if(password!=existingUser.password){
            return res.status(401).json({msg:"Invalid password"})
        }
        res.status(200).json({msg:"Logged in successfully",data:existingUser})
    } catch (error) {
        res.status(500).json({msg:"Server Unavailable",error:error})
    }
}

//to search experiences
const searchExperiences=async (req,res)=>{
    try {
        const {name}=req.body
        if(!name){
            return res.status(400).json({msg:"Enter a experience to search"})
        }
        const data=await EXPERIENCE.aggregate([{$match:{name: { $regex: name, $options: "i" }}}])
        if(!data){
            return res.status(404).json({msg:"No experience found"})
        }
        console.log(data.map(d=>d.name));
        
        res.status(200).json({msg:"Experience found",data})
    } catch (error) {
        res.status(500).json({msg:"Server Unavailable",error:error})
    }
}

//get all experiences
const experiences= async(req,res)=>{
    try {
        const data=await EXPERIENCE.find()
        if(!data){
            return res.status(404).json({msg:"No experiences available"})
        }
        res.status(200).json({msg:"Available experiences",data})

    } catch (error) {
        res.status(500).json({msg:"Server unavailable",error})
    }
}

//get experience details
const experienceDetails=async(req,res)=>{
    try {
        const {id}=req.params
         const experience = await EXPERIENCE.findById(id);
    if (!experience) return res.status(404).json({ msg: "Experience not found" });
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
}

//save information
const bookExperience=async(req,res)=>{
    try {
        const {email,name,selectedTime,selectedDate,location}=req.body
        if(!email || !name || !selectedTime || !selectedDate ||!location){
            return res.status(404).json({msg:"No data found"})
        }
        const data=await BOOKEXPERIENCE({email,name,selectedTime,selectedDate,location})
        data.save()
        res.status(200).json({msg:"Booking done",data})
    } catch (error) {
        res.status(500).json({msg:"Ser unavailable",error})
    }
}

module.exports={user,login,searchExperiences,experiences,experienceDetails,bookExperience}