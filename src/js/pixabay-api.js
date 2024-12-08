`use strict`
import axios from 'axios';

const API_KEY = '47392325-3e255e53541a2cdc9281782e2';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

async function searchAPI(search, page = 1) {
    try {
        const { data } = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: search,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: PER_PAGE,
            page,
        },
        });
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Network error');
    }
}

export default searchAPI;
