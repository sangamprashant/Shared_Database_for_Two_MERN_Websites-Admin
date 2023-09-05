import React, { useState } from "react";
import axios from "axios";

function Login({setLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a login request to your server
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // Handle a successful login (e.g., store user session)
      if (response.status === 200) {
        setLogin(true)
        localStorage.setItem("isLoggedIn", "true");
      }
    } catch (error) {
      // Handle login failure
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="log">
      <div className="col-md-3">
        <div className="card p-3">
          <form className="form-body" onSubmit={handleLogin}>
            <h2 className="center-content">Admin Login</h2>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {errorMessage && (
              <p className="text-danger">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
