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
                setFriends(res.data);
            })
            .catch(err => console.log("Error getting friends: ".err));
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <div>
            {friends.length &&
                friends.map(friend => (
                    <div>
                        <h2>{friend.name}</h2>
                        <p>Age: {friend.age}</p>
                        <p>Email: {friend.email}</p>
                    </div>
                ))}
        </div>
    );
};

export default Friends;
