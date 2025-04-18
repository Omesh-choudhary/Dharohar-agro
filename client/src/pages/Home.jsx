import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../store/auth'
import '../components/App.css'
import { toast } from 'react-toastify'
import video from "./video/background.mp4"

const Home = () => {

 
  const [data, setdata] = useState({
    Date:"",
    Product:"",
    Income:"",
    Expense:""
  })

  
  const handleChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setdata({
     ...data,
     [name]:value
    })
     }

     const handleSubmit =async(e)=>{
     e.preventDefault()
    let token = localStorage.getItem("token")
   
     let response = await fetch (`https://dharohar-agro-server.onrender.com/api/create/data`,{

      method:"post",
      headers:{
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
     })
    
     
     if(response.ok){
      setdata({
        Date:"",
        Product:"",
        Income:"",
        Expense:""
      })
      toast.success("Created Successfully")
     }
     

     }
     const {user}=useAuth()
     const {userAuthentication}=useAuth()
     useEffect(()=>{
      userAuthentication()
    },[])
   
     
     

  return (
    <main className='h-full w-full  absolute z-0 top-0'> 
    
    <div className=' absolute z-20 text-white top-20 left-6'>
      <div className="profile-div flex gap-2 items-center">
        <div className=" profile circle h-10 w-10 rounded-full overflow-hidden">
         
        </div>
        <div className="profile-name">
          <h1>Hi! {user.username}</h1>
        </div>
      </div>
    </div>
    <div className=' h-[100vh] w-full absolute flex justify-center items-center '>
    <video className='h-full w-full object-cover absolute z-0' autoPlay muted loop>
      <source src={video} type='video/mp4' />
    </video>
    
    <div className="form  min-h-[54vh] mobile:w-[50vw] w-[80%] pb-2 tablet:w-[70%] laptop:w-[40%] bg-white/15 backdrop-blur-sm  border-white border-2 rounded-xl">
      <h1 className='text-center text-5xl text-white pb-4 font-sans'>DHAROHAR AGRO</h1>
      <form className='h-full flex flex-col items-center justify-center gap-4' onSubmit={handleSubmit} >
       <div className='flex flex-col gap-2 text-white text-2xl'>
       <label htmlFor="Date">Date :</label>
       <input className='text-gray-700 rounded-md text-lg px-8' required onChange={handleChange} value={data.Date} type="date" name="Date" id="" />
       </div>
       <div className='flex flex-col gap-2 text-white  text-2xl'>
       <label htmlFor="Date">Product : </label>
       <input className='text-gray-700 rounded-md text-lg outline-none px-2'required value={data.Product} onChange={handleChange} spellCheck="false" type="text" name="Product" id="" />
       </div>
       <div className='flex flex-col gap-2 text-white  text-2xl'>
       <label htmlFor="Date">Expense :</label>
       <input className='text-gray-700 rounded-md text-lg outline-none px-2'required value={data.Expense} onChange={handleChange}  type="number" name="Expense" id="" />
       </div>
       <div className='flex flex-col gap-2 text-white  text-2xl'>
       <label htmlFor="Date">Income :</label>
       <input className='text-gray-700 rounded-md text-lg outline-none px-2'required value={data.Income} onChange={handleChange}  inputMode='numeric' type="number" name="Income" id="" />
       </div>
       <div>
        <button className='px-4 py-2 bg-blue-700 text-white font-semibold active:bg-blue-400'>Create</button>
       </div>
      </form>
    </div>
   
    </div>
    </main>
  )
}

export default Home
