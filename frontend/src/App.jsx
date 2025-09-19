import React, { useContext } from 'react';
import LandingPage from './components/landingPage';
import Navbar from './components/Navbar';
import { Button } from "./components/ui/button"
import Footer from './components/Footer';
import { Routes, Route, Navigate } from "react-router-dom";
// import Form from './components/Form';
const App = () => {
  // const { user, loading } = useContext(UserDataContext);

  // // Optional: Show a loading spinner while fetching user data
  // if (loading) {
  //   return <div className="flex items-center justify-center h-screen">Loading...</div>;
  // }

  return (
    <>
      <Navbar></Navbar>
      {/* <LandingPage></LandingPage> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/form" element={<Form />} /> */}
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;