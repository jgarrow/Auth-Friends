import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";

import "./App.css";

import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Friends from "./components/Friends";

const Header = styled.header`
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const Nav = styled.nav`
    width: 150px;
    margin-right: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header>
                    <Nav>
                        <Link to="/login">Login</Link>
                        <Link to="/my-friends">My Friends</Link>
                    </Nav>
                </Header>
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/my-friends"
                        component={Friends}
                    />
                    <Route path="/login" component={LoginForm} />
                    <Route component={LoginForm} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
