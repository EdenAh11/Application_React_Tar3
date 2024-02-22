import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Register from './FCRegister/Register.jsx'
import Login from './FCLogin/Login.jsx'
import Profile from './FCProfile/Profile.jsx'
import EditDetails from './FCEdit/EditDetails.jsx'
import SystemAdmin from './FCAdmin/SystemAdmin.jsx'



function App() {

 const [user, setUser] = useState("");
 const [users,setUsers] = useState(localStorage.length == 0 ? "" :JSON.parse(localStorage["users"]));
 const [session,setSession] = useState(sessionStorage.length == 0 ? "" :JSON.parse(sessionStorage["user"]));
 const [admin, setAdmin] = useState("");
 const [adminU, setAdminU] = useState('Admin');
 const [adminP, setAdminP] = useState('Ad1234321ad#');
 const [edit, setEdit] = useState("");
 const [sign, setSign] = useState("");
 const [profileS, setprofileS] = useState("");


 
  useEffect(() => {
    setUsers(localStorage.length == 0 ? "" :JSON.parse(localStorage["users"]));
    setSession(sessionStorage.length == 0 ? "" :JSON.parse(sessionStorage["user"]));
  },[])
  
  //מקבל איזה כפתור לחצו הרשמה/כניסה 
  const getSign = (sign) =>{
    setSign(sign);
    setprofileS("להתנתק");
  }

//מקבל את המשתמש שנכנס למערכת
   const getUser = (data) =>{
    setUser(data);
    setSession(data);
    if(data.username == adminU && data.password == adminP){
      setAdmin("yes");
    }
    else{
      setAdmin("no");
    }
  }

  //מקבל את המשתמש לעריכה
  const get2Edit = (editUser) => {
    setEdit(editUser);
    setprofileS("עדכון");
  }

  //קבלת משתמש לעריכה
  const eProfile = (p) => {
   setEdit(p);
   setprofileS("עדכון");
  }

  //התנתקות מהפרופיל
  const logOut = (out) => {
    setSession("");
    setprofileS("להתנתק")
  }

  //קבלת משתמש לאחר עריכה
  const getEdit = (gEdit) => {
    if(admin == "yes") {
    setEdit(gEdit);
    }
    else{
      setUser(gEdit)
    }
    setprofileS("להתנתק");
  }

  //קבלת לוקאל לאחר העריכה
  const getLocal = (local) => {
    setUsers(local);
  }

//מערך לאחר מחיקת משתמש
  const deleteU = (d) => {
    setUsers(d);
  }

  const getRegister = (r) => {
    setUsers(r);
  }
 

  return (
    <>
    <Login sendUser = {getUser} sendSign = {getSign} users = {users} />

    {sign == "sign-Up" ? <Register sendRegister = {getRegister}/> : ""}

    { session == "" ? <div><p>יש להיכנס למערכת </p></div> : "" }

    {sign == "login" && admin == "yes" ?
            <SystemAdmin users = {users} send2Edit = {get2Edit} deleteUser = {deleteU}/> : ""}

    {session != "" && sign == "login" && admin == "no" ?
            <Profile user = {user} editProfile = {eProfile} logOutProfile = {logOut} /> : "" }
 
    {profileS == "עדכון" ? <EditDetails user = {edit} sendEdit={getEdit} sendLocal = {getLocal} /> : ""}


    
    
    
   
  
 
    </>
  )
}

export default App
