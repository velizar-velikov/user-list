import { useState } from 'react';

export default function UserTableHeaderCell({ criteriaName, onSortPress, setIsAscendingState }) {
    const [isAscending, setIsAscending] = useState(false);
    const [isSorted, setIsSorted] = useState(false);

    function sortColumn(event) {
        setIsAscending(!isAscending);
        setIsAscendingState(isAscending);
        setIsSorted(true);

        onSortPress(event);
    }

    const dOptions = {
        dArrowUp:
            'M374.6 201.4l-160-160C208.4 35.1 200.2 32 192 32s-16.38 3.125-22.62 9.375l-160 160c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0L160 141.2V448c0 17.69 14.33 32 32 32s32-14.31 32-32V141.2l105.4 105.4c12.5 12.5 32.75 12.5 45.25 0S387.1 213.9 374.6 201.4z',
        dArrowDown:
            'M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z',
    };

    let dValue = dOptions.dArrowDown;

    if (isSorted && isAscending) {
        dValue = dOptions.dArrowUp;
    }

    const nameOptions = {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        phoneNumber: 'Phone',
        createdAt: 'Created',
    };
    return (
        <th onClick={sortColumn} data-criteria={criteriaName}>
            {nameOptions[criteriaName]}
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
            >
                <path fill="currentColor" d={dValue}></path>
            </svg>
        </th>
    );
}
