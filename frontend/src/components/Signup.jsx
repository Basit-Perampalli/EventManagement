import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/signup', { email, password });
            navigate('/'); // Redirect to login after successful signup
        } catch (error) {
            setError(`Signup failed, please try again. ${error}`);
        }
    };

    return (
        <div className="firstauth">

            <div className="auth-container">
                <div className="auth-form">
                    <h2>Signup</h2>
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleSignup}>
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
                        <button type="submit" className="auth-btn">Signup</button>
                    </form>
                    <div className="signup-link">
                        Already have an account? <Link to="/">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
