import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [registerError , setRegisterError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^@]+@[^@]+\.[^@]+$/.test(email);
    const validateUsername = (username) => /^[a-zA-Z]+$/.test(username);
    const validateContact = (contact) => /^\d+$/.test(contact);
    const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        
        if (value.trim() === '') {
            setErrors(prevErrors => ({ ...prevErrors, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} field cannot be empty` }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
        }

        
        switch (field) {
            case 'email':
                setEmail(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'contact':
                setContact(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const isEmailRegistered = users.some(user => user.email === email);

        if (email === "") {
            newErrors.email = 'Email field cannot be empty';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        } 
        
        if (isEmailRegistered) {
            newErrors.registerError = 'User already registered with this email';
        }

        if (username === "") {
            newErrors.username = 'Username field cannot be empty';
        } else if (!validateUsername(username)) {
            newErrors.username = 'Username should only contain letters';
        }

        if (contact === "") {
            newErrors.contact = 'Contact field cannot be empty';
        } else if (!validateContact(contact)) {
            newErrors.contact = 'Contact number should only contain numbers';
        }

        if (password === "") {
            newErrors.password = 'Password field cannot be empty';
        } else if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character';
        }

        if (confirmPassword === "") {
            newErrors.confirmPassword = 'Confirm Password field cannot be empty';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const newUser = { email, username, contact, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            navigate('/login');
        }
    };

    return (
        <div className="register-div">
            <h1 style={{color:'#ffae00'}}  >Register</h1>
            {errors.registerError && <p className="error-register">{errors.registerError}</p>}
            <form onSubmit={handleSubmit}>

            <input
                    type="text"
                    placeholder="Username"
                    className="register"
                    value={username}
                    style={{ border: errors.username ? '2px solid red' : '' }}
                    onChange={(e) => handleInputChange(e, 'username')}
                />
                {errors.username && <p className="error">{errors.username}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="register"
                    value={email}
                    style={{ border: errors.email ? '2px solid red' : '' }}
                    onChange={(e) => handleInputChange(e, 'email')}
                />
                {errors.email && <p className="error">{errors.email}</p>}
                
                <input
                    type="number"
                    placeholder="Contact"
                    className="register"
                    value={contact}
                    style={{ border: errors.contact ? '2px solid red' : '' }}
                    onChange={(e) => handleInputChange(e, 'contact')}
                />
                {errors.contact && <p className="error">{errors.contact}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    className="register"
                    value={password}
                    style={{ border: errors.password ? '2px solid red' : '' }}
                    onChange={(e) => handleInputChange(e, 'password')}
                />
                {errors.password && <p className="error">{errors.password}</p>}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="register"
                    value={confirmPassword}
                    style={{ border: errors.confirmPassword ? '2px solid red' : '' }}
                    onChange={(e) => handleInputChange(e, 'confirmPassword')}
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                <button type="submit" className="btn">Register</button>
            </form>
            <a href="/login">Already have an account?</a>
        </div>
    );
};

export default Register;



