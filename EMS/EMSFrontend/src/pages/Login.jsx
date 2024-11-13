import React, { useState } from 'react';
import './loginstyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);  // Add error state
    const [isChecked, setIsChecked] = useState(false);  // Add isChecked state
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isChecked) {
            setError("You must agree to the Terms & Conditions.");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                { email, password }
            );
            if(response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                } else {
                    navigate('/employee-dashboard')
                }
            }
        } catch (error) {
            if(error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("Server Error")
            }
        }
    };

    return (
        <div className="loginPage">
            <div className="loginFormContainer">
                <h2 className="text-center">Login</h2>
                <div className="text-danger mb-3">
                    {error && error} 
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="formInputGroup">
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            value={email}  // Use email directly
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="formInputGroup">
                        <input
                            type="password"
                            name="password"
                            placeholder=" "
                            value={password}  // Use password directly
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    {/* Checkbox for Terms & Conditions */}
                    <div className="termsCheckbox mb-3">
                        <input
                            type="checkbox"
                            id="tick"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                        />
                        <label htmlFor="tick">
                            I agree to the <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
                        </label>
                    </div>

                    <button className="btn btn-primary w-100" type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
