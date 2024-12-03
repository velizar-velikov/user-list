import { useState } from 'react';
import { deleteUser, getUserById } from '../api/users.js';

export function useDelete(users, setUsers) {
    const [user, setUser] = useState({});
    const [showDelete, setShowDelete] = useState(false);

    async function onDeletePress(event) {
        setShowDelete(true);
        const userId = event.currentTarget.parentElement.dataset.id;
        const user = await getUserById(userId);
        setUser(user);
    }

    // TODO: manage to get the current userId to delete it
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
