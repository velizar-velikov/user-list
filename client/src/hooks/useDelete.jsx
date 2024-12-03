import { useState } from 'react';
import { deleteUser, getUserById } from '../api/users.js';

export function useDelete(users, setUsers) {
    const [user, setUser] = useState({});
    const [showDelete, setShowDelete] = useState(false);

    async function onDeletePress(event) {
        setShowDelete(true);
        const userId = event.currentTarget.parentElement.dataset.id;
        const user = users.find((user) => user._id == userId);
        setUser(user);
    }

    async function onDeleteUser() {
        const userId = user._id;

        setShowDelete(false);
        await deleteUser(userId);

        const deletedUserIndex = users.findIndex((user) => user._id == userId);
        setUsers((oldUsers) => oldUsers.toSpliced(deletedUserIndex, 1));
    }

    function cancelDelete() {
        setShowDelete(false);
    }

    return {
        showDelete,
        onDeletePress,
        onDeleteUser,
        cancelDelete,
    };
}
