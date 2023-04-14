import React, { useState } from 'react'
import './IntroHeader.css'

const imgsrc =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

export default function IntroHeader(props) {
  const Host = process.env.REACT_APP_URL
  const [imageUrl, setImageUrl] = useState('')

  const data = props.data
  console.log(data)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileInputChange = async (event) => {
    setSelectedFile(event.target.files[0])
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'vydhzq9m')
    formData.append('cloud_name', 'dpbuff0qs')
    try {
      console.log(formData)
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        auth: {
          username: '454354576591784',
          password: 'imgvF6l7eWY-V2x2Qwk7jqUrgrc',
        },
      }
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dpbuff0qs/image/upload`,
        {
          method: 'POST',
          config,

          body: formData,
        },
      )

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }

      const data = await response.json()

      console.log(data)
      console.log(data.secure_url)
      setImageUrl(data.secure_url)

      if (data.secure_url) {
        const response = await fetch(`${Host}/updatepic`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authentication: localStorage.getItem('auth-token'),
          },

          body: JSON.stringify({
            pic: data.secure_url,
          }),
        })

        if (!response.ok) {
          const errorMessage = await response.text()
          throw new Error(errorMessage)
        }

        const res = await response.json()

        console.log(res)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleClick = () => {
    document.getElementById('fileInput').click()
  }
  return (
    <div className="user-box">
      <div className="user-back">
        <div className="user-content">
          <div className="user-profile-box">
            <div class="MuiAvatar-root MuiAvatar-circular pf-user-profile">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected file"
                />
              ) : (
                <>
                  {' '}
                  {data.founduser?.pic ? (
                    <>
                      <img
                        alt="user-profile"
                        src={data.founduser.pic}
                        class="MuiAvatar-img"
                      />{' '}
                    </>
                  ) : (
                    <img
                      alt="user-profile"
                      src={imgsrc}
                      class="MuiAvatar-img"
                    />
                  )}
                </>
              )}
              <div class="pf-user-profile-pencil">
                <div onClick={handleClick}>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                  />

                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 31.982 31.982"
                    space="preserve"
                    className="pf-profile-pencil-icon"
                  >
                    <g>
                      <path
                        d="M3.952,23.15L0,31.955l8.767-3.992l0.018,0.019L3.938,23.13L3.952,23.15z M4.602,22.463L24.634,2.432l4.849,4.848
          L9.45,27.312L4.602,22.463z M30.883,0.941c-2.104-1.963-4.488-0.156-4.488-0.156l4.851,4.843
          C31.244,5.627,33.124,3.375,30.883,0.941z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="pf-user-detail-box">
            <div id="pf-user-side">
              <h2 class="pf-user-greeting">Hello,</h2>
              <h1 class="pf-user-name" title="Vishnu Swaroop">
                {data.founduser?.fname}
              </h1>
              <h2 class="pf-user-email"> {data.founduser?.email}</h2>
            </div>
            <div class="pf-right-side">
              <a href="/followers">
                <div class="pf-user-followers-count">
                  <span>{data.founduser?.followers.length}</span> Followers
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
