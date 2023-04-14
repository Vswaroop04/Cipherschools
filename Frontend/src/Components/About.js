import React, { useState, useEffect } from 'react'
import './About.css'

function AboutMe(props) {
  const Host = process.env.REACT_APP_URL

  const data = props.data

  const [editMode, setEditMode] = useState(false)
  const [aboutText, setAboutText] = useState('Lorem .....')
  const [text, setText] = useState('Edit')

  useEffect(() => {
    if (data.founduser?.about) {
      setAboutText(data.founduser.about)
    }
  }, [data])

  const handleEdit = () => {
    setEditMode(!editMode)
    setText(editMode ? 'Edit' : 'Save')
    if (editMode === true) {
      UpdateAbout(aboutText)
    }
  }

  const handleTextChange = (event) => {
    setAboutText(event.target.value)
  }

  const UpdateAbout = async (text) => {
    const response = await fetch(`${Host}/updateabout`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authentication: localStorage.getItem('auth-token'),
      },

      body: JSON.stringify({
        about: text,
      }),
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    const res = await response.json()
    console.log(res)
  }

  return (
    <div className="about-me">
      <div className="about-me-heading">
        <h2>About Me</h2>
        <button className="edit-button4" onClick={handleEdit}>
          {data.found}
          {text}
        </button>
      </div>
      <div className={editMode ? 'about-me-text edit-mode' : 'about-me-text'}>
        {editMode ? (
          <textarea value={aboutText} onChange={handleTextChange} />
        ) : (
          <p>{aboutText}</p>
        )}
      </div>
    </div>
  )
}

export default AboutMe
