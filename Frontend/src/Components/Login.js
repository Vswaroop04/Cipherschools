import { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function PasswordSection(props) {
  const navigate = useNavigate()
  const Host = process.env.REACT_APP_URL
  console.log(Host)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [res, setRes] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch(`${Host}/signin`, {
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
    console.log(data)
    console.log(data.user)

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
      <div className="popup2">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p>   Default -- email : 123@gmail.com password : cipherschools </p>
          <h2>{res}</h2>
          <p>Hey, Welcome!</p>
          <p>Please provide your email and password to signin</p>

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
            Don't have an account? <a href="/signup">Get Started</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default PasswordSection
