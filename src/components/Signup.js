import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CSRFToken from './cookies';

function Signup({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState("");

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        setErrors("");
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": CSRFToken(document.cookie)
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "password_confirmation": confirmPassword
            }),
        }
        fetch("/signup", configObj)
            .then(response => {
                if (response.ok) {
                    response.json().then((user) => {
                        onLogin(user);
                        setUsername("");
                        setPassword("");
                        setConfirmPassword("");
                        history.push("/profile");
                    });
                } else {
                    response.json().then(error => {
                        setErrors(error.errors.join("; "))
                    })
                };
            });
    };

    return (
        <div className="auth-form">
            <div className="auth-form-header">
                <h1>Create an Account</h1>
            </div>
            <div className="auth-form-body">
                <form onSubmit={handleSubmit}>
                    {errors ? <div className="errors">{errors}</div> : null}
                    <label htmlFor="username" className="visuallyhidden" />
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password" className="visuallyhidden" />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="confirm-password" className="visuallyhidden" />
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;