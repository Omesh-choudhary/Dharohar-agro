import React, { useEffect, useRef, useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import '../components/App.css'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import useCountdown from '../components/CountDown'

function Register() {

  const navigate = useNavigate()
  const {secondsLeft , start}=useCountdown()
 const buttonref = useRef()
  const [user, setuser] = useState({
    username:"",
    email:"",
    password:"",
    Verificationcode:""
  })

  useEffect(() => {
  if(secondsLeft != 0){
    buttonref.current.disabled = true
    console.log(buttonref.current.disabled)
  }
  else{
    buttonref.current.disabled = false
    console.log(buttonref.current.disabled)
  }
   
  }, [secondsLeft])
  
  const {StoreTokenInLs}=useAuth()

  const handleChange = (e)=>{
 const name = e.target.name;
 const value = e.target.value;
 setuser({
  ...user,
  [name]:value
 })
  }
 

 
   

  const verificationCode =async(e)=>{
    if(user.email==""){
      toast.error("Email is required")
      return
    }
   
    e.preventDefault()
    
   
  start(60)

    try {
      const response = await fetch("http://localhost:5000/api/auth/verification",{
        method:"POST",
        headers :{
          "Content-Type":"application/json",
          
        },
        body:JSON.stringify(user)
      });
     
      
     } catch (error) {
       
      console.log("register",error);
      
     }


  }

  const handleSubmit = async(e)=>{
  e.preventDefault()
 
  
   try {
    const response = await fetch("http://localhost:5000/api/auth/register",{
      method:"POST",
      statusCode: 200,
      headers :{
        "Content-Type":"application/json",
        
        },
      body:JSON.stringify(user)
     });
     let res_data = await response.json()
     
     
     if(response.ok){
 
      StoreTokenInLs(res_data.token)
      navigate('/')
      toast.success(res_data.message)

     }else{
      toast.error(res_data.message)
     }

   } catch (error) {
     
    console.log("register",error);
    
   }
   
  
  
  }
  return (
    <main className='min-h-full w-full '>
    <div className="registration-div">
      <div className=" main registration-container h-[100vh] w-full absolute top-0 z-30 flex justify-center items-center "  >
       
        <div className="register-box bg-white/15 border-white border-2 rounded-xl backdrop-blur-sm pb-2 min-h-[30vh] mobile:w-[35vw] w-[80%] absolute z-10  flex flex-col items-center ">
        <h1 className='text-3xl text-center text-white mb-6'>Registration</h1>
        <div className=" flex gap-2 text-center mobile:w-[50%] w-[70%] rounded-full px-4 py-2 font-semibold bg-white my-4">
          <img src="google.png" alt="" />
          <h4>Sign Up with google</h4>
        </div>
        <div className=" flex gap-2 mobile:w-[50%] w-[70%] rounded-full px-4 py-2 font-semibold bg-white">
          <img src="facebook.png" alt="" />
          <h4>Sign Up with facebook</h4>
        </div>
        <div className="or flex flex-row  w-full items-center">
          <div className='h-[2px] w-[50%] bg-white'></div>
        <h4 className='font-semibold text-center my-4 text-white'>OR</h4>
        <div className='h-[2px] w-[50%] bg-white'></div>
        </div>
        <form onSubmit={handleSubmit} className='w-[70%]'  >
        
        <div className='flex flex-col m-2 '>
        <label className='text-white my-1' htmlFor="Username">Username</label>
        <input onChange={handleChange} spellCheck="false" className='rounded-full p-1 px-8 outline-none '  type="text" name='username' placeholder='Username' />
        </div>
        <div className='flex flex-col m-2 '>
        <label className='text-white my-1' htmlFor="Email">Email</label>
        <input onChange={handleChange} spellCheck="false" className='rounded-full p-1 px-8 outline-none'  type="email" name='email' placeholder='email' />
        </div>
        <div className='flex flex-col m-2 '>
        <label className='text-white my-1' htmlFor="Password">Password</label>
        <input onChange={handleChange} className='rounded-full p-1 px-8 outline-none' type="password" name='password' placeholder='password' />
        </div>
        <div className='flex flex-col m-2 '>
        <label className='text-white my-1' htmlFor="OTP">OTP</label>
        <div className="otp flex mobile:flex-row flex-col items-start gap-2 ">
        <input onChange={handleChange} value={user.Verificationcode} className='rounded-full w-[100%] py-1 px-6 outline-none' type="text" name='Verificationcode' placeholder='Verificationcode' />
       <div className="otp-button flex flex-col">
       <input onClick={verificationCode} disabled={false} ref={buttonref} className= {` rounded-md px-6 py-1  text-white font-semibold text-center cursor-pointer ${secondsLeft ==0?"bg-blue-700 active:bg-blue-600 active:scale-90":"bg-blue-500"} `} type="button" value="GET OTP" />
       <h3 className='text-white'>Resend in 00:{secondsLeft}</h3>
       </div>
        </div>

        </div>
       
        <div className='text-center'>
        <input className='mt-6 bg-blue-700 rounded-full px-8 py-2 text-white font-semibold text-center cursor-pointer active:bg-blue-600 active:scale-90 ' type="submit" value="Register Now" />

        </div>
          
        </form>
        <div className='flex mt-2 text-center'>
          <h4>Already have an Account ? </h4>
           <NavLink className="text-green-500 mx-1" to="/login">Login</NavLink>
        </div>
        </div>
        
      </div>
    </div>
    </main>
  )
}

export default Register
