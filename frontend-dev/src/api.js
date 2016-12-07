

export const serverUrl = `http://127.0.0.1:8000/`;

export const api = (method, apiEndpoint, data) => {
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
            }).then(handleErrors);
        case 'GET':
            return fetch(`${apiEndpoint}`, {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(handleErrors)
    }
};

function handleErrors(response) {
    if (!response.ok) {
        throw new Error({
            'message': 'Error happened',
        })
    }
    return response;
}