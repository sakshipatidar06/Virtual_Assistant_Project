import React from 'react'
import Card from '../components/Card'
import sofia from '../assets/sofia.png'
import robot from '../assets/robot.png'
import { LuImagePlus } from "react-icons/lu";
import { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const Customize = () => {

const {serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage} = useContext(userDataContext)

const navigate = useNavigate()

const inputImage = useRef();
const handleImage = (e) => {
    console.log(e.target.files);
const file = e.target.files[0];
setBackendImage(file);
setFrontendImage(URL.createObjectURL(file));

}

    return (
        <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center  items-center flex-col gap-[20px]">

<IoMdArrowRoundBack onClick={() => navigate("/")} className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer '/>

         <h1 className='text-white text-[30px] text-center '>Select Your <span className='text-blue-300'>Assistant Image</span></h1>

            <div className='w-[90%] max-w-[900px] flex justify-center flex-wrap items-center gap-[15px]'>
                <Card image={sofia} />
                <Card image={robot} />
                <Card image={sofia} />
                <Card image={sofia} />
                <Card image={sofia} />
                <Card image={sofia} />
                <Card image={sofia} />

           <div className={` w-[80px] h-[140px] lg:w-[150px] lg:h-[200px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex items-center justify-center ${selectedImage == "input"?"border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={()=>{
             inputImage.current.click()
             setSelectedImage("input") }}>
            {!frontendImage &&  <LuImagePlus className='text-white w-[25px] h-[25px] ' /> }
         {frontendImage && <img src={frontendImage} className='h-full object-cover'/>}
    </div>
    <input type="file" accept="image/*" hidden ref={inputImage} onChange={handleImage} />
     </div>
    {selectedImage && <button onClick={()=>navigate("/customize2")} className='w-[130px] h-[50px] bg-white  rounded-full text-[19px] font-semiboldm mt-[30px]'>Next</button>}
        </div>
    )
}

export default Customize