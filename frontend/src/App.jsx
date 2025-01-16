import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
        <><ToastContainer/></>
        <Header/>
        <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App