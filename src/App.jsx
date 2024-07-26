import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import Features from './pages/Features/Features';
import Login from './pages/Login/Login';
import { auth } from './firebase'; // Adjust the import path as necessary

const App = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        if (window.location.pathname === '/login') {
          navigate("/");
        }
      } else {
        console.log("Logged Out");
        if (window.location.pathname !== '/login') {
          navigate("/login");
        }
      }
      setLoading(false);
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // You can customize the loading indicator as needed
  }

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:id' element={<Coin />} />
        <Route path='/feature' element={<Features />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
};

export default App;
