import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const EditFriendForm = ({
    friend,
    setFriends,
    toggleisEditingFriend,
    setFriendToEdit
}) => {
    const [tempFriend, setTempFriend] = useState({
        ...friend
    });

    const handleChange = e => {
        setTempFriend({
            ...tempFriend,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e, tempFriend) => {
        e.preventDefault();

        axiosWithAuth()
            .put(`/friends/${tempFriend.id}`, tempFriend)
            .then(res => {
                setFriends(res.data);
            })
            .catch(err => console.log("Error with PUT request: ", err));

        setFriendToEdit(null);
        toggleisEditingFriend(false);
    };

    return (
        <form onSubmit={e => handleSubmit(e, tempFriend)}>
            <label htmlFor="edit-name">Name: </label>
            <input
                id="edit-name"
                name="name"
                type="text"
                value={tempFriend.name}
                onChange={handleChange}
            />
            <label htmlFor="edit-age">Age: </label>
            <input
                id="edit-age"
                name="age"
                type="number"
                value={tempFriend.age}
                onChange={handleChange}
            />
            <label htmlFor="edit-email">Email: </label>
            <input
                id="edit-email"
                name="email"
                type="email"
                value={tempFriend.email}
                onChange={handleChange}
            />
            <button type="submit">Edit friend</button>
        </form>
    );
};

export default EditFriendForm;
