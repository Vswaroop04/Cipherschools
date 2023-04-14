import React, { useEffect, useState } from 'react'
import './ProfessionalInformation.css'

const ProfessionalInfo = (props) => {
  const Host = process.env.REACT_APP_URL
  const data = props.data

  const [editMode, setEditMode] = useState(false)
  const [highestEducation, setHighestEducation] = useState('')
  const [currentStatus, setCurrentStatus] = useState('')

  let modeofpi = localStorage.getItem('darkMode')

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      const labels = document.querySelectorAll('.professional-info label')
      labels.forEach((label) => {
        editMode ? (label.style.color = 'black') : (label.style.color = 'white')
      })
    }
    if (localStorage.getItem('darkMode') === 'false') {
      const labels = document.querySelectorAll('.professional-info label')
      labels.forEach((label) => {
        editMode ? (label.style.color = 'black') : (label.style.color = 'black')
      })
    }
  }, [editMode, modeofpi])

  useEffect(() => {
    setHighestEducation(data?.founduser?.professional?.Education)
    setCurrentStatus(data?.founduser?.professional?.Job)
  }, [data])

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  const handleEducationChange = async (event) => {
    setHighestEducation(event.target.value)
    console.log(event.target.value)
    const response = await fetch(`${Host}/updateprofinfo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authentication: localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({
        education: event.target.value,
      }),
    })

    const data = await response.json()

    console.log(data)
  }

  const handleStatusChange = async (event) => {
    setCurrentStatus(event.target.value)
    console.log(event.target.value)
    const response = await fetch(`${Host}/updateprofinfo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authentication: localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({
        job: event.target.value,
      }),
    })

    const data = await response.json()

    console.log(data)
  }

  return (
    <div className="professional-info">
      <div className="pi inner">
        <div className="professional-info-heading">
          <h2>Professional Information</h2>
          <button className="edit-button2" onClick={handleEdit}>
            {editMode ? 'Save' : 'Edit'}
          </button>
        </div>
        <div
          className={
            editMode
              ? 'professional-info-content-edit-mode'
              : 'professional-info-content'
          }
        >
          <div className="education-dropdown">
            <label htmlFor="education">Highest Education:</label>
            <select
              id="education"
              name="education"
              value={highestEducation}
              onChange={handleEducationChange}
              disabled={!editMode}
            >
              <option className="option" value="Primary">
                Primary
              </option>
              <option className="option" value="Secondary" placeholder="">
                Secondary
              </option>
              <option
                className="option"
                value="Higher Secondary"
                placeholder=""
              >
                Higher Secondary
              </option>
              <option className="option" value="Graduation" placeholder="">
                Graduation
              </option>
              <option className="option" value="Post Graduation" placeholder="">
                Post Graduation
              </option>
            </select>
          </div>
          <div className="status-dropdown">
            <label htmlFor="status">What do you do currently?</label>
            <select
              id="status"
              name="status"
              value={currentStatus ? currentStatus : ''}
              onChange={handleStatusChange}
              disabled={!editMode}
            >
              <option className="option" value="Schooling">
                Schooling
              </option>
              <option className="option" value="College Student">
                College Student
              </option>
              <option className="option" value="Teaching">
                Teaching
              </option>
              <option className="option" value="Job">
                Job
              </option>
              <option className="option" value="Freelancing">
                Freelancing
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalInfo
