import { toast } from "react-toastify";


const success = (messages) => {
    toast.success(messages,{
        position:"top-right",
        autoClose:5000,
        hideProgressBar:true,
        closeOnClick:true
    })
}


const error = (messages) => {
    toast.error(messages,{
        position:"top-right",
        autoClose:5000,
        hideProgressBar:true,
        closeOnClick:true
    })
}

export default {success,error}