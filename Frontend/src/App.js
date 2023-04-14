import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Follow from './Components/Followers'

import User from './Components/User'
import Pleaselogin from './Components/Pleaselogin'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    let darkmode = localStorage.getItem('darkMode')

    if (darkmode === 'true') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [])

  return (
    <div className={darkMode ? 'app-dark' : ''}>
      <Router>
        <Header fxn={setDarkMode} />

        <Routes>
          <Route element={<Pleaselogin />}>
            <Route path="/user" darkMode={darkMode} element={<User />} />
            <Route path="/followers" element={<Follow />} />
          </Route>
          <Route path="/signup" element={<Signup fxn={setDarkMode} />} />

          <Route path="/" element={<Login fxn={setDarkMode} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
