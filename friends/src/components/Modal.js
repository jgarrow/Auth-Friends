import React from "react";
import styled from "styled-components";

import { IoMdCloseCircleOutline } from "react-icons/io";

const Bg = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(128, 128, 128, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
`;

const CloseIcon = styled(IoMdCloseCircleOutline)`
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
`;

const Modal = ({
    form: Form,
    friendToEdit,
    setFriends,
    toggleIsAddingFriend,
    toggleisEditingFriend,
    isAdding,
    setFriendToEdit
}) => {
    return (
        <Bg>
            <CloseIcon
                onClick={
                    isAdding ? toggleIsAddingFriend : toggleisEditingFriend
                }
            />
            <Form
                setFriends={setFriends}
                friend={friendToEdit}
                setFriendToEdit={setFriendToEdit}
                toggleisEditingFriend={toggleisEditingFriend}
                toggleIsAddingFriend={toggleIsAddingFriend}
            />
        </Bg>
    );
};

export default Modal;
