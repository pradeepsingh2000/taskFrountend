
import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Task from './pages/task'

export default function ReactRoutes() {
  return (
    <Routes>
    <Route path="/" element={<Task/>} / >
   </Routes>
  )
}
