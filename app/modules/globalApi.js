
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

export function post(uri, body, callback) {
    // console.log(body);
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
            if (!response.ok) {
                // console.log(response);
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(data => {
            // console.log(data);
            callback && callback(true, data, null)
        })
        .catch((error) => {
            // console.log(error);
            callback && callback(false, null, error)
        });
}

export function put(uri, body, callback) {
    // console.log(body);
    return fetch(uri, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => {
            // if (response.status >= 200 && response.status < 300) {
            // console.log(response);
            if (!response.ok) {
                // console.log(response);
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .then(data => {
            // console.log("data", data);
            callback && callback(true, data, null)
        })
        .catch((error) => {
            // console.log(error);
            callback && callback(false, null, error)
        });
}