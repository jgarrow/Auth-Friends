import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Friends = () => {
    const [friends, setFriends] = useState([]);
    console.log("In Friends component");

    const getFriends = () => {
        axiosWithAuth()
            .get("/friends")
            .then(res => {
                console.log("GET /friends res: ", res);
            })
            .catch(err => console.log("Error getting friends: ".err));
    };

    useEffect(() => {
        getFriends();
    }, []);

    return <div>Hello World</div>;
};

export default Friends;
