import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import HomePage from './HomePage';

function SignUp(props) {
    const [registerEmail, setRegisterEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    //current user


    const register = async () => {
        try{
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            props.val(false);
        } catch (error){
            console.log(error.message);
        }
        
    };

    return (
        <Modal show = {props.show} >
          <Modal.Header closeButton onClick = {()=>props.val(false)}>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" onChange={(event) => {setFirstName(event.target.value)}}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" onChange={(event) => {setLastName(event.target.value)}}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(event) => {setRegisterEmail(event.target.value)}}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(event) => {setRegisterPassword(event.target.value)}}/>
              </Form.Group>
        </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>props.val(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={register}>
              Sign Up
            </Button>
            {/* {console.log(user.length>0 )} */}
          </Modal.Footer>
        </Modal>
    );
}

export default SignUp;