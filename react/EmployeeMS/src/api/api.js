const API_BASE = 'http://localhost:5000/api';

export async function loginAdmin(email, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

function getToken() {
  return localStorage.getItem('token');
}

export async function fetchEmployees() {
  const res = await fetch(`${API_BASE}/admin/employees`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/admin/users`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  if(!res.ok){
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  return res.json();
}


export async function createEmployee(data) {
  const res = await fetch(`${API_BASE}/admin/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateEmployee(id, data) {
  const res = await fetch(`${API_BASE}/admin/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteEmployee(id) {
  const res = await fetch(`${API_BASE}/admin/employees/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
}
