import React from 'react'
import { Router,Route,Routes } from 'react-router-dom'
import './App.css'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div className='text-xl text-red-500'>Home</div>} />
      <Route path="/about" element={<div className='text-xl text-red-600'>About</div>} />
    </Routes>
  )
}

export default App