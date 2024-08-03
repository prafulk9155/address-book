import React, { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { post } from '../services/api.service'; 
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import { FaSignInAlt } from 'react-icons/fa'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        try {
            const data = await post('users/login', {
                email: username, 
                password: password
            });

           
            setIsLoading(false); 

            if (data.error) {
                setResponseMessage(data.message); 
                console.log(data.message);
            } else {
                toast.success("Logged in successfully")
                authService.setToken(data.token); 
                authService.setUser(data.user); 
                authService.setUserId(data.userId); 
     

                navigate('/contact-list'); 
            }
        } catch (error) {
            console.error("Error during POST request:", error);
            setResponseMessage("Invalid User ID or Password");
            toast.error("Invalid User ID or Password")
            setIsLoading(false); 
        }
    };

    return (
        <Container className="d-flex  justify-content-center align-items-center">
            <Card className="shadow p-4 login-card" style={{ width: '100%', maxWidth: '400px' }}>
             <div className="card-header"><h2 className="text-center mb-4">Login</h2></div> 
             <div className="card-body">  
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label className='label'>Email</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter email" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className='label'>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </Form.Group>

                    {responseMessage && (
                        <div className="text-danger mb-3 text-center">{responseMessage}</div>
                    )}

                    <Button variant="primary" type="submit" className="w-100 mt-2" disabled={isLoading}>
                           <FaSignInAlt className="me-1" /> 
                    {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                </Form>
                </div>
                <div className="text-center mt-3">
                    <p className="mb-0">Don't have an account? <a href="/register">Register</a></p>
                </div>
            </Card>
        </Container>
    );
};

export default Login;
