require.config({
    baseUrl: '/',
    paths: {
        modernizr: 'assets/js/modernizr-custom',
        raf: 'assets/vendor/requestAnimationFrame/raf',
        classList: 'assets/vendor/classList/classList'
    },

    shim: {
        modernizr: {
            exports: 'Modernizr'
        }
    },

    waitSeconds: 10
});

require([
    'modernizr',
    'raf',
    'classList'
], function() {
    var IIBBSY = IIBBSY || {
        init: function() {
            var self = this;

            self.countdownTimer('04/05/2015 5:05 PM', '.countdown h2');
        },

        countdownTimer: function(dt, elem) {
            var endDate = new Date(dt),
                second = 1000,
                minute = second * 60,
                hour = minute * 60,
                day = hour * 24,
                _elem = document.querySelector(elem),
                timeContainer = [],
                timer;

            (function timeRemaining() {
                var now = new Date(),
                    distance = endDate - now,
                    days = Math.floor(distance / day),
                    daysText = (day === 1) ? days + ' day' : days + ' days',
                    hours = Math.floor((distance % day) / hour),
                    hoursText = (hours === 1) ? hours + ' hour' : hours + ' hours',
                    minutes = Math.floor((distance % hour) / minute),
                    minutesText = (minutes === 1) ? minutes + ' minute' : minutes + ' minutes',
                    seconds = Math.floor((distance % minute) / second),
                    secondsText = (seconds === 1) ? seconds + ' second' : seconds + ' seconds';

                timeContainer.push(daysText, hoursText, minutesText, secondsText);

                if (distance < 0) {
                    cancelAnimationFrame(timeRemaining);
                    _elem.innerHTML = 'YES!';
                } else {
                    _elem.innerHTML = timeContainer.toString().replace(/,/g,' ');
                    timeContainer = [];
                }

                timer = requestAnimationFrame(timeRemaining);
            })();

            document.querySelector('.box').classList.add('show');
        }
    };

    IIBBSY.init();
});