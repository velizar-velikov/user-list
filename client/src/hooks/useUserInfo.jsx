import { useState } from 'react';

export function useUserInfo(users) {
    const [userData, setUserData] = useState({});
    const [showDetails, setShowDetails] = useState(false);

    async function onInfoPress(event) {
        event.preventDefault();
        const userId = event.currentTarget.parentElement.dataset.id;

        const user = users.find((user) => user._id == userId);
        setUserData(user);
        setShowDetails(true);
    }

    async function onCloseInfoPress(event) {
        event.preventDefault();
        setShowDetails(false);
    }

    return {
        userData,
        showDetails,
        setUserData,
        onInfoPress,
        onCloseInfoPress,
    };
}
