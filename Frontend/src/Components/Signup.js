import { useState } from 'react'
import './Signup.css'
import { json, useNavigate } from 'react-router-dom'

function PasswordSection() {
  const Host = process.env.REACT_APP_URL

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    password: '',
  })
  const [res, setRes] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch(`${Host}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      setRes(errorMessage)
      throw new Error(errorMessage)
    }

    const data = await response.json()

    if (data) {
      setRes(data.message)
      localStorage.setItem('auth-token', data.token)
      localStorage.setItem('userid', data.user._id)
      navigate('/user')
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="password-section">
      <div className="popup3">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          {res && <p>{res}</p>}
          <label>First Name</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="button-group">
            <button type="submit">Submit</button>
          </div>

          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default PasswordSection
