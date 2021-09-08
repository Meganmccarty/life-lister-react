import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ onLogin }) {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setErrors("");
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
        }
        fetch("/login", configObj)
            .then(response => {
                if (response.ok) {
                    response.json().then((user) => {
                        onLogin(user);
                        setUsername("");
                        setPassword("");
                        history.push("/profile");
                    });
                } else {
                    response.json().then(error => {
                        console.log(error.errors);
                        setErrors(error.errors);
                    });
                };
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            {errors ? <div>{errors}</div>: null}
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password: </label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;