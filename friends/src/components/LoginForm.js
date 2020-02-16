import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const Wrapper = styled.div`
    margin: 0 auto;
    box-sizing: border-box;
    width: 960px;
    height: 100%;
    min-height: calc(100vh - 75px);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding-bottom: calc((100vh - 475px) / 2);
    padding-top: calc((100vh - 550px) / 2);
`;

const Image = styled.img`
    height: 370px;
    transform: perspective(800px) rotateX(-15deg) rotateY(-50deg);
    filter: drop-shadow(7px 10px 5px rgba(0, 0, 0, 0.5));
`;

const Form = styled.form`
    box-sizing: border-box;
    padding: 2rem;
    background: white;
    width: 400px;
    height: 350px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 4px 0px #f0f0f0;
`;

const LoginTitle = styled.h1`
    margin: 0;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    width: 90%;
    height: 70px;
    margin: 0 auto;
`;

const Input = styled.input`
    box-sizing: border-box;
    padding: 5px 8px;
    font-size: 1rem;
    width: 100%;
    border-radius: 4px;
    border: 1px solid lightgray;
`;

const Button = styled.button`
    box-sizing: border-box;
    padding: 10px;
    border-radius: 20px;
    width: 90%;
    font-size: 1rem;
    margin: 1rem auto;
    background: mediumpurple;
    color: white;
    cursor: pointer;

    &:hover {
        background: rebeccapurple;
        box-shadow: 0px 0px 4px 0px rebeccapurple;
    }
`;

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
        <Wrapper>
            <Form onSubmit={handleLogin}>
                <LoginTitle>Login</LoginTitle>
                <InputContainer>
                    <label htmlFor="username">Username: </label>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        value={user.username}
                        onChange={handleChange}
                    />
                </InputContainer>
                <InputContainer>
                    <label htmlFor="password">Password: </label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </InputContainer>
                <Button>Login</Button>
            </Form>
            <Image
                src="https://i.pinimg.com/originals/98/d5/ce/98d5ce3bc2bb0b69b9de444736ac6057.png"
                alt="Central Perk logo from Friends"
            />
        </Wrapper>
    );
};

export default LoginForm;
