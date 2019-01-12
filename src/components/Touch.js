import React from 'react'
import PropTypes from 'prop-types'

export default class Touch extends React.Component {
  static propTypes = {
    onTouchMove: PropTypes.func.isRequired,
  }

  touchStartPoint = null

  onTouchStart = e => {
    e.preventDefault()
    this.touchStartPoint = e.changedTouches[0]
  }

  onTouchEnd = e => {
    this.touchEndPoint = e.changedTouches[0]
    const movementX = this.touchEndPoint.screenX - this.touchStartPoint.screenX
    const movementY = this.touchEndPoint.screenY - this.touchStartPoint.screenY
    const { onTouchMove } = this.props
    const isVerticalMove = (movementY !== 0 && movementX === 0) || Math.abs(movementY) / Math.abs(movementX) > 1
    if (isVerticalMove && movementY > 0) onTouchMove('down')
    else if (movementX > 0) onTouchMove('right')
    else if (movementX < 0) onTouchMove('left')
    /**
     * ------+-----
     * left /|\ right
     *     /   \
     *    /     \
     *   /       \
     *  /         \
     * /    down   \
     */
  }

  render() {
    return <div {...this.props} onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} />
  }
}
