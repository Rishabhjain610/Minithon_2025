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
import Room from './components/Room';
import DormComparison from './components/DormComparison';
import Chatbot from './components/Chatbot';
const App = () => {


  return (
    <>
      <Navbar></Navbar>
      {/* <LandingPage></LandingPage> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room" element={<Room
          name="Shiv Sagar Dormitory"
          location="Mumbai"
          rating={4.3}
          reviewsCount={667}
          price="6000"
          description="A Home Stay With A Traditional Modern Javanese Concept, With A Clean, Comfortable, Quiet, Beautiful And Artistic Limasan Roof For Your Family."
          available={true}

        />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dom-comparison" element={<DormComparison />} />
        <Route path="/form" element={<Form />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Chatbot></Chatbot>
      <Footer></Footer>
    </>
  );
};

export default App;