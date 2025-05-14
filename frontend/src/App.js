import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from "./context/AuthContext";
import AfterLoginPage from './pages/AfterLoginPage';

function App() {
  return (
    <>
      <Navbar />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/afterlogin" element={<AfterLoginPage />} />  {/* AfterLogin */}
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
