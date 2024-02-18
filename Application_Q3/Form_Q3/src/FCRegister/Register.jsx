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
import { InputLabel } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';

export default function Form() {
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

    function handleClickShowPassword() {
        return setShowPassword((show) => !show);
    }
  
    const handleMouseDownPassword = (event) => {
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

    React.useEffect(() => {
      if(counter == 1)
      {
      localStorage.setItem("users",JSON.stringify(users));
      }
    },[users])
    

   function registerUser(){
      validation();
      setUser(user);
      setUsers([...users,user]);
      setCounter(1);
   } 
   function validation(){ 
    let patterns ={
      username : /^[\da-zA-Z!@#$%^&*()_+[\]{};:<>,.?~\`|-]+$/,
      password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\{};:<>,.?~\\`|+$]).{7,12}$/,
      email : /^[a-zA-Z!#$%^&*()_+[\]{};:<>,.?~\\`|-]+[@]{1}[a-zA-Z]+.com$/
    } 
    let u = user.username;
    let s = user.password;
    let e = user.email;
    if(u.match(patterns.username) && s.match(patterns.password && e.match(patterns.email) )){
      if(user.password == user.cpassword){
      return true;
      }
  }
   }
  return (
 
 <form onSubmit={registerUser}>
     <div className='container'>
      <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
      <TextField
      required
        id="username"
        onChange={(e) =>{setUser({...user,username:e.target.value,})}}
        inputProps={{
          maxLength: 60,
        }}
        label="Required"
        placeholder='Username'
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
       
        <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
        <InputLabel required >Required</InputLabel>
          <OutlinedInput
            placeholder="password"
         
            onChange={(e) =>{setUser({...user,password:e.target.value,})}}
            id="password"
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
        </FormControl><br />
        <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
        <InputLabel required >Required</InputLabel>
          <OutlinedInput
            placeholder="check password"
         
            onChange={(e) =>{setUser({...user,cpassword:e.target.value,})}}
            id="password1"
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
        </FormControl> <br />
        <FormControl sx={{ m: 1.5, width: '35ch', flexDirection: 'row', alignItems: 'center' }} variant="outlined">
        
        <label style={{textAlign:'center',marginRight: '15px',marginLeft:'25px' }} for="UploadFile">Upload_File: </label>
        <input type="file" name='UploadFile' accept=".jpg, .jpeg" style={{ display: 'block' }} onChange={(e) =>{setUser({...user,file:e.target.value,})}} />
        
        </FormControl> <br />
        <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
        <TextField
      required
        id="firstname"
        onChange={(e) =>{setUser({...user,first:e.target.value,})}}
        inputProps={{
          pattern: '^[a-zA-Z]+$',
        }}
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
        onChange={(e) =>{setUser({...user,last:e.target.value,})}}
        inputProps={{
          pattern: '^[a-zA-Z]+$',
        }}
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
        onChange={(e) =>{setUser({...user,email:e.target.value,})}}
        label="Required"
        placeholder='Email'
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
     <FormControl sx={{ m: 1.5, width: '35ch', flexDirection: 'row', alignItems: 'center' }} variant="outlined">
      
     <label for:date style={{marginLeft:"20px",marginRight:"10px"}}>Choose Date: </label>
     <input type='date' name='date' style={{width:'55%'}}onChange={(e) =>{
      let date = new Date(e.target.value)
      let currentDate = new Date()
      let age = currentDate.getFullYear() - date.getFullYear()
        if(age < 18 || age >120){
        alert("Please Choose again!!!");
      }
     setUser({...user,date:e.target.value,})
     }}></input>
    
     </FormControl> <br />
   
     <FormControl sx={{ m: 1.5, width: '35ch', flexDirection: 'row', alignItems: 'center' }} variant="outlined">
        <label for="cities" style={{marginLeft:"15px",marginRight:"10px"}}>Choose City: </label>
        <input required type="text" id="cityInput" name="city" list="cities" onChange={(e) =>{setUser({...user,city:e.target.value})}}></input>
        <datalist id="cities" >
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
        onChange={(e) =>{setUser({...user,street:e.target.value,})}}
        inputProps={{
          pattern: '^[א-ת]+$',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SignpostOutlinedIcon />
            </InputAdornment>
          ),
          
        }}
        label="Required"
        placeholder='street'
        variant="outlined"
      /></FormControl><br />
        <FormControl sx={{ m: 1.5, width: '35ch', flexDirection: 'row', alignItems: 'center' }} variant="outlined">
       
        <label for="num" style={{marginRight:"5px"}}>Choose number : </label>
        <input type="number" id="numInput" name="num" pattern='^[+]?\d*\.?\d+$'  onChange={(e) =>{setUser({...user,number:e.target.value,})}} ></input>
       
      </FormControl><br />
    
     <Button type='submit' variant="outlined"  endIcon={<PersonAddAlt1Icon />}>
        Add User
      </Button> <t />
      <Button variant="outlined" endIcon={<DeleteIcon />}>
        Delete
      </Button> 
      </div>
    
      </form>

  );
}
