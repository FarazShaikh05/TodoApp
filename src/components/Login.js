import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [userNotFoundError,setUserNotFoundError] =('');
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^@]+@[^@]+\.[^@]+$/.test(email);

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        // Dynamically update the error state based on the input value
        if (value.trim() === '') {
            setErrors(prevErrors => ({ ...prevErrors, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} field cannot be empty` }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
        }

        // Update the state for the corresponding field
        switch (field) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (email === "") {
            newErrors.email = 'Email field cannot be empty';
        }else if(!validateEmail(email)){
            newErrors.email = 'Invalid email format';
        }

        if (password === "" ) {
            newErrors.password = 'Password field cannot be empty';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userDetails = users.find(user => user.email === email);

            if (!userDetails) {
                setErrors({ userNotFoundError: 'Email not found' });
            } else if (userDetails.password !== password) {
                setErrors({ password: 'Wrong password' });
            } else {
                // stringify is used because localdb only support string
                localStorage.setItem('currentUser', JSON.stringify(userDetails));  
                handleLogin();
                navigate('/todo');
            }
        }
    }

    return (
        <div className="login-div">
            <h1 style={{color:'#ffae00'}} >Login</h1>
            {errors.userNotFoundError && <p className="error">{errors.userNotFoundError}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    placeholder="Email"
                    className="login"
                    value={email}
                    style={{ border: errors.email ? '2px solid red' : '' }}
                    onChange={(e) => handleInputChange(e, 'email')}
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    className="login"
                    value={password}
                    style={{ border: errors.password ? '2px solid red' : '' }}
                    onChange={(e) => handleInputChange(e, 'password')}
                />
                {errors.password && <p className="error">{errors.password}</p>}
                <button type="submit" className="btn">Login</button>
            </form>
            <a href="/register">Don't have an account?</a>
        </div>
    );
};

export default Login;




