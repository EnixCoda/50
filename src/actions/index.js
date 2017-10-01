export const ActionTypes = {
  GAME_START: 'GAME_START',
  GAME_OVER: 'GAME_OVER',
  TIME: 'TIME',
  MOVE: 'MOVE',
  FROZEN: 'FROZEN',
  UNFROZEN: 'UNFROZEN',
}
const placeholderCard = {
  label: '',
  index: Infinity,
}

const generateCards = (amount = 50) => {
  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
  const randomOperator = () => (Math.random() > 1 / 3 ? '+' : '-')
  const generateCard = index => {
    // why 4-9 and 2-9 and 1/3? they are magic numbers!
    let num1 = randomNumber(4, 9)
    let num2 = randomNumber(2, 9)
    if (num1 < num2) {
      // exchange without new variable
      num1 = num1 + num2
      num2 = num1 - num2
      num1 = num1 - num2
    }
    const op = randomOperator()
    let value
    switch (op) {
      case '+':
        value = num1 + num2
        break
      case '-':
        value = num1 - num2
        break
      default:
        throw new Error('undefined operator')
    }
    return {
      label: [num1, op, num2].join(' '),
      value,
      index,
    }
  }
  const cards = []
  while (cards.length < amount) cards.push(generateCard(cards.length))
  cards.push(placeholderCard)
  const lt = card => card.value < 10
  const gt = card => card.value > 10
  const eq = card => card.value === 10
  console.log(cards.filter(lt).length, cards.filter(gt).length, cards.filter(eq).length)
  return cards
}

const Actions = {
  GAME_START: () => (dispatch, getState) => {
    const { time, timer, currentIndex, isFrozen } = getState().toJS()
    if (isFrozen || (time && timer && currentIndex >= 0)) return
    const cards = generateCards()
    dispatch({
      type: ActionTypes.GAME_START,
      payload: {
        cards,
        time: 600,
        timer: setInterval(() => {
          const { time, timer, currentIndex } = getState().toJS()
          if (time && timer && currentIndex >= 0) {
            dispatch({
              type: ActionTypes.TIME,
              payload: {
                time: time - 1,
              },
            })
          } else {
            clearInterval(timer)
            dispatch({ type: ActionTypes.GAME_OVER })
            dispatch({ type: ActionTypes.FROZEN })
            setTimeout(() => {
              dispatch({ type: ActionTypes.UNFROZEN })
            }, 2000)
          }
        }, 100),
      },
    })
  },
  MOVE: direction => (dispatch, getState) => {
    const state = getState()
    if (!state.get('timer')) return
    let correctDirection
    const currentCard = state.getIn(['cards', state.get('currentIndex')]).toJS()
    const correctValue = currentCard.value - 10
    if (correctValue < 0) correctDirection = 'left'
    else if (correctValue > 0) correctDirection = 'right'
    else if (correctValue === 0) correctDirection = 'down'
    dispatch({
      type: ActionTypes.MOVE,
      payload: {
        correct: direction === correctDirection,
        direction,
      },
    })
  },
}

export default Actions
