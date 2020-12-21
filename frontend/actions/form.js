import fetch from 'isomorphic-fetch'
import { API } from '../config'


//create a blog
export const emailContactForm = (data) => {
    let endpoint
    
    if(data.authorEmail){
        endpoint = `${API}/contact-blog-author`
    }else{
        endpoint = `${API}/contact`
    }
    

    return fetch(endpoint, {
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