import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';



const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute element={Dashboard}/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
