import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Actions from './actions'

import Score from './components/Score'
import Timer from './components/Timer'
import CardList from './components/CardList'
import Hint from './components/Hint'
import Dashboard from './components/Dashboard'
import Touch from './components/Touch'

import './app.less'

class App extends React.PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', this.moveOnKeyDown)
  }

  moveOnKeyDown = e => {
    const { move } = this.props
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
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.moveOnKeyDown)
  }

  onTouchMove = direction => {
    const { move } = this.props
    switch (direction) {
      case 'left':
        return move('left')
      case 'right':
        return move('right')
      case 'down':
        return move('down')
      default:
        break
    }
  }

  render() {
    const { gameStart, score, total, cards, currentIndex, isFrozen, timer } = this.props
    return (
      <Touch className="container" onTouchMove={this.onTouchMove}>
        <Timer />
        <Score score={score} total={total} />
        <CardList cards={cards} currentIndex={currentIndex} showCards={Boolean(timer)} />
        <Hint />
        <Dashboard gameStart={gameStart} isFrozen={isFrozen} hidden={Boolean(timer)} />
      </Touch>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
