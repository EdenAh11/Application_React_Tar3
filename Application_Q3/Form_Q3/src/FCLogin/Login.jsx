import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { InputLabel } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [usersLogin, setUsersLogin] = React.useState(JSON.parse(localStorage["users"]));
    const [use, setUse] = React.useState("");
    const [pass, setPass] = React.useState("");

 

    function loginUser(username,password){ 
        const patterns = {
            username : /^[\da-zA-Z!@#$%^&*()_+[\]{};:<>,.?~\`|-]+$/,
            password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\{};:<>,.?~\\`|+$]).{7,12}$/
        }
       
          let u = username;
          let s = password;
          if(u.match(patterns.username) && s.match(patterns.password)){

              const foundUser = usersLogin.map((user) => {
                if (user.username === username && user.password === password) {
                  let found = user;
                  sessionStorage.setItem("user",JSON.stringify(found));
                }
           });
        
       }}

    function handleClickShowPassword() {
        return setShowPassword((show) => !show);
    }
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    
    }

 

  return (
  <form  onSubmit={(e) => { e.preventDefault(); loginUser(use, pass); }}>
    <div className='container'>
    <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
    <TextField
    required
      id="username2"
      onChange={(e) =>(setUse(e.target.value))}
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
    /></FormControl>
      <br />
      <FormControl sx={{ m: 1.5, width: '35ch' }} variant="outlined">
      <InputLabel required >Required</InputLabel>
        <OutlinedInput
          placeholder="password"
       
          onChange={(e) =>(setPass(e.target.value))}
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
      </FormControl><br />
      <Button type='submit' variant="outlined" endIcon={<LoginIcon />}>
        LogIn
      </Button> <t />
      </div></form>
  )
}

