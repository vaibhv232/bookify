import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate])

  console.log(firebase);

  const handleSubmit = async (e) => {
    e.preventDefault(); //! don't refresh page on submit
    console.log('logging in a user...')
    const result = await firebase.loginUserWithEmailAndPassword(email, password)
    console.log('succcessful login', result)
  }


  return (
    <div className='container mt-5'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <Button variant="primary" type="submit"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Form>
      <label className='mt-4 mb-4 text-muted'>OR</label> <br />
      <Button variant='danger' onClick={firebase.signInWithGoogle}>Login With Google</Button>
    </div>
  )
}

export default LoginPage