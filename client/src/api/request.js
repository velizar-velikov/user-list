async function request(url, options) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    } catch (error) {
        alert(error.message);
        throw new Error(error.message);
    }
}

function createOptions(method = 'GET', data) {
    const options = {
        method,
        headers: {},
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('POST', data));
}

export async function put(url, data) {
    return request(url, createOptions('PUT', data));
}

export async function del(url) {
    return request(url, createOptions('DELETE'));
}
