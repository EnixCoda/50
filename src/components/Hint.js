import React from 'react'

export default function Hint(props) {
  return (
    <div className="hint-wrapper">
      <label className="detailed-description">
        play with{' '}
        <span role="img" aria-label="left">
          ⬅️
        </span>{' '}
        <span role="img" aria-label="down">
          ⬇️
        </span>{' '}
        <span role="img" aria-label="right">
          ➡️
        </span>{' '}
        or A, S, D or swipe
      </label>
      <label className="directions-description">
        <span role="img" aria-label="left">
          ⬅️
        </span>{' '}
        &lt; 10 |{' '}
        <span role="img" aria-label="down">
          ⬇️
        </span>{' '}
        = 10 |{' '}
        <span role="img" aria-label="right">
          ➡️
        </span>{' '}
        &gt; 10{' '}
      </label>
    </div>
  )
}
