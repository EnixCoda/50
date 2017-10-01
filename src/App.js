import React, { Component } from 'react'
import { connect } from 'react-redux'

import Actions from './actions'

import Score from './components/Score'
import Timer from './components/Timer'
import CardList from './components/CardList'
import Hint from './components/Hint'
import Dashboard from './components/Dashboard'
import './app.css'

class App extends Component {
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
    e.nativeEvent.preventDefault()
    this.touchStartPoint = e.nativeEvent.changedTouches[0]
  }

  onTouchEnd(e) {
    this.touchEndPoint = e.nativeEvent.changedTouches[0]
    const movementX = this.touchEndPoint.screenX - this.touchStartPoint.screenX
    const movementY = this.touchEndPoint.screenY - this.touchStartPoint.screenY
    const { move } = this.props
    const isVerticalMove = (movementY !== 0 && movementX === 0) || Math.abs(movementY) / Math.abs(movementX) > 1
    if (isVerticalMove && movementY > 0) move('down')
    else if (movementX > 0) move('right')
    else if (movementX < 0) move('left')
  }

  render() {
    const { time, timer, gameStart, score, cards, currentIndex, isFrozen } = this.props
    return (
      <div className="container" onTouchEnd={this.onTouchEnd.bind(this)} onTouchStart={this.onTouchStart.bind(this)}>
        <Timer time={time} />
        <Score score={score} total={cards.length - 1} />
        <CardList cards={cards} currentIndex={currentIndex} showCards={!!timer} />
        <Hint />
        <Dashboard gameStart={gameStart} isFrozen={isFrozen} hidden={timer} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.toJS()
}

function mapDispatchToProps(dispatch, getState) {
  return {
    gameStart() {
      dispatch(Actions.GAME_START())
    },
    move(direction) {
      dispatch(Actions.MOVE(direction))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
