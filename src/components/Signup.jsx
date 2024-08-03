import React, { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { post } from '../services/api.service';  
import authService from '../services/authService'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'
import { FaUserPlus } from 'react-icons/fa'; 


const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        confirm_password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        
        if (formData.password !== formData.confirm_password) {
            toast.error("Passwords do not match. Please check and try again."); 
            setIsLoading(false);
            return; 
        }

        try {
            const data = await post('users/register', formData); 
            toast.dismiss(); 

            if (data.error) {
                toast.error(data.message || "Registration failed. Please try again."); 
            } else {
             
                toast.success('Account created  successfully, please login '); 
                navigate('/'); 
            }
        } catch (error) {
            console.error("Error during POST request:", error);
            const apiMessage = error.response?.data?.message || "An error occurred during signup. Please try again.";
            toast.error(apiMessage); 
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <Container className="d-flex  justify-content-center align-items-center">
            <Card className="shadow p-4 login-card" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card-header">
                <h2 className="text-center mb-4">Sign Up</h2>
                </div>
            <div className="card-body">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label className='label'>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="username"
                            placeholder="Enter username" 
                            value={formData.username}
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className='label'>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            placeholder="Enter email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className='label'>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label className='label'>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="confirm_password"  
                            placeholder="Confirm Password" 
                            value={formData.confirm_password} 
                            onChange={handleChange} 
                            required 
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-2" disabled={isLoading}>
                    <FaUserPlus className="me-1" /> 
                    {isLoading ? 'Loading...' : 'Sign Up'}
                    </Button>
                    
                </Form>
                
                </div>
                <div className="text-center mt-3">
                    <p className="mb-0">Already have an account ! <a href="/">Login</a></p>
                </div>
               
            </Card>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
        </Container>
    );
};

export default Signup;
