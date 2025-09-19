import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import { UserDataContext } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useNavigate,Navigate } from 'react-router-dom';
import { motion } from "motion/react"
const App = () => {
  const { user, loading } = useContext(UserDataContext);
  
  // Optional: Show a loading spinner while fetching user data
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-left"
        hideProgressBar={true}
        autoClose={1000}
        theme="dark"
        toastStyle={{
          background: "#18181b",
          color: "#fafafa",
          borderRadius: "10px",
          fontWeight: "500",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        }}
      />
      
      {/* Example of using user data */}

      {user && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <LandingPage /> : <Navigate to="/login" />} />
        <Route path="/about" element={<div className='text-xl text-red-600'>About</div>} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {user && <Footer />}
        
    </>
  );
};

export default App;