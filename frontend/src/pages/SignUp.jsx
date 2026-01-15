import React from 'react'
import { useState,useContext } from 'react';
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from 'axios'

const SignUp = () => {

const [showPassword,setShowPassword] = useState(false);
const navigate = useNavigate()

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [err,setErr] = useState("")
const [loading,setLoading] = useState(false)

const {serverUrl,userData,setUserData} = useContext(userDataContext)

const handleSignup = async(e) => {
  e.preventDefault();
  setErr("")
  // setName("")
  // setEmail("")
  // setPassword("")
  setLoading(true)
  console.log(name,email,password);
    try{

     let result = await axios.post(`${serverUrl}/api/auth/signup`,{
      name,email,password
     },{withCredentials:true}) 
  
    //  console.log(result.data);
    setUserData(result.data);
     setLoading(false);
     navigate("/customize")
    }
    catch(error){
  //  console.log(error);
  setUserData(null);
     setErr(error.response.data.message)
   setLoading(false)
    }
}

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:"url(https://media.istockphoto.com/id/1351965170/vector/artificial-intelligence-human-head-outline-futuristic-technology-and-engineering-concept.jpg?s=612x612&w=0&k=20&c=S-shF-ivAYHGSz0OuymPDvyVcyOtyZAdxGoToKuBltU=)"}}>

   <form onSubmit={handleSignup} className="w-[90%] h-[600px] max-w-[500px] bg-[#00000059] backdrop-blur shadow-lg shadow-black-950 flex flex-col justify-center items-center gap-[25px] px-[20px] ">

  <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Register to <span className='text-blue-600'>Virtual Assistant</span>
  </h1>

 <input className='w-full h-[55px] outline-none border-1 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' type="text" placeholder='Enter your Name' required onChange={(e) => setName(e.target.value)} value={name}/>

  <input className='w-full h-[55px] outline-none border-1 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' type="text" placeholder='Enter your Email' required onChange={(e) => setEmail(e.target.value)} value={email} />

<div className='w-full h-[55px] border-1 border-white bg-transparent text-white rounded-full text-[18px] relative'>
 <input className='w-full h-[55px] outline-none  bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' type={showPassword?"text":"password"} placeholder='Enter your Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
 {!showPassword && <IoMdEye className='absolute top-[16px] right-[20px] text-[22px] cursor-pointer' onClick={()=>setShowPassword(true)}/> }
 {showPassword && <IoIosEyeOff className='absolute top-[16px] right-[20px] text-[22px] cursor-pointer' onClick={()=>setShowPassword(false)}/> }
 
 </div>

{err && <p className='text-red-500 text-[18px]'>*{err}</p>}

<button className='w-[130px] h-[50px] bg-white  rounded-full text-[19px] font-semiboldm mt-[30px]' disabled={loading}>{loading?"Loading...":"Sign up"}</button>
<p className='text-white text-[18px] cursor-pointer'>Already have an account ? <span className='text-blue-500' onClick={() => navigate("/signin")}>Sign In</span></p>
   </form>


    </div>
  )
}

export default SignUp