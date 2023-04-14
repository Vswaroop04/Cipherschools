import { useEffect, useState } from 'react'
import IntroHeader from './IntroHeader'
import About from './About'
import CipherMap from './Ciphermap'
import Links from './Links'
import ProfessionalInformation from './ProffesionalInfo'
import PasswordSection from './Password'
import Interests from './Intrests'

function App(props) {
  const Host = process.env.REACT_APP_URL
  const [data, setdata] = useState('')
  useEffect(() => {
    const id = localStorage.getItem('userid')

    const getdetails = async () => {
      const response = await fetch(`${Host}/user/${id}`, {
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
      setdata(data)
    }

    getdetails()
  }, [Host])

  const darkMode = props.darkmode
  console.log(darkMode)

  return (
    <div>
      <IntroHeader data={data} />
      <About data={data} />
      <CipherMap data={data} />
      <Links data={data} />
      <ProfessionalInformation data={data} />
      <PasswordSection data={data} />
      <Interests data={data} />
    </div>
  )
}

export default App
