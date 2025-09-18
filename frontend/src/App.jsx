import React from 'react'
import { Router, Route, Routes } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import './App.css'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div className='text-xl text-red-500'>Home, Atharva testing-shadcn installed<Button onClick={() => { console.log("clicked") }}>Atharva testing</Button></div>} />
      <Route path="/about" element={<div className='text-xl text-red-600'>About</div>} />
    </Routes>
  )
}

export default App