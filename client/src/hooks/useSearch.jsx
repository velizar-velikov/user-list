import { useState } from 'react';
import { getAllUsers, searchUsers } from '../api/users.js';

export function useSearch(setUsers) {
    const [noSearchFound, setNoSearchFound] = useState(false);

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

    return {
        noSearchFound,
        onSearchPress,
    };
}
