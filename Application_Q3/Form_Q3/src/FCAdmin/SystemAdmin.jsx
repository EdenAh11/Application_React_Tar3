import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsim from './fcjs.jpeg' ;

export default function SystemAdmin() {
    const [admin, setAdmin] = React.useState(Check());
    function Check(){
        if(localStorage.length == 0)
        {
            return "";
        }
        return JSON.parse(localStorage["users"])
    }

    function editUser(){
        validation();
       let localUser = JSON.parse(localStorage["users"]);
       const indexToUpdate = localUser.findIndex(element => element.email === user.email);
       if (indexToUpdate !== -1) {
         localUser[indexToUpdate] = user;
     
         localStorage.setItem("users", JSON.stringify(localUser));
       }
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
    <Container style={{ border: "5px outset #F8F8FF",width:"900px"}}>
    <Row style={{borderBottom:"1px outset #F8F8FF"}}>
      <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
            <p><b>Username</b></p>
      </Col>
      <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
            <p><b>Fullname</b></p>
      </Col>
      <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
            <p><b>Birthday</b></p>
      </Col>
      <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
            <p><b>Address</b></p>
      </Col>
      <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
            <p><b>Email</b></p>
      </Col>
    </Row><br />
    {admin.map((key) =>
    <Row>
    <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
            <p> <Image src={jsim} rounded alt="Alps" style={{ height: "25px" }} />{key.username}</p>
      </Col>
      <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
            <p>{key.first + " " + key.last}</p>
      </Col>
      <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
            <p>{key.date}</p>
      </Col>
      <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
            <p>{key.street}</p>
      </Col>
      <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
            <p>{key.email}</p>
      </Col>
      <Col xs={2} md={2} className="text-right" style={{float:'right'}}>
      <i class="bi bi-pencil-fill" style={{ color: 'white',backgroundColor:"blue"}} onClick={editUser} > </i>
      <i class="bi bi-trash-fill" style={{ color: 'white',backgroundColor:"red"}}></i>
      </Col>
    </Row>
     )}
  </Container>
  )
}
