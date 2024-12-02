import UserTableHeaderCell from './user-table-header-cell/UserTableHeaderCell.jsx';
import UserTableRow from './user-table-row/UserTableRow.jsx';

export default function UserTable({ users, onEditPress, onInfoPress, onDeletePress, onSortPress }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Image</th>
                    <UserTableHeaderCell criteriaName={'firstName'} onSortPress={onSortPress} />
                    <UserTableHeaderCell criteriaName={'lastName'} onSortPress={onSortPress} />
                    <UserTableHeaderCell criteriaName={'email'} onSortPress={onSortPress} />
                    <UserTableHeaderCell criteriaName={'phoneNumber'} onSortPress={onSortPress} />
                    <UserTableHeaderCell criteriaName={'createdAt'} onSortPress={onSortPress} />
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
                        onDeletePress={onDeletePress}
                    />
                ))}
            </tbody>
        </table>
    );
}
