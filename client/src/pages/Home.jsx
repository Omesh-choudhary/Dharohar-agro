import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../store/auth'
import '../components/App.css'
import { toast } from 'react-toastify'
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
    })
   
     
     

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
      <video className='w-full h-full absolute z-0 object-cover' autoPlay muted loop src="https://rr2---sn-n2pqxgapo3-w5pe.googlevideo.com/videoplayback?expire=1732887352&ei=2G5JZ8HGNfeI6dsPj6yrwA8&ip=89.38.41.44&id=o-AN6ElxzN1vwFbqLjhmNfmxuscSKdwbS_2djOYLv9xyg8&itag=399&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399%2C779%2C780&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AQn3pFRTsfZZbrPfMEca_DwiELTZYipVjqh_NCaD2VV4wCPTvLhel9ITwQQscw-UKzKb0Thxj2KO61e-&spc=qtApAfl1Z_TyykwZmBTwUJlN_GkY1hkFBzCvtbtE5mpYlb-GUw&vprv=1&svpuc=1&mime=video%2Fmp4&ns=h7TPisQIz9nK_EMlQXH-Yc0Q&rqh=1&gir=yes&clen=1108324&dur=19.320&lmt=1731706175133411&keepalive=yes&fexp=24350590,24350655,24350675,24350705,24350737,51326932,51335594,51347747&c=WEB&sefc=1&txp=453C434&n=foCnA6UhZMW0DA&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgYG916MEF031GiDYsuJinUO-HnGr54gIy0OnPoV8UNMwCIDejW4KW7gvOMZGFAqzF-0vgKFMlLNYn8qwClQVV_qQX&title=BE%206e%20%26%20XEV%209e%20_%20The%20Next%20Indian%20Icons%20_%20Unveiling%20at%20Unlimit%20India%20on%2026th%20Nov.mp4&redirect_counter=1&rm=sn-4g5e6r7z&rrc=104&req_id=dab778f4db9da3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1732867476,&mh=Sb&mip=103.157.169.127&mm=31&mn=sn-n2pqxgapo3-w5pe&ms=au&mt=1732865970&mv=u&mvi=2&pl=25&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIgXhv1Ako1EQmjc7iCpXKBKflp0y9M3WrNxVhWBWM-fnYCIQCCRBRAQWI1ui_WPnYC3i4Ht2goextObymuRKud-BVmOg%3D%3D"></video>

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
