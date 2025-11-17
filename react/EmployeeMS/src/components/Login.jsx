import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/api';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginAdmin(email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/');
    } else {
      setError(res.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center loginPage" >
      <div className="card p-4 loginForm" style={{ width: 480, height:350, backgroundColor: 'rgba(179, 220, 235, 1)' }}>
        <h4 className="mb-4" >Admin Login</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label"><strong>Email</strong></label>
            <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label"><strong>Password</strong></label>
            <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-success w-100" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
