import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('regular'); // 'organizer' or 'regular'
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("refreshToken");
        if (token) {
            navigate('/home');
        }
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');


        try {
            const response = await axios.post('http://localhost:8000/auth/register/', {

                first_name: firstName,
                last_name: lastName,
                email,
                password,
                user_type: userType
            });

            const { access, refresh, user_type } = response.data;
            localStorage.setItem('accessToken', access); // Store access token
            localStorage.setItem('usertype', user_type); // Store access token
            localStorage.setItem('refreshToken', refresh); // Store refresh token
            navigate('/home'); // Redirect to dashboard

            setSuccessMessage('Signup successful! Redirecting to login...');
            setTimeout(() => navigate('/'), 2000); // Redirect after success
        } catch (error) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="firstauth">
            <div className="auth-container">
                <div className="auth-form">
                    <h2>Signup</h2>
                    {error && <div className="error">{error}</div>}
                    {successMessage && <div className="success">{successMessage}</div>}
                    <form onSubmit={handleSignup}>
                        <div className="input-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>User Type</label>
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="regular">Regular User</option>
                                <option value="organizer">Organizer</option>
                            </select>
                        </div>
                        <button type="submit" className="auth-btn">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
