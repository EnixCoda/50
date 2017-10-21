import React from 'react'
import Card from './Card'

class CardList extends React.Component {
  getRenderClassName(index, card) {
    switch (index) {
      case 0:
        if (card.label === '') return 'placeholder'
        return card.direction +
          (card.correct === true ? ' correct' : '') +
          (card.correct === false ? ' wrong' : '') 
      case 1:
        return 'active'
      case 2:
        return 'pending-1'
      case 3:
        return 'pending-2'
      case 4:
        return 'pending-3'
      case 5:
        return 'pending-4'
      default:
        return ''
    }
  }

  render() {
    const { cards, currentIndex, showCards } = this.props
    const CARDS_TO_RENDER = 6
    const cardsToRender = []
    let i = Math.max(0, currentIndex - CARDS_TO_RENDER + 2)
    while (currentIndex >= 0 && i <= currentIndex + 1) {
      cardsToRender.unshift(cards[i++])
    }

    return (
      <div className="card-list">
        {showCards &&
          cardsToRender.reverse().map((card, index) => (
            // reverse to prevent overlapped by later cards
            <Card
              className={this.getRenderClassName(cardsToRender.length - index - 1, card)}
              key={card.index}
              {...card}
            />
          ))}
      </div>
    )
  }
}

export default CardList
