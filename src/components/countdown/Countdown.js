import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Countdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timeRemaining: ''
    }

    this.loadCounter = this.loadCounter.bind(this)
  }

  componentDidMount() {
    this.loadCounter()
  }

  loadCounter() {
    let timer = setInterval(() => {
      let second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        now = new Date(),
        endDate = new Date(this.props.openingDay),
        timeRemaining = endDate - now,
        daysRemaining = Math.floor(timeRemaining / day),
        daysText = (day === 1) ? `${daysRemaining} day` : `${daysRemaining} days`,
        hoursRemaining = Math.floor((timeRemaining % day) / hour),
        hoursText = (hoursRemaining === 1) ? `${hoursRemaining} hour` : `${hoursRemaining} hours`,
        minutesRemaining = Math.floor((timeRemaining % hour) / minute),
        minutesText = (minutesRemaining === 1) ? `${minutesRemaining} minute` : `${minutesRemaining} minutes`,
        secondsRemaining = Math.floor((timeRemaining % minute) / second),
        secondsText = (secondsRemaining === 1) ? `${secondsRemaining} second` : `${secondsRemaining} seconds`

      if (timeRemaining <= 0) {
        this.setState({
          timeRemaining: 'YES'
        })

        clearInterval(timer)
      } else {
        this.setState({
          timeRemaining: `${daysText} ${hoursText} ${minutesText} ${secondsText}`
        })
      }
    }, 1000)
  }

  render() {
    return (
      <div className="countdown">
        <h1>Opening Day {this.props.year}</h1>
        <div className="time-remaining">
          <h2>{this.state.timeRemaining}</h2>
        </div>
      </div>
    )
  }
}

Countdown.propTypes = {
  openingDay: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired
}

export default Countdown
