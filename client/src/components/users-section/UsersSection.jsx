import Search from '../search/Search.jsx';
import NoUsersYet from './no-users-yet/NoUsersYet.jsx';
import NoSearchFound from './no-search-found/NoSearchFound.jsx';
import ErrorFetch from './error-fetch/ErrorFetch.jsx';
import UserTable from './user-table/UserTable.jsx';
import Pagination from '../pagination/Pagination.jsx';

export default function UsersSection() {
    return (
        <section className="card users-container">
            {/* Search bar component */}
            <Search />

            {/* Table component */}
            <div className="table-wrapper">
                {/* Overlap components  */}
                {/* <div class="loading-shade"> */}
                {/* Loading spinner  */}
                {/* <div class="spinner"></div> */}

                {/* No users added yet  */}
                {/* <NoUsersYet /> */}

                {/* No content overlap component  */}
                {/* <NoSearchFound /> */}

                {/* On error overlap component  */}
                {/* <ErrorFetch /> */}

                {/* </div> */}

                <UserTable />
            </div>

            {/* New user button  */}
            <button className="btn-add btn">Add new user</button>

            {/* Pagination component  */}
            <Pagination />
        </section>
    );
}
