const CORS_API_URL = 'https://cors-anywhere.herokuapp.com/';

const fetchWithCORSProxy = (url: string): Promise<Response> => {
    return fetch(CORS_API_URL + url);
};

export default fetchWithCORSProxy;
