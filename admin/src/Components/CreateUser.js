import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateUser({setLoggedIn,setLogin}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      try {
        const response = await fetch('/api/create/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, account: 'user' }),
        });

        const data = await response.json();

        if (data.message) {
          // User created successfully
          setSuccessMessage(data.message);
          setName('');
          setEmail('');
          setPassword('');
          setErrorMessage('');
          
          // Fetch the updated user list
          fetchUserList();
        } else {
          // Handle error response
          setErrorMessage(data.error);
          setSuccessMessage('');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Error creating user');
        setSuccessMessage('');
      }
    } else {
      setErrorMessage('Enter all the fields');
    }
  };

  const fetchUserList = () => {
    axios.get('/api/view/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  };
  const handleLogout = () => {
    // Clear the login status in localStorage and update the state
    localStorage.setItem('isLoggedIn', 'false');
    setLogin(false);
    setLoggedIn(false)
  };
  return (
    <>
      <div className="log">
        <div className="col-md-5">
          <div className="card p-3">
            <form className="form-body" onSubmit={handleSubmit}>
              <h2 className="center-content">Create User</h2>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button type="button" className="btn btn-danger" onClick={handleLogout}>
              Log Out              </button>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              {successMessage && <p className="text-success">{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
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
    </>
  );
}

export default CreateUser;
