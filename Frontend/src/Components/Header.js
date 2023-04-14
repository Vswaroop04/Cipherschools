import React, { useEffect, useState } from 'react'
import './Header.css'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'

function Header(props) {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const logout = () => {
    localStorage.removeItem('auth-token')
    navigate('/')
  }
  const handleToggle = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', !darkMode)
    props.fxn(!darkMode)
  }
  useEffect(() => {
    let darkmode = localStorage.getItem('darkMode')
    if (darkmode === 'true') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [])

  return (
    <div className={darkMode ? 'header dark' : 'header'}>
      <div className="navlink">
        {' '}
        <img
          classname="logoimg"
          style={{ width: '40px' }}
          src={logo}
          alt="cipherschoolslogo"
        />
        <h2 className="logo">CipherSchools</h2>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          style={{ paddingLeft: '30px' }}
        />
        <div
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <svg
            width="17"
            viewBox="0 0 28 28"
            fill="none"
            class="nav-search-icon-open"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 26L20.3335 20.3234M23.4737 12.7368C23.4737 15.5844 22.3425 18.3154 20.3289 20.3289C18.3154 22.3425 15.5844 23.4737 12.7368 23.4737C9.88925 23.4737 7.1583 22.3425 5.14475 20.3289C3.1312 18.3154 2 15.5844 2 12.7368C2 9.88925 3.1312 7.1583 5.14475 5.14475C7.1583 3.1312 9.88925 2 12.7368 2C15.5844 2 18.3154 3.1312 20.3289 5.14475C22.3425 7.1583 23.4737 9.88925 23.4737 12.7368ZM23.4737 12.7368L23.4737 12.7368Z"
              stroke="var(--text-color)"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>
        <div
          className="logout"
          style={{ display: 'flex', alignItems: 'center', marginRight: '0' }}
        >
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => logout()}
          >
            <svg
              style={{ marginRight: '5px' }}
              width="25"
              height="25"
              viewBox="0 0 30 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0303 8.97368C23.0303 7.807 24.4281 7.20869 25.2722 8.01408L28.4777 11.0725C29.3057 11.8625 29.3032 13.1849 28.4722 13.9717L25.2767 16.9977C24.4283 17.8012 23.0303 17.1997 23.0303 16.0312C23.0303 15.296 22.4343 14.7 21.6991 14.7H14.601C13.4964 14.7 12.601 13.8046 12.601 12.7V12.3C12.601 11.1954 13.4964 10.3 14.601 10.3H21.704C22.4365 10.3 23.0303 9.70619 23.0303 8.97368ZM17.4125 19.7824C18.2594 19.2271 19.4002 19.2365 20.1165 19.9523C20.8801 20.7154 20.864 21.9731 19.9909 22.6079C17.7973 24.2026 15.4602 25 12.9798 25C9.3266 25 6.25 23.8042 3.75 21.4125C1.25 19.0208 0 16.0333 0 12.45C0 10.2 0.572391 8.11667 1.71717 6.2C2.86195 4.28333 4.40657 2.77083 6.35101 1.6625C8.29545 0.554167 10.404 0 12.6768 0C15.206 0 17.6285 0.822203 19.9445 2.46661C20.8192 3.08773 20.8497 4.33987 20.0908 5.09828C19.389 5.7997 18.2709 5.80954 17.4454 5.25888C15.9376 4.25296 14.3564 3.75 12.702 3.75C10.1936 3.75 8.0766 4.61667 6.35101 6.35C4.62542 8.08333 3.76263 10.2 3.76263 12.7C3.76263 15.0333 4.65067 17.0417 6.42677 18.725C8.20286 20.4083 10.2862 21.25 12.6768 21.25C14.3417 21.25 15.9203 20.7608 17.4125 19.7824Z"
                fill="currentColor"
              ></path>{' '}
            </svg>
            Logout
          </button>
        </div>
      </div>
      <div className="toggle-button">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={handleToggle} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  )
}

export default Header
