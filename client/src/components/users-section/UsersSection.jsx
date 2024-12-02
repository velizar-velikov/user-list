import { useEffect, useState } from 'react';

import Search from '../search/Search.jsx';
import NoUsersYet from './no-users-yet/NoUsersYet.jsx';
import NoSearchFound from './no-search-found/NoSearchFound.jsx';
import ErrorFetch from './error-fetch/ErrorFetch.jsx';
import UserTable from './user-table/UserTable.jsx';
import Pagination from '../pagination/Pagination.jsx';
import LoadingSpinner from './loading-spinner/LoadingSpinner.jsx';

import { createUser, getAllUsers, getUserById, updateUser } from '../../api/users.js';
import CreateEdit from '../create-edit/CreateEdit.jsx';
import { createUserObject } from '../../util/createUserObject.js';

export default function UsersSection({ onAddHandler }) {
    const [users, setUsers] = useState([]);
    const [noUsersYet, setNoUsersYet] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetchFailed, setHasFetchFailed] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const [isCreate, setIsCreate] = useState(false);

    const [userData, setUserData] = useState({});

    useEffect(() => {
        async function loadUsers() {
            try {
                const responseUsers = await getAllUsers();
                if (responseUsers.length == 0) {
                    setNoUsersYet(true);
                }

                setUsers(responseUsers);
            } catch (error) {
                setHasFetchFailed(true);
            }
            setIsLoading(false);
        }
        loadUsers();
    }, []);

    function onAddHandler(event) {
        event.preventDefault();
        setIsCreate(true);
        setUserData({});
        setShowAdd(true);
    }

    async function onEditPress(event) {
        event.preventDefault();
        const userId = event.currentTarget.dataset.id;

        setIsCreate(false);

        const user = await getUserById(userId);
        setShowAdd(true);
        setUserData(user);
    }

    function onCloseHandler(event) {
        event.preventDefault();
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

    return (
        <section className="card users-container">
            <Search />

            {/* Table component */}
            <div className="table-wrapper">
                {/* Overlap components  */}

                {isLoading && <LoadingSpinner />}

                {noUsersYet && <NoUsersYet />}

                {/* No content overlap component  */}
                {/* <NoSearchFound /> */}

                {hasFetchFailed && <ErrorFetch />}

                <UserTable users={users} onEditPress={onEditPress} />
            </div>

            {showAdd && (
                <CreateEdit
                    user={userData}
                    onCloseHandler={onCloseHandler}
                    onSaveNewUser={onSaveNewUser}
                    onSaveEditedUser={onSaveEditedUser}
                    isCreate={isCreate}
                />
            )}

            <button onClick={onAddHandler} className="btn-add btn">
                Add new user
            </button>

            <Pagination />
        </section>
    );
}
