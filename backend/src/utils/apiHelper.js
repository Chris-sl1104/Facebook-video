const fetchDynamic = async () => (await import('node-fetch')).default;

/**
 * General HTTP request utility function
 * @param {Object} options - Request options
 * @param {string} options.url - The request URL
 * @param {string} [options.method='GET'] - The HTTP method (default: GET)
 * @param {Object} [options.headers={}] - Custom headers for the request
 * @param {Object} [options.body=null] - Request body (for POST/PUT requests)
 * @returns {Promise<Object>} - The response data as a JSON object
 * @throws {Error} - Throws an error if the request fails
 */
exports.apiRequest = async ({ url, method = 'GET', headers = {}, body = null }) => {
    const requestOptions = { method, headers };

    if (body) {
        requestOptions.body = JSON.stringify(body);
        requestOptions.headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        const errorDetails = await response.json();
        console.error('API Request Failed:', errorDetails);
        throw new Error(`API Request failed with status ${response.status} - ${response.statusText}`);
    }

    return await response.json();
};