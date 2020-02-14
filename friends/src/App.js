import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Friends from "./components/Friends;";

function App() {
    return (
        <Router>
            <div className="App">
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
}

export default App;
