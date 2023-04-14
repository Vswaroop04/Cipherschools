import { useState, useEffect } from 'react'
import './Interests.css'

function Interests(props) {
  const data = props.data
  const Host = process.env.REACT_APP_URL
  const [editMode, setEditMode] = useState(false)
  const [interestsDisplay, setinterestsDisplay] = useState('')

  const [interests, setInterests] = useState([
    { id: 1, name: 'App' },
    { id: 2, name: 'Web development' },
    { id: 3, name: 'Programming' },
    { id: 4, name: 'DSA' },
  ])

  const [selectedinterests, setselectedInterests] = useState([])
  const [selectedInterests, setSelectedInterests] = useState([])

  useEffect(() => {
    // Simulating response from server
    const responseInterests = [
      { id: 1, name: 'App' },
      { id: 2, name: 'Web development' },
    ]
    // Find interests not present in response and add them to selected interests
    const newInterests = interests.filter(
      (interest) => !responseInterests.find((i) => i.name === interest.name),
    )
    setSelectedInterests([...newInterests.map((i) => i.name)])
  }, [])

  useEffect(() => {
    // Simulating response from server
    const responseInterests = [
      { id: 1, name: 'App' },
      { id: 2, name: 'Web development' },
    ]
    // Find interests not present in response and add them to selected interests
    const newInterests = interests.filter(
      (interest) => !responseInterests.find((i) => i.name === interest.name),
    )
    setSelectedInterests((prevSelectedInterests) => {
      const updatedSelectedInterests = [...prevSelectedInterests]
      newInterests.forEach((interest) => {
        if (!updatedSelectedInterests.includes(interest.name)) {
          updatedSelectedInterests.push(interest.name)
        }
      })
      return updatedSelectedInterests
    })
  }, [])
  const handleEdit = () => {
    setEditMode(true)
  }

  const handleSave = () => {
    setEditMode(false)
    setselectedInterests(
      selectedInterests.map((i) => ({ id: interests.length + 1, name: i })),
    )
  }

  useEffect(() => {
    const addInterest = (interest) => {
      fetch(`${Host}/addInterest`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authentication: localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({ interest: interest }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('addInterest response:', data)
          // handle the response as needed
        })
        .catch((error) => console.error(error))
    }

    addInterest(selectedInterests)
  }, [selectedInterests])

  const handleCancel = () => {
    setEditMode(false)
    setSelectedInterests(interests.map((i) => i.name))
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
      data?.founduser?.interests?.map((interest, index) => (
        <span key={index} className="interest-tag">
          {interest}
        </span>
      )),
    )
  }, [data, selectedInterests])

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
            <div className="interest- options">{interestOptions}</div>
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
