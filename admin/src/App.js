import React, { useState } from 'react'
import "./App.css"
import Login from './Components/Login.'
import CreateUser from './Components/CreateUser'

function App() {
  // Initialize login status from localStorage if available
  const initialLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
  const [loggedIn, setLoggedIn] = useState(initialLoginStatus);
  const [login , setLogin] =useState(false);
  return (
    <div>
  {!login && !loggedIn?<Login setLogin={setLogin}/>
:  <CreateUser setLoggedIn={setLoggedIn}setLogin={setLogin}/>}
    </div>
  )
}

export default App

