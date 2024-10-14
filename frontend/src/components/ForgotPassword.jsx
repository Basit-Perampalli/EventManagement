import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/forgot-password', { email });
            setMessage('Check your email for a password reset link.');
            setError('');
        } catch (error) {
            setError(`Error sending reset link. Please try again.${error}`);
            setMessage('');
        }
    };

    return (
        <div className="firstauth">

            <div className="auth-container">
                <div className="auth-form">
                    <h2>Forgot Password</h2>
                    {message && <div className="message">{message}</div>}
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleResetPassword}>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="auth-btn">Reset Password</button>
                    </form>
                    <div className="signup-link">
                        Remember your password? <Link to="/">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
