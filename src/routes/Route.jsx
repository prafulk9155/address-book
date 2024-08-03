import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import Signup from '../components/Signup';



const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/contact-list" element={<ContactList />} />
                <Route path="/contact-form" element={<ContactForm />} />
                <Route path="/edit/:id" element={<ContactForm />} />
                <Route path="/register" element={<Signup />} />
               
            </Routes>
        </Router>
    );
};

export default AppRoutes;
