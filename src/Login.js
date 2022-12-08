import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, react, histo } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import SignUp from './SignUp';
import {useNavigate } from "react-router-dom";
import "./login.css";

function Login(props) {
const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const login = async () => {
      try{
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        navigate("/homepage", {state:{email:loginEmail}});
      } catch (error){
          console.log(error.message);
      }
    }

    var val= true;
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);

    return (
      <div class = "outerBox">
        <div class = "innerBox">
          <h1 class = "title">Share A Book</h1>
          <Form class = "loginForm">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(event) => {setLoginEmail(event.target.value)}}/>
            </Form.Group>
      
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(event) => {setLoginPassword(event.target.value)}}/>
            </Form.Group>
            <div class = "loginBtnContainer">
              <Button variant="primary" onClick={login}>
                Login
              </Button>
            </div>
            <div class = "signUpBtnContainer">
              <Button variant="primary" onClick = {()=>setShow(true)} >
                Sign Up
              </Button>{' '}
            </div>
            <SignUp show = {show} val={setShow}/>
          </Form>
        </div>
      </div>
    );
}

export default Login;