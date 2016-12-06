

export const serverUrl = `http://127.0.0.1:8000/`;

export const api = (method, apiEndpoint, data, stateFunction) => {
    // How to how work with asynchronous code?
    // lots of errors

    switch (method) {

        case 'POST':
            return fetch(`${apiEndpoint}`, {
                method,
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => Promise.all([response, response.json()]))
                .then(handleErrors);
        case 'GET':
            fetch(`${apiEndpoint}`)
                .then(response => response.json())
                .then(json => stateFunction(json, data))
                .then(handleErrors)
    }
};

function handleErrors([response, json]) {
    if (!response.ok) {
        throw json;
    }
    return json;
}