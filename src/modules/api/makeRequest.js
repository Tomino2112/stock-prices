// @TODO In robust app this would be abstracted to config/env file
const apiUrl = 'https://finnhub.io/api/v1/';

const normalizeRequestError = (statusCode, message) => ({
    code: statusCode,
    message,
});

export default async (path, method = 'GET') => {
    const url = new URL(path, apiUrl);
    let response;

    try {
        response = await fetch(
            `${url}&token=${process.env.REACT_APP_FINNHUB_API_KEY}`,
            {
                method,
                headers: {}
            }
        );
    } catch (requestError) {
        return Promise.reject(normalizeRequestError(666));
    }

    let data;

    try {
        data = await response.json();
    } catch(parseError) {
        data = {};
    }

    return response.ok
        ? data
        : Promise.reject(normalizeRequestError(
            response.status,
            data && data.error && data.error.message
        ));
};