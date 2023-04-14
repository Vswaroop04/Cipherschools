import { useState, useEffect } from 'react'
import './Interests.css'

function Interests(props) {
  const data = props.data
  const Host = process.env.REACT_APP_URL
  const [editMode, setEditMode] = useState(false)
  const [interestsDisplay, setinterestsDisplay] = useState('')

  const interests = [
    { id: 1, name: 'App' },
    { id: 2, name: 'Web development' },
    { id: 3, name: 'Programming' },
    { id: 4, name: 'DSA' },
  ]

  const [selectedInterests, setSelectedInterests] = useState([])

  useEffect(() => {
    setSelectedInterests(data?.founduser?.interests || [])
  }, [data])

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleSave = () => {
    setEditMode(false)
    const updatedInterests = [...selectedInterests]
    setSelectedInterests(updatedInterests)

    fetch(`${Host}/addInterest`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authentication: localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ interests: updatedInterests }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('updateInterests response:', data)
        // handle the response as needed
      })
      .catch((error) => console.error(error))
  }

  const handleCancel = () => {
    setEditMode(false)
    setSelectedInterests(data?.founduser?.interests || [])
  }

  const handleCheckboxChange = (event) => {
    const { value } = event.target
    const index = selectedInterests.indexOf(value)
    if (index > -1) {
      selectedInterests.splice(index, 1)
    } else {
      selectedInterests.push(value)
    }
    setSelectedInterests([...selectedInterests])
  }

  const interestOptions = interests.map((interest) => (
    <label key={interest.id}>
      <input
        type="checkbox"
        value={interest.name}
        checked={selectedInterests.includes(interest.name)}
        onChange={handleCheckboxChange}
      />
      {interest.name}
    </label>
  ))

  useEffect(() => {
    setinterestsDisplay(
      selectedInterests.map((interest, index) => (
        <span key={index} className="interest-tag">
          {interest}
        </span>
      )),
    )
  }, [selectedInterests])

  useEffect(() => {
    const labels = document.querySelectorAll('.popup')
    labels.forEach((label) => {
      editMode ? (label.style.color = 'black') : (label.style.color = 'white')
    })
  }, [editMode])

  return (
    <div className="interests-container">
      <h2>Interests</h2>
      <button className="edit-button3" onClick={handleEdit}>
        Edit
      </button>
      {editMode && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Select your interests</h3>
            <div className="interest-options">{interestOptions}</div>
            <div className="popup-buttons">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>

              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="interests-display">{interestsDisplay}</div>
    </div>
  )
}

export default Interests
