
import axios from 'axios'
import {url} from '../const';


export const api = () => {
    return axios.create({
        baseURL:url
    })
}

export const handleResponse = res => {
    try{
        const data = res.data;
        if(res.data.error) {
            const error = data.message ? data.message : data.error
            return Promise.reject(error)
        }
        return data
    }catch(err) {
        console.log(err)
    }
}

export const handleError = err =>{
    if(err?.response?.status === 400){
        window.location(url)
    }
    return err?.response?.data
}