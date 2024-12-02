import { del, get, post, put } from './request.js';

const BASE_URL = 'http://localhost:3030/jsonstore';

const endpoints = {
    all: '/users',
    one: (id) => `/users/${id}`,
};

export async function getAllUsers() {
    const usersData = await get(BASE_URL + endpoints.all);
    return Object.values(usersData);
}

export async function getUserById(id) {
    return get(BASE_URL + endpoints.one(id));
}

export async function createUser(data) {
    // server does not automatically generate these properties
    const date = new Date().toISOString();
    return post(BASE_URL + endpoints.all, { ...data, createdAt: date, updatedAt: date });
}

export async function updateUser(id, data) {
    const user = await getUserById(id);

    data.createdAt = user.createdAt;
    data.updatedAt = new Date().toISOString();

    return put(BASE_URL + endpoints.one(id), data);
}

export async function deleteUser(id) {
    return del(BASE_URL + endpoints.one(id));
}

/**
 * Returns users matching value by given criteria
 * @param { 'firstName' | 'lastName' | 'email' | 'phoneNumber' } criteria
 * @param {string} value
 */
export async function searchUsers(criteria, value) {
    const validCriteria = ['firstName', 'lastName', 'email', 'phoneNumber'];

    if (!validCriteria.includes(criteria)) {
        throw new Error('Invalid criteria');
    }

    const allUsers = await getAllUsers();
    const filteredUsers = allUsers.filter((user) => user[criteria] === value);
    return filteredUsers;
}

/**
 * Returns sorted users by given criteria either ascending or descending
 * @param { 'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'createdAt' } criteria
 * @param {boolean} isAscending
 */
export async function getSortedUsers(criteria, isAscending) {
    const validCriteria = ['firstName', 'lastName', 'email', 'phoneNumber', 'createdAt'];

    if (!validCriteria.includes(criteria)) {
        throw new Error('Invalid criteria');
    }

    const users = await getAllUsers();

    function sortUsers(a, b) {
        if (isAscending) {
            return a[criteria].localeCompare(b[criteria]);
        } else {
            return b[criteria].localeCompare(a[criteria]);
        }
    }
    return users.sort(sortUsers);
}

/**
 * Returns users only for specified page
 * @param {number} itemsPerPage
 * @param {number} page
 */
export async function getUsersPagination(itemsPerPage, page) {
    const users = await getAllUsers();

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (startIndex < 0 || endIndex > users.length - 1) {
        throw new Error('Invalid page');
    }

    return users.slice(startIndex, endIndex);
}
