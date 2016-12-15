export const serverUrl = `http://0.0.0.0:5100`;

export const api = (method, apiEndpoint, data) => {
    // This should be one statement, get rid of the case statement and make this one statement

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