import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsim from './fcjs.jpeg' ;

export default function SystemAdmin(props) {
    const [admin, setAdmin] = React.useState(props.users);
    React.useEffect(() => {
      setAdmin(props.users);
    }, [props.users]);

    //מחיקת משתמש
    function deleteUser(key){
    
            const newAdmin = admin.filter(item => item.email !== key.email);
            localStorage.setItem("users",JSON.stringify(newAdmin));
            setAdmin(newAdmin);
            props.deleteUser(newAdmin);
      
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
      <Button size="sm" id='d' onClick={() => props.send2Edit(key)}><i class="bi bi-pencil-fill" > </i></Button>
      <Button variant="danger" size="sm"style={{marginLeft : "5px"}} onClick={() => deleteUser(key)}><i class="bi bi-trash-fill" ></i></Button>
      </Col>
    </Row>
     )}
  </Container>
  )
}
