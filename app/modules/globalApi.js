
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

export function post(uri, body, header, callback) {
    // console.log("post-body", body);
    // console.log("post-header", header);
    return fetch(uri, {
        method: 'post',
        headers: {
            ...header,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(
            response => {
                // console.log("post-response", response);
                return response.json();
            },
            err => {
                // console.log(err);
                const error = new Error(err);
                error.response = response;
                throw error;
            }
        )
        .then(data => {
            // console.log("post-data", data);
            callback && callback(true, data, null)
        })
        .catch((error) => {
            // console.log("post-error", error);
            callback && callback(false, null, error)
        });
}

export function put(uri, body, callback) {
    // console.log("uri", uri);
    // console.log("put-body", body);
    return fetch(uri, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(
            response => {
                // console.log("put-response", response);
                return response.json();
            },
            err => {
                console.log(err);
                const error = new Error(err);
                error.response = response;
                throw error;
            }
        )
        .then(data => {
            // console.log("data", data);
            callback && callback(true, data, null)
        })
        .catch((error) => {
            // console.log(error);
            callback && callback(false, null, error)
        });
}