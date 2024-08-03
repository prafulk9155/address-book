import React, { useState, useEffect } from 'react';
import { post } from '../services/api.service'; 
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container,Row,Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './Form.css'
import { FaArrowLeft } from 'react-icons/fa'; // Importing the left arrow icon from Font Awesome


const ContactForm = () => {
    const [contact, setContact] = useState({
        full_name: '',
        dob: '',
        contact_number: '',
        email: '',
        website: '',
        group: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const today = new Date().toISOString().split('T')[0];
    
    useEffect(() => {
        if (id) {
            const payload = {
                "id": id
            };
            const fetchContact = async () => {
                try {
                    const data = await post(`contacts/getDataByID`, payload); // Adjust endpoint based on your server
                    if (data.error) {
                        toast.error(data.message); // Show error toast
                    } else {
                        setContact({
                            full_name: data.contact.name,
                            dob: data.contact.dob.split('T')[0], // Format to YYYY-MM-DD
                            contact_number: data.contact.phone,
                            email: data.contact.email,
                            website: data.contact.website,
                            group: data.contact.group_name,
                        });
                        toast.success(data.message); // Show success toast
                    }
                } catch (error) {
                    console.error("Error fetching contact:", error);
                    toast.error(data.message); // Show error toast
                }
            };

            fetchContact();
        }
    }, [id]);

    const handleBack = () => {
        navigate('/contact-list'); // Redirect to /contact-list when back button is clicked
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^\+?\d*$/.test(contact.contact_number)) {
            toast.error('Invalid contact number');
            return; // Prevent form submission if invalid
        }

        // Proceed with form submission logic
        // console.log("Contact submitted:", contact); /
        const payload = { ...contact };
        if (id) {
            payload.id = id; // Add the id to the payload for editing
        }
        
        try {
            const data = id
                ? await post(`contacts/update`, payload) // Update contact
                : await post('contacts/add', payload); // Add new contact

            if (data.error) {
                toast.error(data.message); // Show error toast
            } else {
                toast.success(id ? "Contact updated successfully!" : "Contact added successfully!"); // Show success toast
                navigate('/contact-list'); // Redirect to the contact list
            }
        } catch (error) {
            console.error("Error during POST request:", error);
            // console.log(error,data)
        
            toast.error("Network error. Please try again.",error); // Show error toast
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Container className="my-5">
            <div className='card form-card'>
                <div className="card-header">
                    <h2>{id ? 'Edit Contact' : 'Add Contact'}</h2>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={12} md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className='label required'>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="full_name"
                                        value={contact.full_name}
                                        onChange={handleChange}
                                        required
                                        className='formcontrol'
                                        placeholder='Please enter your name ...'
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label className='label required'>Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            value={contact.dob}
                                            onChange={handleChange}
                                            required
                                            max={today}
                                            className='formcontrol' onFocus={(e) => e.target.showPicker()}
                                        />
                                    </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className='label required'>Contact Number</Form.Label>
                                    <Form.Control
                                        type="tel" // Changed to tel for better input handling
                                        name="contact_number"
                                        value={contact.contact_number}
                                        onChange={handleChange}
                                        required min={0} step="1" // Adjusted step for whole numbers
                                        className='formcontrol'
                                        placeholder="Enter contact number"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className='label required'>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={contact.email}
                                        onChange={handleChange}
                                        required
                                        placeholder='abc@xyz.com'
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className='label'>Website</Form.Label>
                                    <Form.Control
                                        type="url"
                                        name="website"
                                        value={contact.website}
                                        onChange={handleChange}
                                        className='formcontrol'
                                        placeholder='https://xyz.com'
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label className='label'>Group</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="group"
                                        value={contact.group}
                                        onChange={handleChange}
                                        className='formcontrol'
                                        placeholder='friend, family, office ...'
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className='row'>
    <div className='col d-flex justify-content-start'>
        <Button 
            variant="secondary" 
            className="mt-3" // Use w-100 for full width
            onClick={handleBack} 
        >
           <FaArrowLeft /> 
          <span className="ms-2">Back</span>
        </Button>
    </div>
    <div className='col d-flex justify-content-end'>
        <Button 
            variant="primary" 
            type="submit" 
            className="mt-3" // Use w-100 for full width
        >
            {id ? 'Update' : 'Add'}
        </Button>
    </div>
</div>

                        
                    </Form>
                </div>
                <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
            </div>
        </Container>
        
    );
};

export default ContactForm;
