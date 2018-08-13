
export function get(uri, callback) {
    return fetch(uri/*, {
        headers: { Authorization: `Bearer ${accessToken}`},
    }*/)
    .then(response => {
        // if (response.status >= 200 && response.status < 300) {
        if (response.ok) {
            return response.json();
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    })
    .then(data => {
        callback(true, data, null)
    })
    .catch((error) => {
        callback(false, null, error)
    });
}

// body: {
//     email: userData.email,
//     password: userData.password,
// }
export function post(uri, body, callback) {
    return fetch(uri, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    .then(response => {
        // if (response.status >= 200 && response.status < 300) {
        if (response.ok) {
            return response.json();
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    })
    .then(data => {
        callback(true, data, null)
    })
    .catch((error) => {
        callback(false, null, error)
    });
}
