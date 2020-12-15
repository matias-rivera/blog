import fetch from 'isomorphic-fetch'
import { API } from '../config'


//create a blog
export const createBlog = (blog, token) => {
    return fetch(`${API}/blog`, {
        method: 'POST',
        headers:{
            Accept:'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//list blogs with categories and tags
export const listBlogsWithCategoriesAndTags = (skip, limit) => {
    const data = {
        limit, skip
    }
    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

//get a single blog
export const singleBlog = slug => {
    return fetch(`${API}/blog/${slug}`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

