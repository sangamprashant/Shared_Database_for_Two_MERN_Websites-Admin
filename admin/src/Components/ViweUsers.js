import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViweUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when the component mounts
    axios.get('http://localhost:5000/api/view/users') // Replace with your API endpoint
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='log'>
      <hr />
      <div className='col-md-8'>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>User List</h5>
            {loading ? (
              <p>Loading user data...</p>
            ) : (
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViweUsers;
