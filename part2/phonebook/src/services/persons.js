import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    // Returns the data of all persons
    const request = axios.get(baseUrl)
    const responseData = request.then(response => response.data)
    return responseData
}

const post = (person) => {
    return axios.post(baseUrl, person)
}

const put = (person) => {
    return axios.put(baseUrl, person)
}

const functions = {getAll, post, put}
export default functions