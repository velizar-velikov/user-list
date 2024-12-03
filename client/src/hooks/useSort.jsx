import { useState } from 'react';

export function useSort(users, setUsers) {
    const [isAscendingState, setIsAscendingState] = useState(true);

    function onSortPress(event) {
        event.preventDefault();
        const criteria = event.currentTarget.dataset.criteria;

        // TODO: fix sorting by createdAt, as it is sorting in alphabetical order, not by date
        const sortedUsers = users.toSorted((a, b) => {
            if (isAscendingState) {
                return a[criteria].localeCompare(b[criteria]);
            }
            return b[criteria].localeCompare(a[criteria]);
        });

        setUsers((oldUsers) => sortedUsers);
    }

    return {
        onSortPress,
        setIsAscendingState,
    };
}
