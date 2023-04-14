import { useEffect, useState } from 'react'
import './Password.css'

function PasswordSection() {
  const Host = process.env.REACT_APP_URL
  const [isChanging, setIsChanging] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleChangeClick() {
    setIsChanging(true)
  }

  function handleCancelClick() {
    setIsChanging(false)
  }

  function handleCurrentPasswordChange(event) {
    setCurrentPassword(event.target.value)
  }

  function handleNewPasswordChange(event) {
    setNewPassword(event.target.value)
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    fetch(`${Host}/updatePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authentication: localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({
        password: currentPassword,
        newpassword: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setIsChanging(false)
        if(data.result){
          alert('Password updated successfully')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    const labels = document.querySelectorAll('.popup label')
    labels.forEach((label) => {
      isChanging ? (label.style.color = 'black') : (label.style.color = 'black')
    })
  }, [isChanging])

  return (
    <div className="pswrd">
      <div className="password-section">
        <h2>Password and Security</h2>
        <button className="change-button" onClick={handleChangeClick}>
          Change
        </button>

        {isChanging && (
          <div className="popup">
            <form onSubmit={handleSubmit}>
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
              />

              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />

              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />

              <div className="button-group">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="password-section2">
        <label>Password : </label>
        <input type="password" placeholder="************" />
      </div>
    </div>
  )
}

export default PasswordSection
