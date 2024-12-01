import { del, get, post, put } from './request.js';

const BASE_URL = 'http://localhost:3030/jsonstore';

const endpoints = {
    all: '/users',
    one: (id) => `/users/${id}`,
};

export async function getAllUsers() {
    return get(BASE_URL + endpoints.all);
}

export async function getUserById(id) {
    return get(BASE_URL + endpoints.one(id));
}

export async function createUser(data) {
    return post(BASE_URL + endpoints.all, data);
}

export async function updateUser(id, data) {
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
            a[criteria].localeCompare(b[criteria]);
        } else {
            b[criteria].localeCompare(a[criteria]);
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

    return users.slice(startIndex, endIndex);
}
