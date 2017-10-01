import React from 'react'

export default function Dashboard(props) {
  const { gameStart, isFrozen, hidden } = props
  return (
    <div className={'dashboard-wrapper' + (hidden ? ' hidden' : '')} onTouchEnd={gameStart} onClick={gameStart}>
      <label className={isFrozen ? 'disabled' : ''}>Tap to play</label>
      {isFrozen && <label className="frozen-hint">take a break...</label>}
    </div>
  )
}
