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
    const url = `${baseUrl}/${person.id}`
    const request = axios.put(url, person)
    const responseData = request.then(response => response.data)
    return responseData
}

const del = (person) => {
    const url = `${baseUrl}/${person.id}`
    return axios.delete(url)
}

const functions = {getAll, post, put, del}
export default functions