import React, { useContext } from 'react';
import LandingPage from './components/landingPage';
import Navbar from './components/Navbar';
import { Button } from "./components/ui/button"
import Footer from './components/Footer';

const App = () => {
  // const { user, loading } = useContext(UserDataContext);

  // // Optional: Show a loading spinner while fetching user data
  // if (loading) {
  //   return <div className="flex items-center justify-center h-screen">Loading...</div>;
  // }

  return (
    <>
      <Navbar></Navbar>
      <LandingPage></LandingPage>
      <Footer></Footer>
    </>
  );
};

export default App;