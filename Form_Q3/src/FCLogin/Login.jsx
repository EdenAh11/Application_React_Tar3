import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import {FormHelperText, InputLabel } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

export default function Login(props) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [usersLogin, setUsersLogin] = React.useState(props.users);
    const [use, setUse] = React.useState("");
    const [pass, setPass] = React.useState("");

    React.useEffect(() => {
      setUsersLogin(props.users);
    }, [props.users]);

    //בודק את תנאי הלוגין
    const userValidation = () => {
      let pUsername = /^[\da-zA-Z!@#$%^&*()_+[\]{};:<>,.?~\`|-]+$/;
      let u = use;
      return(u.match(pUsername)?true:false);
    }
    const passValidation = () => {
      let pPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\{};:<>,.?~\\`|+$]).{7,12}$/;
      let p = pass;
      return(p.match(pPassword)?true:false);
    }
    
    function loginUser(username,password){ 
          if(userValidation() && passValidation()){
              const foundUser = usersLogin.map((user) => {
                if (user.username === username && user.password === password) {
                  let found = user;
                  sessionStorage.setItem("user",JSON.stringify(found));
                  props.sendUser(found);
                  props.sendSign("login");
                }
           });
        
       }}
       
       //פונקציות סיסמא
    function handleClickShowPassword() {
        return setShowPassword((show) => !show);
    }
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    
    }

 

  return (
    <>
  <form style={{ border: "5px outset #F8F8FF",width:"400px"}} >
    <div className='container' >
    <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
    <TextField
    required
      id="username2"
      onChange={(e) =>{setUse(e.target.value); userValidation()}}
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
    /></FormControl>
      <br />
      <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined" error = {!passValidation()}>
      <InputLabel required >Required</InputLabel>
        <OutlinedInput
          placeholder="password"
       
          onChange={(e) =>{setPass(e.target.value); passValidation()}}
          id="password2"
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
      <Button type='button' variant="outlined" endIcon={<LoginIcon />} onClick={() => {loginUser(use,pass)}}>
        LogIn
      </Button> <t />
      <Button type='button' variant="outlined" endIcon={<LoginIcon />} onClick={() => props.sendSign("sign-Up")}>
        Sign-Up
      </Button> <t />
      </div><br /></form> 
      <br />
      </> 
  )
}

