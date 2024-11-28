import React, { useState } from 'react'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

function Contact() {
  const {user}=useAuth()
 
  
const [UserData, setUserData] = useState(true)
  const [message, setmessage] = useState({
    username:"",
    email:"",
    message:""
  })
  if(UserData && user){
    setmessage({
      username:user.username,
      email:user.email,
      message:""
    })
    setUserData(false)
  }
 


  const handleChange = (e)=>{
 const name = e.target.name;
 const value = e.target.value;
 setmessage({
  ...message,
  [name]:value
 }) 
  }

  const handleMessage = async(e)=>{
    e.preventDefault()
    console.log("message sent")
    try {
      const response = await fetch("https://dharohar-agro-server.onrender.com/api/form/contact",{
        method:"POST",
        headers :{
          "Content-Type":"application/json",
          
          },
        body:JSON.stringify(message)
       });
       let res_data = await response.json()
       console.log(res_data);
       
       if(response.ok){
   
        toast.success(res_data.message)
        setmessage({
          ...message,
          message:""
        })
  
       }else{
        toast.error(res_data.message)
       }
  
     } catch (error) {
       
      console.log("register",error);
      
     }}
  return (
    <main className='h-full '>
    <div className="registration-div">
      <div className=" main registration-container h-[100vh] w-full absolute top-0 z-20 flex justify-end px-6 items-center "  >
       
        <div className="register-box bg-white/35 border-white border-2 rounded-md backdrop-blur-sm pb-2 pl-4 min-h-[30vh] w-[45vw] absolute z-10  flex flex-col  ">
        <h1 className='text-5xl text-center text-white mb-6'>Contact Us</h1>
       
        <form onSubmit={handleMessage}  >
        
        <div className='flex flex-col m-2 '>
        <label className='text-white my-1' htmlFor="Username">Username</label>
        <input onChange={handleChange} spellCheck="false" className='rounded-lg p-1 px-8 outline-none w-[50%] 'value={message.username} required type="text" name='username' placeholder='Username' />
        </div>
        <div className='flex flex-col m-2 '>
        <label className='text-white my-1' htmlFor="Email">Email</label>
        <input onChange={handleChange} spellCheck="false" className='rounded-lg p-1 px-8 outline-none  w-[50%]' value={message.email} required type="email" name='email' placeholder='email' />
        </div>
        <div className='flex flex-col m-2 '>
        <label className='text-white my-1' htmlFor="Phone">Message :</label>
        <textarea className='w-[70%] h-28  outline-none resize-none p-2 rounded-md ' onChange={handleChange} value={message.message} name="message" id="" placeholder='Message'></textarea>
       
        </div>
       
        <div className='text-center'>
        <input className='mt-6 bg-blue-500 rounded-full px-8 py-2 text-white font-semibold text-center cursor-pointer focus:bg-blue-600 ' type="submit" value="Send" />

        </div>
          
        </form>
       
        </div>
        
      </div>
    </div>
    </main>
  )
}

export default Contact