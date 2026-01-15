import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { userDataContext } from '../context/userContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

const Customize2 = () => {

    const {userData,backendImage,selectedImage,serverUrl,setUserData} = useContext(userDataContext);
const [assistantName,setAssistantName] = useState(userData?.assistantName || "")

const navigate = useNavigate()

const [loading,setLoading] = useState(false)

const handleUpdateAssistant = async() => {
    setLoading(true)
    try{
        let formData = new FormData();
        formData.append("assistantName",assistantName);

        if(backendImage){
              formData.append("assistantImage",backendImage);
        }else{
            formData.append("imageUrl",selectedImage)
        }
const result = await axios.post(`${serverUrl}/api/user/update`, formData,{withCredentials:true});
console.log(result.data);
setLoading(false)
setUserData(result.data);
navigate("/")
    }
    catch(error){
        setLoading(false)
console.log(error);
    }

}


  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center  items-center flex-col gap-[20px]">
<IoMdArrowRoundBack onClick={() => navigate("/customize")} className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer '/>
       <h1 className='text-white text-[30px] text-center '>Enter Your <span className='text-blue-300'>Assistant Name</span></h1>

        <input className='w-full max-w-[600px] h-[55px] outline-none border-1 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' type="text" placeholder='eg. sofia' required onChange={(e)=>setAssistantName(e.target.value)} value ={assistantName} />
{assistantName &&
<button onClick={()=>{
    handleUpdateAssistant()
    
}} className='min-w-[300px] h-[50px] bg-white  rounded-full text-[19px] font-semiboldm mt-[30px] cursor-pointer' disabled= {loading} >{!loading?"Finally Create Your Assistant":"Loading"}</button>}
    </div>
  )
}

export default Customize2