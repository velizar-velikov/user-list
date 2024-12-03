import { useState } from 'react';
import { createUser, getUserById, updateUser } from '../api/users.js';
import { createUserObject } from '../util/createUserObject.js';

export function useCreateEdit(users, setUsers) {
    const [user, setUser] = useState({});
    const [showAdd, setShowAdd] = useState(false);
    const [isCreate, setIsCreate] = useState(false); // if false we show edit page

    function onAddHandler() {
        setIsCreate(true);
        setUser({});
        setShowAdd(true);
    }

    async function onEditPress(event) {
        const userId = event.currentTarget.parentElement.dataset.id;

        setIsCreate(false);

        const user = users.find((user) => user._id == userId);
        setShowAdd(true);
        setUser(user);
    }

    function onCloseHandler() {
        setShowAdd(false);
    }

    async function onSaveNewUser(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const userObject = createUserObject(null, data);

        const createdUser = await createUser(userObject);

        setUsers((oldUsers) => [...oldUsers, createdUser]);

        setShowAdd(false);
    }

    async function onSaveEditedUser(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        const userId = event.currentTarget.dataset.id;

        const userIndex = users.findIndex((user) => user._id == userId);
        const userObject = createUserObject(userId, data);

        const updatedUser = await updateUser(userId, userObject);

        setUsers((oldUsers) => oldUsers.toSpliced(userIndex, 1, updatedUser));

        setShowAdd(false);
    }

    return {
        editUserData: user,
        showAdd,
        isCreate,
        onAddHandler,
        onEditPress,
        onCloseHandler,
        onSaveNewUser,
        onSaveEditedUser,
    };
}
