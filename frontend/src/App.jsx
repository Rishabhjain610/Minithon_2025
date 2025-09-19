import React, { useContext } from 'react';
import LandingPage from './components/landingPage';
import Navbar from './components/Navbar';
import { Button } from "./components/ui/button"
import Footer from './components/Footer';
import { Routes, Route, Navigate } from "react-router-dom";
// import Form from './components/Form';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Room from './components/Room';
const App = () => {


  return (
    <>
      <Navbar></Navbar>
      {/* <LandingPage></LandingPage> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/room" element={<Room />}></Route>
        {/* <Route path="/form" element={<Form />} /> */}
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;