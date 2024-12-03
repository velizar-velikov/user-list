import { useEffect, useState } from 'react';

export function usePaginator(allUsers) {
    const [users, setUsers] = useState(allUsers);

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    const [pagesCount, setPagesCount] = useState(0);

    useEffect(() => {
        setPagesCount((pages) => Math.ceil(allUsers.length / itemsPerPage));

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex =
            page != pagesCount && itemsPerPage * page <= allUsers.length ? startIndex + itemsPerPage : allUsers.length;
        console.log({ itemsPerPage, startIndex, endIndex });

        setUsers((users) => allUsers.slice(startIndex, endIndex));
    }, [allUsers, itemsPerPage, page]);

    return { users, paginator: createPaginator() };

    function createPaginator() {
        return {
            itemsPerPage,
            onChangeItemsPerPage(event) {
                setPage(1);
                setItemsPerPage(Number(event.target.value));
            },
            onForwardPage() {
                if (page >= pagesCount) {
                    return;
                }
                setPage((page) => page + 1);
            },
            onBackPage() {
                if (page <= 1) {
                    return;
                }
                setPage((page) => page - 1);
            },
            onGoFirstPage: () => setPage(1),
            onGoLastPage: () => setPage(pagesCount),
        };
    }
}
