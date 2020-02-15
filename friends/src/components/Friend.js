import React from "react";
import styled from "styled-components";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const Card = styled.div`
    position: relative;
    border-radius: 8px;
    box-shadow: 0px 0px 4px 0px rgb(230, 229, 229);
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem auto;
    width: 300px;
`;

const EditIcon = styled(MdEdit)`
    position: absolute;
    top: 8px;
    right: 25px;
    cursor: pointer;
    font-size: 1.25rem;
`;

const TrashIcon = styled(FaRegTrashAlt)`
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 3px;
`;

const Friend = ({ friend, toggleisEditingFriend, handleDelete }) => {
    return (
        <Card>
            <EditIcon onClick={() => toggleisEditingFriend(friend)} />
            <TrashIcon onClick={() => handleDelete(friend)} />
            <h2>{friend.name}</h2>
            <p>Age: {friend.age}</p>
            <p>Email: {friend.email}</p>
        </Card>
    );
};

export default Friend;
