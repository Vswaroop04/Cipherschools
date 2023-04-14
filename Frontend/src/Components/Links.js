import React, { useEffect, useState } from 'react'
import './Links.css'

function OnTheWeb(props) {
  const Host = process.env.REACT_APP_URL

  const data = props.data
  console.log(data.founduser?.links)

  let modeoflinks = localStorage.getItem('darkMode')

  useEffect(() => {
    setLinks({
      linkedin: data.founduser?.links.linkedin,
      github: data.founduser?.links.github,
      facebook: data.founduser?.links.facebook,
      twitter: data.founduser?.links.twitter,
      instagram: data.founduser?.links.instagram,
    })
  }, [data])

  const [editMode, setEditMode] = useState(false)
  const [links, setLinks] = useState({
    linkedin: '',
    github: '',
    facebook: '',
    twitter: '',
    instagram: '',
  })
  const [buttonText, setButtonText] = useState('Edit')

  const handleEdit = () => {
    setEditMode(!editMode)
    if (editMode) {
      handleSave()
    }
    setButtonText(editMode ? 'Edit' : 'Save')
  }

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      const labels = document.querySelectorAll('.on-the-web label')
      labels.forEach((label) => {
        editMode ? (label.style.color = 'black') : (label.style.color = 'white')
      })
    }
    if (localStorage.getItem('darkMode') === 'false') {
      const labels = document.querySelectorAll('.on-the-web label')
      labels.forEach((label) => {
        editMode ? (label.style.color = 'black') : (label.style.color = 'black')
      })
    }
  }, [editMode, modeoflinks])

  const handleLinkChange = (event) => {
    if (editMode) {
      const { name, value } = event.target
      setLinks((prevLinks) => ({
        ...prevLinks,
        [name]: value,
      }))
    }
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`${Host}/updatelinks`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authentication: localStorage.getItem('auth-token'),
        },
        body: JSON.stringify(links),
      })
      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }
      const res = await response.json()
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="on-the-web">
      <div className="on-the-web-heading">
        <h2>On the Web</h2>
        <button className="edit-button" onClick={handleEdit}>
          {buttonText}
        </button>
      </div>
      <div
        className={editMode ? 'on-the-web-links-edit-mode' : 'on-the-web-links'}
      >
        <div className="link-input">
          <label htmlFor="linkedin">LinkedIn :</label>
          <input
            type="text"
            name="linkedin"
            value={links.linkedin}
            onChange={handleLinkChange}
            className="linkedin"
            disabled={!editMode}
          />
        </div>
        <div className="link-input">
          <label htmlFor="github"> GitHub : </label>
          <input
            type="text"
            name="github"
            value={links.github}
            onChange={handleLinkChange}
            className="github"
            disabled={!editMode}
          />
        </div>
        <div className="link-input">
          <label htmlFor="facebook">Facebook:</label>
          <input
            type="text"
            value={links.facebook}
            name="facebook"
            placeholder={data.founduser?.links.facebook}
            onChange={handleLinkChange}
            className="facebook"
            disabled={!editMode}
          />
        </div>
        <div className="link-input">
          <label htmlFor="twitter">Twitter:</label>
          <input
            type="text"
            name="twitter"
            value={links.twitter}
            placeholder={data.founduser?.links.twitter}
            onChange={handleLinkChange}
            className="twitter"
            disabled={!editMode}
          />
        </div>
        <div className="link-input">
          <label htmlFor="instagram">Instagram:</label>
          <input
            type="text"
            name="instagram"
            value={links.instagram}
            placeholder={data.founduser?.links.instagram}
            onChange={handleLinkChange}
            className="instagram"
            disabled={!editMode}
          />
        </div>
      </div>
    </div>
  )
}

export default OnTheWeb
