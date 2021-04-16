import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    // Returns the data of all persons
    const request = axios.get(baseUrl)
    const responseData = request.then(response => response.data)
    return responseData
}

const create = (person) => {
    return axios.post(baseUrl, person)
}

const update = (person) => {
    return axios.put(baseUrl, person)
}

const functions = {getAll, create, update}
export default functions