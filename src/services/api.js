import { api, handleError, handleResponse } from "./api.services";

export const addTask = (data) =>
    api().post('/tasks',data) 
    .then(handleResponse)
    .catch(handleError)

    
export const updateTask = (id,data) =>
    api().put(`/tasks/${id}`,data) 
    .then(handleResponse)
    .catch(handleError)
    
export const deleteTask = (id) =>
    api().delete(`/tasks/${id}`) 
    .then(handleResponse)
    .catch(handleError)
    
export const getAllTask = (page) =>
    api().get(`/tasks?page=${page}`) 
    .then(handleResponse)
    .catch(handleError)
    
export const getTask = (id) =>
    api().get(`/tasks/${id}`) 
    .then(handleResponse)
    .catch(handleError)