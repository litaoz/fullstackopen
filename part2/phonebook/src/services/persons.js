import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    // Returns the data of all persons
    const request = axios.get(baseUrl)
    const responseData = request.then(response => response.data)
    return responseData
}

const post = (person) => {
    // Create a new person {name, phone} and return the response {...person, id}
    const request = axios.post(baseUrl, person)
    const responseData = request.then(response => response.data)
    return responseData
}

const put = (person) => {
    return axios.put(baseUrl, person)
}

const del = (person) => {
    return axios.delete(`${baseUrl}/${person.id}`)
}

const functions = {getAll, post, put, del}
export default functions