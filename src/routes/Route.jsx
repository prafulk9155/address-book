import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import Signup from '../components/Signup';

// Import other components as necessary

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/contact-list" element={<ContactList />} />
                <Route path="/contact-form" element={<ContactForm />} />
                <Route path="/edit/:id" element={<ContactForm />} />
                <Route path="/register" element={<Signup />} />
                {/* Define other routes here */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
