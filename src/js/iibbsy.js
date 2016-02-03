'use strict';

var classList = require('../vendors/classlist/classList'),
  raf = require('../vendors/requestAnimationFrame/raf');

function render() {
  countdownTimer('04/03/2016 5:05 PM', '.time-remaining h2');
}

// dt = datetime, in MM/DD/YYYY Hh:ss TZ format
// elem = element, where the remaining time should be inserted
function countdownTimer(dt, elem) {
  var endDate = new Date(dt),
    second = 1000, // 1000ms = 1s
    minute = second * 60, // 60s = 1m
    hour = minute * 60, // 60m = 1hr
    day = hour * 24, // 24hr = 1d
    _elem = document.querySelector(elem),
    timeContainer = [],
    timer;

  (function timeRemaining() {
    var now = new Date(),
      msRemaining = endDate - now, // amount of time (ms) remaining between opening day and right now
      days = Math.floor(msRemaining / day), // amount of time (days) remaining…
      daysText = (day === 1) ? days + ' day' : days + ' days', // make days remaining text singular if remaining days is 1
      hours = Math.floor((msRemaining % day) / hour), // determine how many full days (ms) remain, and convert into hours
      hoursText = (hours === 1) ? hours + ' hour' : hours + ' hours', // make hours remaining text singular if remaining days is 1
      minutes = Math.floor((msRemaining % hour) / minute), // determine how many full hours (ms) remain, and convert into minutes
      minutesText = (minutes === 1) ? minutes + ' minute' : minutes + ' minutes', // make minutes remaining text singular if remaining days is 1
      seconds = Math.floor((msRemaining % minute) / second), // determine how many full minutes (ms) remain, and convert into seconds
      secondsText = (seconds === 1) ? seconds + ' second' : seconds + ' seconds'; // make seconds remaining text singular if remaining days is 1

    timeContainer.push(daysText, hoursText, minutesText, secondsText); // Push text readouts to array

    if (msRemaining < 0) {
      // if the offseason has ended…
      cancelAnimationFrame(timeRemaining);
      _elem.innerHTML = 'YES!'; // it is baseball season!
    } else {
      // if it's still the offseason…
      _elem.innerHTML = timeContainer.toString().replace(/,/g, ' '); // replace comma with space, and insert into DOM
      timeContainer = [];
    };

    timer = requestAnimationFrame(timeRemaining);
  })();
}

render();
