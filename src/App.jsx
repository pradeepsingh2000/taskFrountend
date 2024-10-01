
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ReactRoutes from './routes'
import "react-toastify/dist/ReactToastify.css"


function App() {

  return (
   <>
   <BrowserRouter>
 <ReactRoutes/>
   
   </BrowserRouter>

   
   <ToastContainer
   autoClose
   position='top-right'
   hideProgressBar
   closeOnClick
   />
   
   </>
  )
}

export default App
