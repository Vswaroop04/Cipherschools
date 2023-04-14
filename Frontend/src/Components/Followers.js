import React, { useState, useEffect } from 'react'
import './Followers.css'

const Followers = (props) => {
  const Host = process.env.REACT_APP_URL
  const [followers, setFollowers] = useState([])
  const [totalFollowers, setTotalFollowers] = useState(0)

  useEffect(() => {
    const getdetails = async () => {
      const response = await fetch(`${Host}/getFollowers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authentication: localStorage.getItem('auth-token'),
        },
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
      }

      const data = await response.json()

      console.log(data)
      setFollowers(data)
      let total = 0
      data.forEach((follower) => {
        total += follower.followers.length
      })
      console.log(total)
      setTotalFollowers(total)
    }

    getdetails()
  }, [Host])

  const toggleFollowing = async (followId, followers) => {
    let following
    if (followers.includes(localStorage.getItem('userid'))) {
      following = true
    } else {
      following = false
    }
    const requestUrl = following ? `${Host}/unfollow` : `${Host}/follow`
    const response = await fetch(requestUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authentication: localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ followId: followId, following: following }),
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    const data = await response.json()

    console.log(data)

    setFollowers((prevFollowers) =>
      prevFollowers.map((follower) =>
        follower._id === followId
          ? {
              ...follower,
              followers: following
                ? follower.followers.filter(
                    (id) => id !== localStorage.getItem('userid'),
                  )
                : [...follower.followers, localStorage.getItem('userid')],
            }
          : follower,
      ),
    )
  }

  const renderFollowers = () =>
    followers?.map((follower) => (
      <div key={follower._id} className="follower-box">
        <img src={follower.pic} alt={`${follower.fname}'s avatar`} />
        <p>{follower.fname}</p>
        <p>{follower.email}</p>
        <p>{follower.followers.length} Followers</p>

        <button
          className="edit-button"
          style={{ 'background-color': '#f59c13', color: 'white' }}
          onClick={() => toggleFollowing(follower._id, follower.followers)}
        >
          {console.log(localStorage.getItem('userid'))}
          {follower.followers ? (
            follower.followers.includes(localStorage.getItem('userid')) ? (
              <>Unfollow</>
            ) : (
              <>Follow</>
            )
          ) : (
            <>Follow</>
          )}
        </button>
      </div>
    ))

  return (
    <div>
      <div className="about-me-heading">
        <h2
          style={{
            'padding-left': '30px',
            'padding-top': '20px',
            fontSize: '30px',
          }}
        >
          Followers
        </h2>
      </div>
      <p
        style={{
          marginLeft: '30px',
          fontSize: '20px',
        }}
      >
        {' '}
        Here Are the list of followers !{' '}
      </p>

      <p> {totalFollowers} Followers </p>
      <div className="followers-grid">{renderFollowers()}</div>
    </div>
  )
}

export default Followers
