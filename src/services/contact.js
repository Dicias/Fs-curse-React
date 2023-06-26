import axios from "axios";

const url = "/api/persons";

const getAll = () =>{
const request = axios.get(url)
return request.then(res => res.data)
}

const create = (nameObj)=>{
const request = axios.post(url, nameObj)
return request.then(res => res.data)

}

const remove = (id)=>{
    const request = axios.delete(`${url}/${id}`)
    return request.then(res => res.data)
}

const update = (id, datos)=>{
    const request = axios.put(`${url}/${id}`, datos)
    return request.then(res => res.data)
}

export default {getAll, create, remove, update}