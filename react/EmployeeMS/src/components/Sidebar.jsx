import React from 'react';
import './style.css'; 

export default function Sidebar({ onNav, onLogout }) {

  const buttonClass = "list-group-item list-group-item-action bg-dark text-light border-0 text-start fs-5 py-3 hover-effect";

  return (
    <div className="bg-dark text-light " style={{ width: 300 }}> 
      <div className="px-3 py-4">
        <h5 className="mb-4 fs-4">Admin Panel</h5> 
        <div className="list-group list-group-flush">
          
          
          <button className={buttonClass} onClick={() => onNav('employees')}>
            <i className="bi bi-people me-2"></i> Manage Employees
          </button>
          <button className={buttonClass} onClick={() => onNav('users')}>
            <i className="bi bi-people me-2"></i> Users
          </button>

          
          <button className={buttonClass} onClick={onLogout}>
            <i className="bi bi-power me-2"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
