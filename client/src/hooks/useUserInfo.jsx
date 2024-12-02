import { useState } from 'react';
import { getUserById } from '../api/users.js';

export function useUserInfo() {
    const [userData, setUserData] = useState({});
    const [showDetails, setShowDetails] = useState(false);

    async function onInfoPress(event) {
        event.preventDefault();
        const userId = event.currentTarget.parentElement.dataset.id;

        const user = await getUserById(userId);
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
