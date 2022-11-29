import axios from 'axios'

const RIDE_REST_API_URL = '/ride';

export default axios.create({
    baseURL: RIDE_REST_API_URL
})