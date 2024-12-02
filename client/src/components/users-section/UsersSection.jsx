import { useEffect, useState } from 'react';

import Search from '../search/Search.jsx';
import LoadingSpinner from './loading-spinner/LoadingSpinner.jsx';
import NoUsersYet from './no-users-yet/NoUsersYet.jsx';
import NoSearchFound from './no-search-found/NoSearchFound.jsx';
import ErrorFetch from './error-fetch/ErrorFetch.jsx';
import UserTable from './user-table/UserTable.jsx';
import CreateEdit from '../create-edit/CreateEdit.jsx';
import UserDetails from '../user-details/UserDetails.jsx';
import Pagination from '../pagination/Pagination.jsx';

import { createUser, getAllUsers, getUserById, searchUsers, updateUser } from '../../api/users.js';
import { createUserObject } from '../../util/createUserObject.js';

export default function UsersSection({ onAddHandler }) {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({});

    // errors and loading state
    const [noUsersYet, setNoUsersYet] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetchFailed, setHasFetchFailed] = useState(false);
    const [noSearchFound, setNoSearchFound] = useState(false);

    // show pages state
    const [showAdd, setShowAdd] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isCreate, setIsCreate] = useState(false); // if false we show edit page

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

    // show pages handlers
    function onAddHandler(event) {
        event.preventDefault();
        setIsCreate(true);
        setUserData({});
        setShowAdd(true);
    }

    async function onEditPress(event) {
        event.preventDefault();
        const userId = event.currentTarget.parentElement.dataset.id;

        setIsCreate(false);

        const user = await getUserById(userId);
        setShowAdd(true);
        setUserData(user);
    }

    async function onInfoPress(event) {
        event.preventDefault();
        const userId = event.currentTarget.parentElement.dataset.id;

        const user = await getUserById(userId);
        setUserData(user);
        setShowDetails(true);
    }

    async function onCloseInfoPress(event) {
        event.preventDefault();
        setShowDetails(false);
    }

    function onCloseHandler(event) {
        event.preventDefault();
        setShowAdd(false);
    }

    // handlers communicating with api
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

    async function onSearchPress(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const { search, criteria } = Object.fromEntries(formData);

        if (!search && !criteria) {
            const allUsers = await getAllUsers();
            setUsers(allUsers);
            return;
        }

        if (!criteria) {
            alert('Please choose criteria first');
            return;
        }

        const foundUsers = await searchUsers(criteria, search);
        if (foundUsers.length == 0) {
            setNoSearchFound(true);
        }
        setUsers(foundUsers);
    }

    return (
        <section className="card users-container">
            <Search onSearchPress={onSearchPress} />

            {/* Table component */}
            <div className="table-wrapper">
                {/* Overlap components  */}

                {isLoading && <LoadingSpinner />}

                {noUsersYet && <NoUsersYet />}

                {noSearchFound && <NoSearchFound />}

                {hasFetchFailed && <ErrorFetch />}

                <UserTable
                    users={users}
                    onEditPress={onEditPress}
                    onInfoPress={onInfoPress}
                    onCloseInfoPress={onCloseInfoPress}
                />
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

            {showDetails && <UserDetails user={userData} onCloseInfoPress={onCloseInfoPress} />}

            <button onClick={onAddHandler} className="btn-add btn">
                Add new user
            </button>

            <Pagination />
        </section>
    );
}
