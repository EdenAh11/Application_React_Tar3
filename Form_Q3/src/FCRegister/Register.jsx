import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { FormHelperText, InputLabel } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import Swal from 'sweetalert2'


export default function Form(props) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [counter, setCounter] = React.useState(0); //to know when register user
    const [users, setUsers] = React.useState([]);
    const [user,setUser] = React.useState({
                                username:"",
                                password:"",
                                cpassword:"",
                                file:"",
                                first:""
                                ,last:"",
                                email:"",
                                date:"",
                                city:"",
                                street:"",
                                number:"",
                              });
      //REF כדי לנקות ולכוון את המשתמש על התאים בטופס
    const [refUser, setRefUser] = React.useState({
                                username: React.createRef(), 
                                password:React.createRef(),
                                cpassword:React.createRef(),
                                file:React.createRef(),
                                first:React.createRef(),
                                last:React.createRef(),
                                email:React.createRef(),
                                date:React.createRef(),
                                city:React.createRef(),
                                street:React.createRef(),
                                number:React.createRef(),
                              });
                             
              //פונקציות של הצגת סיסמא              
    function handleClickShowPassword() {     //show Password
        return setShowPassword((show) => !show);
    }
  
    const handleMouseDownPassword = (event) => {  //hide password
      event.preventDefault();
    
    }

    function loadUsers(){
      let usersJSON = localStorage.getItem("users");
      if (!usersJSON) {
        return [];
      }
      let usersJS = JSON.parse(usersJSON);
      return usersJS;
    }
    
    React.useEffect(() => {
      let loadUsers2 =  loadUsers();
      setUsers(loadUsers2);
    },[])

    //בודק האם המשתמש עבר את תנאי הטופס ומעדכן את הלוקאל
    React.useEffect(() => {
      if(counter == 1)
      {
      localStorage.setItem("users",JSON.stringify(users));
      props.sendRegister(users);
      }
    },[users])
    

   function registerUser(){
     if(validation())
     {
      setUser(user);
      setUsers([...users,user]);
      setCounter(1);
      clearForm();
      Swal.fire({
        title: "Good job!",
        text: "Add User Succeeded!",
        icon: "success"
      });
     }
     else
     {
      validation();
     }
      
   } 

   //בדיקות של הטופס
   const userValidation = () => {
    let pUsername = /^[\da-zA-Z!@#$%^&*()_+[\]{};:<>,.?~\`|-]+$/;
    let u = user.username;
    return(u.match(pUsername)?true:false);
  }
  const passValidation = () => {
    let pPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\{};:<>,.?~\\`|+$]).{7,12}$/;
    let p = user.password;
    return(p.match(pPassword)?true:false);
  }
  const cpassValidation = () => {
    return (user.cpassword == user.password ? true : false);
  }
  const emailValidation = () => {
    let pEmail = /^[a-zA-Z0-9!#$%^&*()_+[\]{};:<>,.?~\\`|-]+[@]{1}[a-zA-Z]+.com$/;
    let e = user.email;
    return(e.match(pEmail)?true:false);
  }

const dateValidation = () => {
  let date = new Date(user.date)
  let currentDate = new Date()
  let age = currentDate.getFullYear() - date.getFullYear()
    if(age < 18 || age >120){
    alert("age must be younger than 120 and older than 18");
    return false;
  }
  return true;
}

const streetValidation = () => {
  let pStreet = '^[א-ת]+$';
  let s = user.street;
  return(s.match(pStreet)?true:false);

}

const firstValidation = () => {
  let pFirst = '^[a-zA-Z]+$';
  let f = user.first;
  return(f.match(pFirst)?true:false);
}

const lastValidation = () => {
  let pLast = '^[a-zA-Z]+$';
  let l = user.last;
  return(l.match(pLast)?true:false);
}

