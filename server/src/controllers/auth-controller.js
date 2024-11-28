import User from "../models/user.model.js"
import nodemailer from "nodemailer"
import { Verification_Email_Template } from "../utils/email-verify-temp.js"
  

let code
 async function register (req,res,next){
  
   const {username,email,password, Verificationcode   } = req.body
   
   let usernameExist = await User.findOne({username})
   let ExistUser = await User.findOne({email})


   if(ExistUser){
      const status = 401 ;
      const message = "User already registered"
      const error = {
         status,
         message
      }
      next(error)
     // res.status(401).json({msg:"User already registered"})
   }

   else if(usernameExist){
      const status = 401;
      const message = "Username should be unique"
      let error ={
         status ,
         message
      }
     // res.status(401).json({msg:"username should be unique"})
      next(error)
      
   }

   if(Verificationcode != code){
      const status = 401;
      const message = "Incorrect OTP"
      let error ={
         status ,
         message
      }

      next(error)
   }

   try {

    let createdUser = await User.create({
         username,
         email,
         password
      })
      res.status(200).json(
         { message:"Registration successful",
           token:await createdUser.generateToken(),
           userId:createdUser._id.toString()
      })
      
   
   } catch (err) {
      console.log(err)
      let error ={
         status : 505,
         message : "Internal server error"
      }
      next(error)
     // res.status(501).json({msg:"Internal server error"})
   }
  
}


async function login (req,res){

   
 
   const {email,password} = req.body

   

   try {
    let existUSER = await User.findOne({email})
   
    
    
    if(existUSER){
      let isPasswordCorrect = await existUSER.isPasswordCorrect(password)

    if(isPasswordCorrect){
      res.status(201).json({
         message:"login successfully",
         token:await existUSER.generateToken(),
         userId:existUSER._id.toString()
      })
    }
    else{
      res.status(401).json({message:"Invalid credentials"})
      
    }
    }
    else{
      res.status(401).json({message:"Invalid credentials"})
    }

    
   } catch (error) {
      console.error(error)
   }
}

const UserData = async(req,res,next)=>{
  
   try {
      const UserData = req.user
      
      res.status(201).json({UserData})
   } catch (error) {
      console.error(`error from user route ${error}`)
   }

}
  
const verificationCode = async(req,res)=>{
   code=Math.ceil(1000+Math.random()*9000)
 
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "ghanshyamjat9929@gmail.com",
        pass: "umcw ynsj fyuz hwby",
      },
    });
const email = req.body.email


const info = await transporter.sendMail({
   from: '"DHAROHAR AGRO" <ghanshyamjat9929@gmail.com>', // sender address
   to:`${email}` , // list of receivers
   subject: "Verification Email", // Subject line
   text: "Verification Email", // plain text body
   html: Verification_Email_Template.replace("{verificationCode}",code), // html body
 });
 console.log("Message sent: %s", info.messageId);

}

export {register,login,UserData,verificationCode}