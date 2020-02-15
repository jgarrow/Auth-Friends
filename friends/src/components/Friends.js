import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

import { IoMdAddCircleOutline } from "react-icons/io";

import AddFriendForm from "./AddFriendForm";
import EditFriendForm from "./EditFriendForm";
import Modal from "./Modal";
import Friend from "./Friend";

const FriendsContainer = styled.div`
    width: 80%;
    height: 100%;
    max-height: 100vh;
    margin: 0 auto;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-bottom: 2rem;
`;

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [isAddingFriend, setIsAddingFriend] = useState(false);
    const [isEditingFriend, setIsEditingFriend] = useState(false);
    const [friendToEdit, setFriendToEdit] = useState(null);

    const toggleIsAddingFriend = e => {
        setIsAddingFriend(!isAddingFriend);
    };

    const toggleisEditingFriend = friend => {
        if (!isEditingFriend) {
            setFriendToEdit(friend);
        } else {
            setFriendToEdit(null);
        }

        setIsEditingFriend(!isEditingFriend);
    };

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
            <IoMdAddCircleOutline onClick={toggleIsAddingFriend} />

            {isAddingFriend && (
                <Modal
                    form={AddFriendForm}
                    setFriends={setFriends}
                    toggleIsAddingFriend={toggleIsAddingFriend}
                    isAdding={true}
                />
            )}

            {isEditingFriend && (
                <Modal
                    form={EditFriendForm}
                    setFriends={setFriends}
                    toggleisEditingFriend={toggleisEditingFriend}
                    friendToEdit={friendToEdit}
                    setFriendToEdit={setFriendToEdit}
                    setFriendToEdit={setFriendToEdit}
                />
            )}

            <FriendsContainer>
                {friends.length &&
                    friends.map(friend => (
                        <Friend
                            key={friend.id}
                            friend={friend}
                            toggleisEditingFriend={toggleisEditingFriend}
                        />
                    ))}
            </FriendsContainer>
        </div>
    );
};

export default Friends;
