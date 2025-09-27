const fetch = require('node-fetch');

async function fetchApi() {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching external data:', error.message);
        return null; 
    }
}

module.exports = {
    fetchApi
};