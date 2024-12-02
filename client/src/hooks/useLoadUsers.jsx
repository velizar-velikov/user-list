import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/users.js';

export function useLoadUsers() {
    const [users, setUsers] = useState([]);

    // errors and loading state
    const [noUsersYet, setNoUsersYet] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetchFailed, setHasFetchFailed] = useState(false);

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

    return {
        users,
        isLoading,
        noUsersYet,
        hasFetchFailed,
        setUsers,
    };
}
