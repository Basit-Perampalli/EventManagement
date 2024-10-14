import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './LoginSignup.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("refreshToken");
        if (token) {
            navigate('/home');
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Both fields are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/auth/login/', { email, password });
            const { access, refresh, user_type } = response.data;
            localStorage.setItem('accessToken', access); // Store access token
            localStorage.setItem('usertype', user_type); // Store access token
            localStorage.setItem('refreshToken', refresh); // Store refresh token
            navigate('/home'); // Redirect to dashboard
        } catch (error) {
            setError('Invalid email or password');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="firstauth">
            <div className="auth-container">
                <div className="auth-form">
                    <h2>Login</h2>
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleLogin}>
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
                        <button type="submit" className="auth-btn">Login</button>
                    </form>
                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="signup-link">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
