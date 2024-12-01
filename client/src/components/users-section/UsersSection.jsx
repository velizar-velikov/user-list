import { useEffect, useState } from 'react';

import Search from '../search/Search.jsx';
import NoUsersYet from './no-users-yet/NoUsersYet.jsx';
import NoSearchFound from './no-search-found/NoSearchFound.jsx';
import ErrorFetch from './error-fetch/ErrorFetch.jsx';
import UserTable from './user-table/UserTable.jsx';
import Pagination from '../pagination/Pagination.jsx';
import LoadingSpinner from './loading-spinner/LoadingSpinner.jsx';
import { getAllUsers } from '../../api/users.js';

export default function UsersSection() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const responseUsers = await getAllUsers();
            setUsers(responseUsers);
        }
        loadUsers();
    }, []);

    return (
        <section className="card users-container">
            {/* Search bar component */}
            <Search />

            {/* Table component */}
            <div className="table-wrapper">
                {/* Overlap components  */}

                {!users.length && <LoadingSpinner />}

                {/* No users added yet  */}
                {/* <NoUsersYet /> */}

                {/* No content overlap component  */}
                {/* <NoSearchFound /> */}

                {/* On error overlap component  */}
                {/* <ErrorFetch /> */}

                {/* </div> */}

                <UserTable users={users} />
            </div>

            {/* New user button  */}
            <button className="btn-add btn">Add new user</button>

            {/* Pagination component  */}
            <Pagination />
        </section>
    );
}
