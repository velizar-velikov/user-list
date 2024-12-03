import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/users.js';

export function useLoadUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState(allUsers);

    // errors and loading state
    const [noUsersYet, setNoUsersYet] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetchFailed, setHasFetchFailed] = useState(false);

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    const [pagesCount, setPagesCount] = useState(0);

    function onChangeItemsPerPage(event) {
        setPage(1);
        setItemsPerPage(Number(event.target.value));
    }

    function onForwardPage() {
        console.log({ page, pagesCount });

        if (page >= pagesCount) {
            return;
        }
        setPage((page) => page + 1);
    }

    function onBackPage() {
        if (page <= 1) {
            return;
        }
        setPage((page) => page - 1);
    }

    function onGoFirstPage() {
        setPage(1);
    }

    function onGoLastPage() {
        setPage(pagesCount);
    }

    const paginator = {
        itemsPerPage,
        onChangeItemsPerPage,
        onForwardPage,
        onBackPage,
        onGoFirstPage,
        onGoLastPage,
    };

    useEffect(() => {
        async function loadUsers() {
            try {
                const allUsers = await getAllUsers();
                setPagesCount((pages) => Math.ceil(allUsers.length / itemsPerPage));
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

    useEffect(() => {
        setPagesCount((pages) => Math.ceil(allUsers.length / itemsPerPage));

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex =
            page != pagesCount && itemsPerPage * page <= allUsers.length ? startIndex + itemsPerPage : allUsers.length;
        console.log({ itemsPerPage });

        console.log(startIndex);
        console.log(endIndex);

        setUsers((users) => allUsers.slice(startIndex, endIndex));

        // console.log(users);
    }, [allUsers, itemsPerPage, page]);

    return {
        users,
        isLoading,
        noUsersYet,
        hasFetchFailed,
        setUsers,
        paginator,
    };
}
