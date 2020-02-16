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
    max-height: calc(100vh - (99px + 2rem));
    margin: 0 auto;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-bottom: 1rem;
`;

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 150px;
    margin: 1rem auto;
`;

const AddLabel = styled.label`
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const AddIcon = styled(IoMdAddCircleOutline)`
    cursor: pointer;
    font-size: 1.5rem;
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
                setFriends(res.data);
            })
            .catch(err => console.log("Error getting friends: ".err));
    };

    const handleDelete = friendToDelete => {
        axiosWithAuth()
            .delete(`/friends/${friendToDelete.id}`, friendToDelete)
            .then(res => {
                setFriends(res.data);
            })
            .catch(err => console.log("Error deleting friend: ", err));

        setFriendToEdit(null);
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <div>
            <AddContainer>
                <AddLabel htmlFor="add-friend" onClick={toggleIsAddingFriend}>
                    Add New Friend
                </AddLabel>
                <AddIcon id="add-friend" onClick={toggleIsAddingFriend} />
            </AddContainer>

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
                />
            )}

            <FriendsContainer>
                {friends.length &&
                    friends.map(friend => (
                        <Friend
                            key={friend.id}
                            friend={friend}
                            toggleisEditingFriend={toggleisEditingFriend}
                            handleDelete={handleDelete}
                        />
                    ))}
            </FriendsContainer>
        </div>
    );
};

export default Friends;
