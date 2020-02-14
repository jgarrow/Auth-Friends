import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const LoginForm = props => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = e => {
        e.preventDefault();

        axiosWithAuth()
            .post("/login", user)
            .then(res => {
                localStorage.setItem("token", res.data.payload);

                props.history.push("/my-friends");
            })
            .catch(err => {
                localStorage.removeItem("token");
                console.log("Invalid login: ", err);
            });
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
