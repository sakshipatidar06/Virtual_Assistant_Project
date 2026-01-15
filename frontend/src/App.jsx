import React from 'react'
import  {Routes,Route, Navigate} from 'react-router-dom'
import './App.css'
import Signin from './pages/signin.jsx'
import SignUp from './pages/SignUp.jsx'
import Customize from './pages/customize.jsx'
import { useContext } from 'react'
import { userDataContext } from './context/userContext.jsx'
import Home from './pages/Home.jsx'
import Customize2 from './pages/Customize2.jsx'



function App() {

const {userData,setUserData} = useContext(userDataContext);
 

  return (

   <Routes>
     <Route path="/" element={(userData?.assistantImage && userData?.assistantName)?<Home/>:<Navigate to ={"/customize"}/>}/>
    <Route path="/signup" element={!userData?<SignUp/>:<Navigate to ={"/"}/>}/>
      <Route path="/signin" element={!userData?<Signin/>:<Navigate to ={"/"}/>}/>
       <Route path="/customize" element={userData?<Customize/>:<Navigate to ={"/signup"}/>}/>
       <Route path="/customize2" element={userData?<Customize2/>:<Navigate to ={"/signin"}/>}/>
   </Routes>
    
  )
}

export default App
