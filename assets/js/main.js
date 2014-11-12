require.config({
    baseUrl: '/assets/js/',

    paths: {
        modernizr: 'lib/modernizr/modernizr-custom',
        raf: 'lib/raf/raf',
        classList: 'lib/classList/classList'
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
], function(
    Modernizr,
    rAF,
    classList
) {
    
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
                    dayText = (day === 1) ? timeContainer.push(days + ' day') : timeContainer.push(days + ' days'),
                    hours = Math.floor((distance % day) / hour),
                    hourText = (hours === 1) ? timeContainer.push(hours + ' hour') : timeContainer.push(hours + ' hours'),
                    minutes = Math.floor((distance % hour) / minute),
                    minuteText = (minutes === 1) ? timeContainer.push(minutes + ' minute') : timeContainer.push(minutes + ' minutes'),
                    seconds = Math.floor((distance % minute) / second),
                    secondText = (seconds === 1) ? timeContainer.push(seconds + ' second') : timeContainer.push(seconds + ' seconds');

                if (distance < 0) {
                    cancelAnimationFrame(timeRemaining);
                    _elem.innerHTML = '0 days 0 hours 0 minutes 0 seconds';
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