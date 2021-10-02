import axios from 'axios';

const url = 'https://weconnect-dev-de5dc-default-rtdb.asia-southeast1.firebasedatabase.app/'

export default axios.create({
    baseURL: url
});
