import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const AddFriendForm = ({ setFriends }) => {
    const [newFriend, setNewFriend] = useState({
        name: "",
        age: 0,
        email: ""
    });

    const handleChange = e => {
        setNewFriend({
            ...newFriend,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log("New Friend: ", newFriend);

        axiosWithAuth()
            .post("/friends", newFriend)
            .then(res => {
                console.log("add friend res: ", res);

                axiosWithAuth()
                    .get("/friends")
                    .then(res => {
                        setFriends(res.data);
                    })
                    .catch(err =>
                        console.log("Error getting updated friends list: ", err)
                    );
            })
            .catch(err => console.log("Error adding new friend: ", err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input
                id="name"
                name="name"
                type="text"
                value={newFriend.name}
                onChange={handleChange}
            />
            <label htmlFor="age">Age: </label>
            <input
                id="age"
                name="age"
                type="number"
                value={newFriend.age}
                onChange={handleChange}
            />
            <label htmlFor="email">Email: </label>
            <input
                id="email"
                name="email"
                type="email"
                value={newFriend.email}
                onChange={handleChange}
            />
            <button type="submit">Add Friend</button>
        </form>
    );
};

export default AddFriendForm;
