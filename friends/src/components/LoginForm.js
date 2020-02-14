import React, { useState } from "react";

const LoginForm = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = e => {
        console.log("e.target.value: ", e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = e => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username: </label>
            <input
                id="username"
                name="username"
                type="text"
                value={user.username}
                onChange={handleChange}
            />
            <label htmlFor="password">Password: </label>
            <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
            />
            <button>Login</button>
        </form>
    );
};

export default LoginForm;