const streetNumValidation = () => {
  let num = user.number;
  if(num <= 0){
    alert("street num must be bigger than 0");
    return false;
  }
    return true;
}

  //פונקציה כוללת של הבדיקות
   function validation(){ 
      if (!userValidation()) {
        refUser.username.current.value = "";
        refUser.username.current.focus();
        return false;
      } else if (!passValidation()) {
        refUser.password.current.value = "";
        refUser.password.current.focus();
        return false;
      } else if (!cpassValidation()) {
        refUser.cpassword.current.value = "";
        refUser.cpassword.current.focus();
        return false;
      } else if (!emailValidation()) {
        refUser.email.current.value = "";
        refUser.email.current.focus();
        return false;
      } else if (!dateValidation()) {
        refUser.date.current.focus();
        return false;
      } else if (!streetValidation()) {
        refUser.street.current.value = "";
        refUser.street.current.focus();
        return false;
      } else if (!firstValidation()) {
        refUser.first.current.value = "";
        refUser.first.current.focus();
        return false;
      } else if (!lastValidation()) {
        refUser.last.current.value = "";
        refUser.last.current.focus();
        return false;
      } else if(!streetNumValidation()){
        refUser.number.current.focus();
        return false;
      }
      else{
        return true;
      }
   }

   //נקיון הטופס
   function clearForm(){
    refUser.username.current.value = "";
    refUser.password.current.value = "";
    refUser.cpassword.current.value = "";
    refUser.file.current.value = "";
    refUser.first.current.value = "";
    refUser.last.current.value = "";
    refUser.date.current.value = "";
    refUser.email.current.value = "";
    refUser.street.current.value = "";
    refUser.city.current.value = "";
   };
  return (
 <>
 <form onSubmit={(e) => { e.preventDefault(); registerUser() }} style={{ border: "5px outset #F8F8FF",width:"400px"}} >
     <div className='container'>
      <h3><u>Register Form</u></h3> <br/>
      <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
      <TextField
      required
        id="username"
        inputRef={refUser.username}
        onChange={(e) =>{setUser({...user,username:e.target.value});userValidation();}}
        inputProps={{
          maxLength: 60,
        }}
        label="Required"
        placeholder='Username'
        error = {!userValidation()}
        helperText = {!userValidation() ? "Username Must Be A-Z,a-z,0-9" : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
          
        }}
        variant="outlined"
      />
      </FormControl><br />
       
        <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined" error = {!passValidation()}  >
          
        <InputLabel required >Required</InputLabel>
          <OutlinedInput
            placeholder="password"
            onChange={(e) =>{setUser({...user,password:e.target.value,}); passValidation()}}
            id="password"
            inputRef={refUser.password}
            type={showPassword ? 'text' : 'password'}
            
            startAdornment = {<InputAdornment position='start'> 
            
                <LockIcon />
            </InputAdornment>

            }
            endAdornment={
              <InputAdornment htmlFor="outlined-adornment-password" position="end">
                 
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
           
            label="Password"
          
          />
           {passValidation() ? null : <FormHelperText>Password Must Be [A-Z,0-9] and Special Char</FormHelperText>}
        </FormControl><br />
        <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined" error = {!cpassValidation()}>
        <InputLabel required >Required</InputLabel>
          <OutlinedInput
            placeholder="check password"
         
            onChange={(e) =>{setUser({...user,cpassword:e.target.value,});cpassValidation()}}
            id="password1"
            inputRef={refUser.cpassword}
            type={showPassword ? 'text' : 'password'}
            startAdornment = {<InputAdornment position='start'> 
                <LockIcon />
            </InputAdornment>

            }
            endAdornment={
              <InputAdornment htmlFor="outlined-adornment-password" position="end">
                 
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
       
            label="Password"
          />
         {cpassValidation() ? null : <FormHelperText>Check Password Must Be equal to Password </FormHelperText>}
        </FormControl> <br />
        <FormControl sx={{ m: 1.5, width: '35ch', flexDirection: 'row', alignItems: 'center' }} variant="outlined">
        
        <label style={{textAlign:'center',marginRight: '15px',marginLeft:'25px' }} for="UploadFile">Upload_File: </label>
        <input required type="file"ref={refUser.file} name='UploadFile' accept=".jpg, .jpeg" style={{ display: 'block' }} onChange={(e) =>{setUser({...user,file:e.target.files[0]})}} />
        
        </FormControl> <br />
        <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
        <TextField
      required
        id="firstname"
        inputRef={refUser.first}
        onChange={(e) =>{setUser({...user,first:e.target.value,}); firstValidation()}}
         error = {!firstValidation()} 
         helperText = {!firstValidation() ? "First name Must Be [a-z,A-Z] " : " "}
        label="Required"
        placeholder='first-name'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
          
        }}
        variant="outlined"
      /></FormControl><br />
         <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
        <TextField
      required
        id="lastname"
        inputRef={refUser.last}
        onChange={(e) =>{setUser({...user,last:e.target.value,});lastValidation()}}
        error = {!lastValidation()} 
        helperText = {!lastValidation() ? "First name Must Be [a-z,A-Z] " : " "}
        label="Required"
        placeholder='last-name'
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
          
        }}
        variant="outlined"
      /></FormControl><br />
        <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">   
        <TextField
        required
        id="email"
        inputRef={refUser.email}
        onChange={(e) =>{setUser({...user,email:e.target.value,}); emailValidation()}}
        label="Required"
        placeholder='Email'
        error = {!emailValidation()}
        helperText = {!emailValidation() ? "Email Must Be [a-z,A-Z,0-9]@[a-z,A-Z,0-9].com" : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmailIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      /></FormControl>
     <br />
     <FormControl sx={{ m: 1.5, width: '35ch', flexDirection: 'row', alignItems: 'center' }} variant="outlined" >
     <label for:date style={{marginLeft:"20px",marginRight:"10px"}} >Choose Date: </label>
     <input type='date' name='date' required
            style={{width:'55%'}} max = "2022/04/03" ref ={refUser.date} onChange={(e) =>{ setUser({...user,date:e.target.value,}); dateValidation();}}></input>
            <br />
     </FormControl> <br />
   
     <FormControl sx={{ m: 1.5, width: '35ch', flexDirection: 'row', alignItems: 'center' }} variant="outlined">
        <label for="cities" style={{marginLeft:"14px",marginRight:"10px"}}>Choose City: </label>
        <input required type="text" id="cityInput" name="city" list="cities" onChange={(e) =>{setUser({...user,city:e.target.value})}}></input>
        <datalist id="cities" ref={refUser.city}>
            <option value="Tel Aviv"/>
            <option value="New York"/>
            <option value="Jerusalem"/>
            <option value="Paris"/>
            <option value="Madrid"/>
            <option value="Barcelona"/>
            <option value="Los Angeles"/>
            <option value="Las Vegas"/>
            <option value="London"/>
            <option value="Milano"/>
            <option value="Rome"/>
        </datalist>
      </FormControl> <br />
      <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
      <TextField
      required
        id="street"
        inputRef={refUser.street}
        onChange={(e) =>{setUser({...user,street:e.target.value,});streetValidation()}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SignpostOutlinedIcon />
            </InputAdornment>
          ),
        }}
        label="Required"
        error = {!streetValidation()}
        helperText = {!streetValidation() ? "Street Must Be [א-ת]" : ""}
        placeholder='street'
        variant="outlined"
      /></FormControl><br />
        <FormControl sx={{ m: 1.5, width: '35ch', flexDirection: 'row', alignItems: 'center' }} variant="outlined">
       
        <label for="num" style={{marginRight:"10px"}} >Street num : </label>
        <input  type="number" id="numInput" name="num" pattern='^[+]?\d*\.?\d+$' required  onChange={(e) =>{setUser({...user,number:e.target.value,}); streetNumValidation()}} ></input>
       
      </FormControl><br />
    
     <Button type='submit' variant="outlined"  endIcon={<PersonAddAlt1Icon />} >
        Add User
      </Button> 
   
      </div>
      <br />
      </form>
      <br /> 
      </>
  );
}
