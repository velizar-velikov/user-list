import UserTableHeaderCell from './user-table-header-cell/UserTableHeaderCell.jsx';
import UserTableRow from './user-table-row/UserTableRow.jsx';

export default function UserTable({ users, onEditPress, onInfoPress, setShowDelete, onSortPress, setIsAscendingState }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Image</th>
                    <UserTableHeaderCell
                        criteriaName={'firstName'}
                        onSortPress={onSortPress}
                        setIsAscendingState={setIsAscendingState}
                    />
                    <UserTableHeaderCell
                        criteriaName={'lastName'}
                        onSortPress={onSortPress}
                        setIsAscendingState={setIsAscendingState}
                    />
                    <UserTableHeaderCell
                        criteriaName={'email'}
                        onSortPress={onSortPress}
                        setIsAscendingState={setIsAscendingState}
                    />
                    <UserTableHeaderCell
                        criteriaName={'phoneNumber'}
                        onSortPress={onSortPress}
                        setIsAscendingState={setIsAscendingState}
                    />
                    <UserTableHeaderCell
                        criteriaName={'createdAt'}
                        onSortPress={onSortPress}
                        setIsAscendingState={setIsAscendingState}
                    />
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <UserTableRow
                        key={user._id}
                        user={user}
                        onEditPress={onEditPress}
                        onInfoPress={onInfoPress}
                        setShowDelete={setShowDelete}
                    />
                ))}
            </tbody>
        </table>
    );
}
