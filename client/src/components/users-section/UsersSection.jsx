import { useLoadUsers } from '../../hooks/useLoadUsers.jsx';
import { useUserInfo } from '../../hooks/useUserInfo.jsx';
import { useCreateEdit } from '../../hooks/useCreateEdit.jsx';
import { useDelete } from '../../hooks/useDelete.jsx';
import { useSearch } from '../../hooks/useSearch.jsx';
import { useSort } from '../../hooks/useSort.jsx';

import Search from '../search/Search.jsx';
import LoadingSpinner from './loading-spinner/LoadingSpinner.jsx';
import NoUsersYet from './no-users-yet/NoUsersYet.jsx';
import NoSearchFound from './no-search-found/NoSearchFound.jsx';
import ErrorFetch from './error-fetch/ErrorFetch.jsx';
import UserTable from './user-table/UserTable.jsx';
import CreateEdit from '../create-edit/CreateEdit.jsx';
import UserDetails from '../user-details/UserDetails.jsx';
import Pagination from '../pagination/Pagination.jsx';

import Delete from '../delete/Delete.jsx';

export default function UsersSection() {
    const { users, isLoading, noUsersYet, hasFetchFailed, setUsers } = useLoadUsers();
    const { userData, showDetails, onInfoPress, onCloseInfoPress } = useUserInfo();
    const { editUserData, showAdd, isCreate, onAddHandler, onEditPress, onCloseHandler, onSaveNewUser, onSaveEditedUser } =
        useCreateEdit(users, setUsers);
    const { showDelete, onDeletePress, onDeleteUser, cancelDelete } = useDelete(users, setUsers);
    const { noSearchFound, onSearchPress } = useSearch(setUsers);
    const { onSortPress, setIsAscendingState } = useSort(users, setUsers);

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
                    user={editUserData}
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
