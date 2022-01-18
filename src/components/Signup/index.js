import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../Auth/index';
import { useHistory, Link } from 'react-router-dom';
import { getDatabase, ref, get, push, set, child } from "firebase/database";
import { getAuth } from 'firebase/auth'


const Signup = () => {

    const emailRef = useRef()
    const passRef = useRef()
    const numRef = useRef()
    const passConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const addRef = useRef()
    const lngRef = useRef()
    const latRef = useRef()
    const [pushKey, setPushKey] = useState()

    

    async function handleSubmit(e) {
        e.preventDefault()
        const db = getDatabase();
        const auth = getAuth();


        if (passRef.current.value !== passConfirmRef.current.value) {
            return setError("Password didn't match")
        }

        try {
            setError('')

            setLoading(true)
            await signup(emailRef.current.value, passRef.current.value).then(()=>{
                set(ref(db, 'evacuationRoutes/' + auth.currentUser.uid), {
                    emailRef: emailRef.current.value,
                    longitude: parseFloat(lngRef.current.value),
                    latitude: parseFloat(latRef.current.value),
                    evacuationAdd: addRef.current.value,
                    phoneNumber: numRef.current.value,
                    id: auth.currentUser.uid,

    
                });
                set(ref(db, 'users/' + auth.currentUser.uid), {
                    fullname: addRef.current.value,
                    id: auth.currentUser.uid,
                    email: emailRef.current.value,
                    address: addRef.current.value,
                    adminRole: true,
                    phoneNumber: numRef.current.value
                 });
            })
            history.push('/login')
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">New Sign Up</h2>
                    {error && <Alert variant='danger' >{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email' className='mt-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' required ref={emailRef} />
                        </Form.Group>
                        <Form.Group id='email' className='mt-3'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type='number' step='any' required ref={numRef} />
                        </Form.Group>
                        <Form.Group id='password' className='mt-3'>
                            <Form.Label>password</Form.Label>
                            <Form.Control type='password' required ref={passRef} />
                        </Form.Group>
                        <Form.Group id='password-confirm' className='mt-3'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password-confirm' required ref={passConfirmRef} />
                        </Form.Group>
                        <br />
                        <Form.Group id='address' className='mt-3'>
                            <Form.Label>Baranggay Address</Form.Label>
                            <Form.Control type='text' required ref={addRef} />
                        </Form.Group>
                        <Form.Group id='latitude' className='mt-3'>
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control type='number' step="any" required ref={latRef} />
                        </Form.Group>
                        <Form.Group id='longitude' className='mt-3'>
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type='number' step='any' required ref={lngRef} />
                        </Form.Group>
                        <Button className='w-100 mt-3' type='submit' disabled={loading}>
                            Sign Up
                        </Button>
                        <Link to='/forgotpassword'><h5 className='text-center mt-3'>Forgot Password?</h5></Link>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}


export default Signup;