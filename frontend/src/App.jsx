import React, { useContext } from 'react';
import LandingPage from './components/landingPage';
import Navbar from './components/Navbar';
import { Button } from "./components/ui/button"
import Footer from './components/Footer';
import { Routes, Route, Navigate } from "react-router-dom";
import Form from './components/Form';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
const App = () => {
 

  return (
    <>
      <Navbar></Navbar>
      {/* <LandingPage></LandingPage> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/form" element={<Form />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;