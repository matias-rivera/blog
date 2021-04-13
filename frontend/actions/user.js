import fetch from 'isomorphic-fetch'
import { API } from '../config'
import { handleResponse } from './auth'

//create a blog
export const userPublicProfile = username => {
    return fetch(`${API}/user/${username}`, {
        method: 'GET',
        headers:{
            Accept:'application/json'
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}


export const getProfile = token => {
    return fetch(`${API}/user/profile`, {
        method: 'GET',
        headers:{
            Accept:'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        handleResponse(response)
        return response.json()
    })
    .catch(err => console.log(err))
}

export const update = (token, user) => {
    return fetch(`${API}/user/update`, {
        method: 'PUT',
        headers:{
            Accept:'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    })
    .then(response => {
        handleResponse(response)
        return response.json()
    })
    .catch(err => console.log(err))
}

//get Users
export const getUsers = (token) => {
    
    const endpoint = `${API}/user/latest`
    
    return fetch(endpoint, {
        method: 'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        handleResponse(response)
        return response.json()
    })
    .catch(err => console.log(err))
}