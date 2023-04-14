import React, { useState } from 'react'
import './Ciphermap.css'

function Heatmap() {
  const [hoverDate, setHoverDate] = useState('')

  const data = {
    '2023-01-01': 5,
    '2023-01-02': 10,
    '2023-01-03': 2,
    '2023-01-04': 0,
    '2023-01-05': 8,
    '2023-01-06': 8,
    '2023-01-07': 8,
    '2023-01-08': 8,
    '2023-01-09': 8,
    '2023-01-10': 8,
    '2023-01-11': 8,
    '2023-01-12': 2,
    '2023-01-13': 2,
    '2023-01-14': 2,
    '2023-01-15': 2,
    '2023-01-16': 2,
    '2023-01-17': 2,
    '2023-02-18': 2,
    '2023-02-19': 2,
    '2023-02-20': 2,
    '2023-04-21': 2,
    '2023-04-22': 2,
    '2023-04-29': 2,
    '2023-05-01': 2,
    '2023-05-04': 10,
    '2023-06-05': 10,
    '2023-07-05': 10,

    '2023-08-05': 10,

    '2023-12-30': 3,
  }

  const handleDateHover = (date) => {
    setHoverDate(date)
  }

  const renderSquares = () => {
    const startDate = new Date('2023-01-01')
    const endDate = new Date('2023-12-30')

    const daysInPeriod = Math.round(
      (endDate - startDate) / (1000 * 60 * 60 * 24),
    )

    const squares = []

    for (let i = 0; i < daysInPeriod; i++) {
      const date = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24))
      const dateString = date.toISOString().split('T')[0]

      const count = data[dateString] || 0

      const squareStyle = {
        backgroundColor:
          count >= 10
            ? 'var(--heatmap-color-high)'
            : count >= 5
            ? 'var(--heatmap-color-medium)'
            : 'var(--heatmap-color-low)',
      }

      squares.push(
        <div
          key={dateString}
          className="heatmap-square"
          style={squareStyle}
          title={`Date: ${dateString} Count: ${count}`}
          onMouseEnter={() => handleDateHover(dateString)}
          onMouseLeave={() => handleDateHover('')}
        ></div>,
      )
    }

    return squares
  }

  return (
    <div className="heatmap-container">
      <div className="about-me-heading">
        <h2>Cipher Map</h2>
      </div>
      <div className="heatmap-grid">{renderSquares()}</div>
      {hoverDate && <div className="heatmap-tooltip">{hoverDate}</div>}
    </div>
  )
}

export default Heatmap
