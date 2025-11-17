import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import EmployeeManager from './EmployeeManager.jsx'; 
import Users from './Users.jsx';

export default function Dashboard(){
  const [view, setView] = useState('employees'); 

  function handleNav(v){ 
    setView(v); 
  } 
  function handleLogout(){
     localStorage.removeItem('token'); 
     window.location = '/login'; }

  return (
    <div className="d-flex">
      <Sidebar onNav={handleNav} onLogout={handleLogout} />
      <div className="flex-grow-1 p-4" style={{ background: '#f6f0e9', minHeight: '100vh' }}>
     
        {view === 'employees' &&
          <div className="container">
            <h4 className="p-3 text-center">Employee Management</h4>
            <EmployeeManager /> 
          </div>
        }
        {view === 'users' &&
          <div className="container">
            <h4 className="p-3 text-center">Users</h4>
            <Users />
          </div>
        }
        

      </div>
    </div>
  );
}