import { useState } from 'react';
import { useLoadUsers } from '../../hooks/useLoadUsers.jsx';
import { useUserInfo } from '../../hooks/useUserInfo.jsx';
import { useDelete } from '../../hooks/useDelete.jsx';

import Search from '../search/Search.jsx';
import LoadingSpinner from './loading-spinner/LoadingSpinner.jsx';
import NoUsersYet from './no-users-yet/NoUsersYet.jsx';
import NoSearchFound from './no-search-found/NoSearchFound.jsx';
import ErrorFetch from './error-fetch/ErrorFetch.jsx';
import UserTable from './user-table/UserTable.jsx';
import CreateEdit from '../create-edit/CreateEdit.jsx';
import UserDetails from '../user-details/UserDetails.jsx';
import Pagination from '../pagination/Pagination.jsx';

import { createUser, deleteUser, getAllUsers, getUserById, searchUsers, updateUser } from '../../api/users.js';
import { createUserObject } from '../../util/createUserObject.js';
import Delete from '../delete/Delete.jsx';

export default function UsersSection({ onAddHandler }) {
    const { users, isLoading, noUsersYet, hasFetchFailed, setUsers } = useLoadUsers();
    const { userData, showDetails, setUserData, onInfoPress, onCloseInfoPress } = useUserInfo();

    const { showDelete, onDeletePress, onDeleteUser, cancelDelete } = useDelete(users, setUsers);

    const [noSearchFound, setNoSearchFound] = useState(false);

    // show pages state
    const [showAdd, setShowAdd] = useState(false);
    const [isCreate, setIsCreate] = useState(false); // if false we show edit page

    const [isAscendingState, setIsAscendingState] = useState(true);

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

    function onCloseHandler(event) {
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
        setNoSearchFound(false);

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

        if (!search) {
            alert('Please enter search value');
            return;
        }

        const foundUsers = await searchUsers(criteria, search);
        if (foundUsers.length == 0) {
            setNoSearchFound(true);
        }
        setUsers(foundUsers);
    }

    function onSortPress(event) {
        event.preventDefault();
        const criteria = event.currentTarget.dataset.criteria;

        // TODO: fix sorting by createdAt, as it is sorting in alphabetical order, not by date
        const sortedUsers = users.toSorted((a, b) => {
            if (isAscendingState) {
                return a[criteria].localeCompare(b[criteria]);
            }
            return b[criteria].localeCompare(a[criteria]);
        });

        setUsers((oldUsers) => sortedUsers);
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

                {showDelete && <Delete onDeleteUser={onDeleteUser} cancelDelete={cancelDelete} />}

                <UserTable
                    users={users}
                    onEditPress={onEditPress}
                    onInfoPress={onInfoPress}
                    onCloseInfoPress={onCloseInfoPress}
                    onDeletePress={onDeletePress}
                    onSortPress={onSortPress}
                    setIsAscendingState={setIsAscendingState}
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
