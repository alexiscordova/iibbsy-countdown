import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './countdown.scss'

class Countdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      daysRemaining: null,
      daysRemainingLabel: null,
      hoursRemaining: null,
      hoursRemainingLabel: null,
      minutesRemaining: null,
      minutesRemainingLabel: null,
      secondsRemaining: null,
      secondsRemainingLabel: null
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
        _daysRemaining = Math.floor(timeRemaining / day),
        daysRemainingText = (day === 1) ? 'day' : 'days',
        _hoursRemaining = Math.floor((timeRemaining % day) / hour),
        hoursRemainingText = (_hoursRemaining === 1) ? 'hour' : 'hours',
        _minutesRemaining = Math.floor((timeRemaining % hour) / minute),
        minutesRemainingText = (_minutesRemaining === 1) ? 'minute' : 'minutes',
        _secondsRemaining = Math.floor((timeRemaining % minute) / second),
        secondsRemainingText = (_secondsRemaining === 1) ? 'second' : 'seconds'

      if (timeRemaining > 0) {
        this.setState({
          daysRemaining: _daysRemaining,
          daysRemainingLabel: daysRemainingText,
          hoursRemaining: _hoursRemaining,
          hoursRemainingLabel: hoursRemainingText,
          minutesRemaining: _minutesRemaining,
          minutesRemainingLabel: minutesRemainingText,
          secondsRemaining: _secondsRemaining,
          secondsRemainingLabel: secondsRemainingText
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }

  render() {
    const {
      daysRemaining,
      daysRemainingLabel,
      hoursRemaining,
      hoursRemainingLabel,
      minutesRemaining,
      minutesRemainingLabel,
      secondsRemaining,
      secondsRemainingLabel
    } = this.state

    return (
      <div className="countdown">
        <h1 className="countdown-heading">Opening Day {this.props.year}</h1>
        <div className="countdown-timer-wrapper">
          <div className="countdown-timer-container">
            <span className="countdown-time-remaining">{daysRemaining}</span>
            <span className="countdown-time-remaining-label">{daysRemainingLabel}</span>
          </div>

          <div className="countdown-timer-container">
            <span className="countdown-time-remaining">{hoursRemaining}</span>
            <span className="countdown-time-remaining-label">{hoursRemainingLabel}</span>
          </div>

          <div className="countdown-timer-container">
            <span className="countdown-time-remaining">{minutesRemaining}</span>
            <span className="countdown-time-remaining-label">{minutesRemainingLabel}</span>
          </div>

          <div className="countdown-timer-container">
            <span className="countdown-time-remaining">{secondsRemaining}</span>
            <span className="countdown-time-remaining-label">{secondsRemainingLabel}</span>
          </div>
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
