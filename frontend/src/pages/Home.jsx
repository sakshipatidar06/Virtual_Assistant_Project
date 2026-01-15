import React, { useContext, useEffect, useRef,useState } from 'react'
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  // const serverUrl = "http://localhost:5000"

  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)
  const navigate = useNavigate()

  //!optimizing
  const [listening,setListening] =  useState(false)
  const isSpeaking = useRef(false)
  const recognitionRef = useRef(null)

     const isRecognizingRef = useRef(false)


  // const synth =  window.speechSynthesis
  //!

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      setUserData(null)
      navigate("/signin")

    }

    catch (error) {
      setUserData(null)
      console.log(error);
    }
  }



  //speak

  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text)

    isSpeaking.current = true;
    utterence.onend = () => {
   isSpeaking.current = false;
   recognitionRef.current?.start();
    }

      window.speechSynthesis.speak(utterence)
  }


  //search on google

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
speak(response)

    if (type === 'google_search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }

    if (type === 'youtube_search' || type === 'youtube_play') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }

    if (type === 'calculator_open') {

      window.open(`https://www.google.com/search?q=calculator`, '_blank');
    }


    if (type === 'whatsapp_open') {
      window.open('https://web.whatsapp.com', '_blank');
    }


    if (type === 'instagram_open') {
    window.open('https://www.instagram.com', '_blank');
}


if (type === 'facebook_open') {
    window.open('https://www.facebook.com', '_blank');
}

if (type === 'weather_show') {
    window.open('https://www.google.com/search?q=weather', '_blank');
}

  }


  //speech Recognition



  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'en-US'


//***************************************/


    recognitionRef.current = recognition
    //  const isRecognizingRef = {current:false}

    const safeRecognition = () => {
      if(!isSpeaking.current && !isRecognizingRef.current){
     
        try{
 
        recognition.start()
        console.log("Recognition requested to start");
      }
      
      catch(error){
        if(error.name !== "InvalidStateError"){
          console.error("Start error:" ,error);
        }
      }
    }
     
    }

    recognition.onstart = () => {
      console.log("Recognition started");
      isRecognizingRef.current = true;
      setListening(true)
    };


     recognition.onend = () => {
      console.log("Recognition ended");
      isRecognizingRef.current = false;
      setListening(false)

       if(!isSpeaking.current){
      setTimeout(() => {
        safeRecognition()
      },1000);
    }
    };


    recognition.onerror = (event) => {

 if (event.error !== 'no-speech') {
        console.warn('Recognition error:', event.error)
      }
isRecognizingRef.current = false;
setListening(false)

if(event.error !== "aborted" && !isSpeaking.current){
  setTimeout (() => {
    safeRecognition();
  },1000)
}
    };


    recognition.onresult = async (e) => {
      console.log(e);
      const transcript = e.results[e.results.length - 1][0].transcript.trim()
      console.log(transcript);
    
   
      //   if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
      // const data =  await getGeminiResponse(transcript)
      // console.log(data);
      // }
      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {

        recognition.stop();
      isRecognizingRef.current = false;
      setListening(false)

        const data = await getGeminiResponse(transcript);  // pass needed data explicitly
        console.log(data);
       handleCommand(data)
      }
    }
    //! recognition.start()

    const fallBack = setInterval(()=>{
       if(!isSpeaking.current && !isRecognizingRef.current){
        safeRecognition();
       }
    },10000)

safeRecognition()

    return () => {
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
      clearInterval(fallBack)
    }
  }, [])

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center  items-center flex-col gap-[20px] ">

      <button onClick={handleLogout} className='w-[130px] h-[50px] bg-white  rounded-full text-[19px] font-semibold mt-[30px] absolute top-[20px] right-[20px] px-[20px] py-[10px]'>Log Out </button>

      <button onClick={() => navigate("/customize")} className='min-w-[150px] h-[50px] bg-white  rounded-full text-[19px] font-semibold mt-[30px] top-[100px] right-[20px] absolute px-[20px] py-[10px]'>Customize your Assistant </button>

      <div className='w-[250px] h-[300px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
        <img className='h-full object-cover ' src={userData?.assistantImage} alt="" />
      </div>
      <h1 className='text-white text-[18px] font-semibold'>I'm {userData.assistantName}</h1>
    </div>
  )
}

export default Home

