import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Register from './FCRegister/Register.jsx'
import Login from './FCLogin/Login.jsx'
import Profile from './FCProfile/Profile.jsx'
import EditDetails from './FCEdit/EditDetails.jsx'
import SystemAdmin from './FCAdmin/SystemAdmin.jsx'


function App() {

  return (
    <>
    <Register />
    <Login />
    <Profile />
    <EditDetails />
  <SystemAdmin />

   
  
 
    </>
  )
}

export default App
