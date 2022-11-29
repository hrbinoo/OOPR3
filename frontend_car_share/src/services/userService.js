import axios from 'axios'

const CARS_REST_API_URL = '/user/';

export default axios.create({
    baseURL: CARS_REST_API_URL
})