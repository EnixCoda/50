import React from 'react'

export default class Score extends React.PureComponent {
  render() {
    const { score, total } = this.props
    return (
      <div className="score-wrapper">
        <label>score</label>
        <label className="score">
          {score}
          {total !== -1 && '/' + total}
        </label>
      </div>
    )
  }
}
