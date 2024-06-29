import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UpdateProfile = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');

    const [changePassword, setChangePassword] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser')); 
        if (user) {
            setEmail(user.email);
            setUsername(user.username);
            setContact(user.contact);
        }
    }, []);

    const handleSave = () => {
        const newErrors = {};

        if (changePassword) {
            if (password === "") {
                newErrors.password = 'Password field cannot be empty';
            }

            if (confirmPassword === "") {
                newErrors.confirmPassword = 'Confirm password field cannot be empty';
            }

            if (password !== confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Get the existing user data
        const existingUser = JSON.parse(localStorage.getItem('currentUser'));

        const updatedUser = {
            ...existingUser, // Preserve existing user data
            email,
            username,
            contact,
            ...(changePassword && { password }) // Only add password if it's changed
        };

        // Save updated user data to localStorage
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === email);
        if (userIndex >= 0) {
            users[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
        }

        navigate('/todo');
    };

    return (
        <div className="login-div">
            

            <div className="container">
              <div className="row align-items-center">
                <div className="col-2">
                  <div className='back-icon' onClick={() => navigate('/todo')}>
                    <i className="fa-solid fa-arrow-left" style={{ color: "#000000" }}></i>
                  </div>
                </div>
                <div className="col-10 text-center">
                  <h1 className='heading' style={{ color: '#ffae00'}}>Update Profile</h1>
                </div>
              </div>
            </div>


            <form onSubmit={(e) => e.preventDefault()} className="login-form">
                <div>
                    <input
                        type="email"
                        value={email}
                        className="login"
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly 
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={username}
                        className="login"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={contact}
                        className="login"
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <div>
                    <label className='label-pass'>
                        Do you want to change password?   
                    </label>
                    <label className='switch'>
                        <input
                            type="checkbox"
                            checked={changePassword}
                            onChange={() => setChangePassword(!changePassword)}
                        />
                        <span className='slider round'></span>
                    </label>
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        className="login"
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={!changePassword}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        className="login"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={!changePassword}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>
                <button onClick={handleSave} className='btn'>Update Profile</button>
            </form>
        </div>
    );
};

export default UpdateProfile;


