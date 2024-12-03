import { useState } from 'react';
import { deleteUser, getUserById } from '../api/users.js';

export function useDelete(users, setUsers) {
    const [user, setUser] = useState({});
    const [showDelete, setShowDelete] = useState(false);

    async function onDeletePress(event) {
        const userId = event.currentTarget.parentElement.dataset.id;
        setShowDelete(true);
        const user = await getUserById(userId);
        setUser(user);
    }

    async function onDeleteUser() {
        const userId = user._id;

        await deleteUser(userId);

        const deletedUserIndex = users.findIndex((user) => user._id == userId);
        setUsers((oldUsers) => oldUsers.toSpliced(deletedUserIndex, 1));
        setShowDelete(false);
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