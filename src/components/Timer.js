import React from 'react'
import { connect } from 'react-redux'

function Timer({ time }) {
  const timeStr = time
    .toString()
    .replace(/(.)$/, '.$1s')
    .replace(/^\./, '')
  return (
    <div className="timer-wrapper">
      <label>time</label>
      <label className="timer">
        {timeStr}
      </label>
    </div>
  )
}

export default connect(state => ({ time: state.get('time') }))(Timer)
