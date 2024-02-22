import React from 'react';
import jsim from './js.png' ;
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';





export default function Profile(props) {

    let userProfile = props.user;
   
    function logoutUser(email){
        if(email == userProfile.email);
        {
            sessionStorage.clear();    
            props.logOutProfile("להתנתק")
        }
    }
  return (
    <> <br /><br />

    
        
      <Container style={{ border: "5px outset #F8F8FF",width:"400px"}}>
        <Row>
          <Col xs={4} md={4} className="text-right" >
            <Image src={jsim} rounded alt="Alps" style={{ height: "150px" }} />
          </Col>
          <Col xs={8} md={8} className="text-right" >
            <h1 style={{float:"left", fontSize:"35px"}}>{userProfile.first +' '+userProfile.last}</h1>
            <br /><br />
            <i class="bi bi-envelope-at" > {userProfile.email}</i> 
            <br /> 
            <i class="bi bi-geo-alt" text-align="center">{userProfile.street}</i>  
            <br />
            <i class="bi bi-cake2" >{userProfile.date}</i>
            <br />
            <Button size='sm' variant="secondary" onClick={() => {props.editProfile(userProfile)}}>עדכון פרטים</Button>
            <Button size="sm" variant="primary">למשחק</Button>
            <Button size="sm" variant="danger" onClick={() => {logoutUser(userProfile.email)}}>התנתק</Button>
            <br /> 
            </Col>
         
        </Row>
      </Container>
    </>
    
 
   

  )
}
