import React, { useState, useEffect} from 'react';
import { fetchUsers } from '../api/api';

export default function Users() {
    const [users, setUsers] = useState([]);


    const loadUsers = async () => {
        const data = await fetchUsers();
        setUsers(Array.isArray(data) ? data : []);
    }

    useEffect(() => { loadUsers(); }, [loadUsers]);

    return (
        <div className="mt-4">


            <div className="card p-3 " style={{ backgroundColor: ' #e7c7d6ff', overflowX:'auto'}}>
                <h5 className="card-title text-center py-3 ">Users List</h5>
                <div className="table-responsive " >
                    {users.length === 0 ? (
                        <div className="text-muted text-center py-3">No Users yet</div>
                    ) : (
                        <table className="table table-striped table-hover" >
                            <thead>
                                <tr>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>DOB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u,index) => (
                                    <tr key={u._id||index}>
                                        <td>{u.firstName}</td>
                                        <td>{u.lastName}</td>
                                        <td>{u.birthDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>


        </div>
    );
}