import React, { useState, useEffect, useCallback } from 'react';
import { fetchEmployees, deleteEmployee } from '../api/api';
import EmployeeForm from './EmployeeForm';

function Modal({ show, title, onClose, children }) {
  if (!show) return null;

  return (
    <>
  
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={onClose}
      ></div>
  
      <div
        className="modal fade show d-block "
        style={{
          zIndex: 1050,
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">{children}</div>

          </div>
        </div>
      </div>
    </>
  );
}
   

export default function EmployeeManager() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadEmployees = useCallback(async () => {
    const data = await fetchEmployees();
    setEmployees(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => { loadEmployees(); }, [loadEmployees]);

  const handleOpenForm = (employee = null) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleCloseForm = () => {
    setEditingEmployee(null);
    setShowModal(false);
    loadEmployees();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    await deleteEmployee(id);
    loadEmployees();
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-start mb-3">
        <button
          className="btn btn-success"
          onClick={() => handleOpenForm(null)}
        >
          Add Employee
        </button>
      </div>

      <div className="card p-3 " style={{ backgroundColor: ' #e7c7d6ff' }}>
        <h5 className="card-title text-center py-3 ">Employee List</h5>
        <div className="table-responsive" >
          {employees.length === 0 ? (
            <div className="text-muted text-center py-3">No employees yet</div>
          ) : (
            <table className="table table-striped table-hover" >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.role}</td>
                    <td>${emp.salary.toLocaleString()}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-primary me-4" 
                        onClick={() => handleOpenForm(emp)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal 
        show={showModal} 
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'} 
        onClose={handleCloseForm}
      >
        <EmployeeForm 
          editing={editingEmployee} 
          onSaved={handleCloseForm}
        />
      </Modal>
    </div>
  );
}