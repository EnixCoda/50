import { ActionTypes } from '../actions'
import Immutable from 'immutable'
const InitialState = Immutable.Map({
  isFrozen: false,
  cards: [],
  currentIndex: -1,
  time: 0,
  timer: 0,
  score: 0,
})

const reducer = (state = InitialState, action) => {
  const { time, timer, cards, correct, direction } = action.payload || {}
  switch (action.type) {
    case ActionTypes.GAME_START:
      if (state.isFrozen) return state
      else return state.merge({ cards, currentIndex: cards.length - 2, time, timer, score: 0 })
    case ActionTypes.GAME_OVER:
      return state.merge({ timer: 0 })
    case ActionTypes.TIME:
      return state.merge({ time })
    case ActionTypes.MOVE:
      return state
        .merge({
          currentIndex: state.get('currentIndex') - 1,
          score: state.get('score') + (correct ? 1 : 0),
        })
        .setIn(`cards.${state.get('currentIndex')}.direction`.split('.'), direction)
        .setIn(`cards.${state.get('currentIndex')}.correct`.split('.'), correct)
    case ActionTypes.FROZEN:
      return state.merge({ isFrozen: true })
    case ActionTypes.UNFROZEN:
      return state.merge({ isFrozen: false })
    default:
      return state
  }
}

export default reducer
