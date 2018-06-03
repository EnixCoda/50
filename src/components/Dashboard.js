import React from 'react'

export default class Dashboard extends React.PureComponent {
  render() {
    const { gameStart, isFrozen, hidden } = this.props
    return (
      <div className={'dashboard-wrapper' + (hidden ? ' hidden' : '')} onTouchEnd={gameStart} onClick={gameStart}>
        <label className={isFrozen ? 'disabled' : ''}>Tap to play</label>
        {isFrozen && <label className="frozen-hint">take a break...</label>}
      </div>
    )
  }
}
