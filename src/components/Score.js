import React from 'react'

export default function Score(props) {
  const { score, total } = props
  return (
    <div className="score-wrapper">
      <label>score</label>
      <label className="score">
        {score}
        {total !== -1 && '/' + total}
      </label>
    </div>
  )
}
