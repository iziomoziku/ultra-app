import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/Context/AuthContext';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            await login(username, password)

            // alert("Signup successful!");
            navigate("/"); // Redirect to home or login
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    )
}

export default Login