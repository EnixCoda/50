import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Actions from './actions'

import Score from './components/Score'
import Timer from './components/Timer'
import CardList from './components/CardList'
import Hint from './components/Hint'
import Dashboard from './components/Dashboard'
import './app.css'

class App extends React.PureComponent {
  constructor() {
    super()
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
  }

  componentDidMount() {
    const { move } = this.props
    this.keyDownListener = document.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowLeft':
          return move('left')
        case 'ArrowDown':
          return move('down')
        case 'ArrowRight':
          return move('right')
        case 'a':
          return move('left')
        case 's':
          return move('down')
        case 'd':
          return move('right')
        default:
          break
      }
    })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownListener)
  }

  onTouchStart(e) {
    e.preventDefault()
    this.touchStartPoint = e.changedTouches[0]
  }

  onTouchEnd(e) {
    this.touchEndPoint = e.changedTouches[0]
    const movementX = this.touchEndPoint.screenX - this.touchStartPoint.screenX
    const movementY = this.touchEndPoint.screenY - this.touchStartPoint.screenY
    const { move } = this.props
    const isVerticalMove = (movementY !== 0 && movementX === 0) || Math.abs(movementY) / Math.abs(movementX) > 1
    if (isVerticalMove && movementY > 0) move('down')
    else if (movementX > 0) move('right')
    else if (movementX < 0) move('left')
  }

  render() {
    const { gameStart, score, total, cards, currentIndex, isFrozen, timer } = this.props
    return (
      <div className="container" onTouchEnd={this.onTouchEnd} onTouchStart={this.onTouchStart}>
        <Timer />
        <Score score={score} total={total} />
        <CardList cards={cards} currentIndex={currentIndex} showCards={Boolean(timer)} />
        <Hint />
        <Dashboard gameStart={gameStart} isFrozen={isFrozen} hidden={Boolean(timer)} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    score: state.get('score'),
    cards: state.get('cards'),
    total: state.get('cards').size - 1,
    currentIndex: state.get('currentIndex'),
    isFrozen: state.get('isFrozen'),
    timer: state.get('timer'),
  }
}

function mapDispatchToProps(dispatch, getState) {
  return bindActionCreators(
    {
      gameStart: Actions.GAME_START,
      move: Actions.MOVE,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
