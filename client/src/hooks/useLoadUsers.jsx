import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/users.js';

export function useLoadUsers() {
    const [allUsers, setAllUsers] = useState([]);

    // errors and loading state
    const [noUsersYet, setNoUsersYet] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetchFailed, setHasFetchFailed] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            try {
                const allUsers = await getAllUsers();
                if (allUsers.length == 0) {
                    setNoUsersYet(true);
                }
                setAllUsers(allUsers);
            } catch (error) {
                setHasFetchFailed(true);
            }
            setIsLoading(false);
        }
        loadUsers();
    }, []);

    return {
        allUsers,
        isLoading,
        noUsersYet,
        hasFetchFailed,
        setAllUsers,
    };
}
