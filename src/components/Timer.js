import React from 'react'

export default function Timer(props) {
  const { time, gameStart } = props
  const timeStr = time
    .toString()
    .replace(/(.)$/, '.$1s')
    .replace(/^\./, '')
  return (
    <div className="timer-wrapper">
      <label>time</label>
      <label className="timer" onClick={gameStart}>
        {timeStr}
      </label>
    </div>
  )
}
