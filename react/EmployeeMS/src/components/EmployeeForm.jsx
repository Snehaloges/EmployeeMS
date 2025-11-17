import React, { useEffect, useState } from 'react';
import { createEmployee, updateEmployee } from '../api/api';

export default function EmployeeForm({ editing, onSaved }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', role:'', salary:0 });
  const [msg, setMsg] = useState('');


  useEffect(()=> {
    if (editing) setForm(editing);
    else setForm({ name:'', email:'', phone:'', role:'', salary:0 });
    setMsg(''); 
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing && editing._id) {
        await updateEmployee(editing._id, form);
        setMsg('Employee updated successfully!');
      } else {
        await createEmployee(form);
        setMsg('New employee created successfully!');
      }
      
      setTimeout(()=> onSaved?.(), 1000); 
      
    } catch (err) {
      setMsg('Error saving employee data.');
    }
  };

  return (
    <div>
      {msg && <div className={`alert ${msg.includes('Error') ? 'alert-danger' : 'alert-success'}`}>{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="form-control mb-2" type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input className="form-control mb-2" type="tel" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <input className="form-control mb-2" placeholder="Role" value={form.role} onChange={e=>setForm({...form, role:e.target.value})} />
        <input className="form-control mb-2" type="number" placeholder="Salary" value={form.salary} onChange={e=>setForm({...form, salary: Number(e.target.value)})} min="0" />
        <button className="btn btn-primary w-100 mt-2" type="submit">{editing ? 'Update Employee' : 'Create Employee'}</button>
      </form>
    </div>
  );
}