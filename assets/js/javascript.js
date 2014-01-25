$(document).ready(function(){
	new countdownTimer('03/31/2014 5:05 PM', '#countdown');

	$('#container').on('webkitAnimationEnd', function() {
		$('#box').addClass('animate');
	});
	
	if ($.browser.mozilla == true) {
  	$('#box').addClass('animate');
	}

	function countdownTimer(dt, elem) {
		var end = new Date(dt),
		_second = 1000,
		_minute = _second * 60,
		_hour = _minute * 60,
		_day = _hour * 24,
		timer;

		function timeRemaining() {
			var now = new Date(),
			distance = end - now;

			if (distance < 0) {
				clearInterval(timer);
				$(elem).html = '0 days 0 hours 0 minutes 0 seconds';
				$(elem).addClass('yes');
				return;
			}
			var days = Math.floor(distance / _day),
			hours = Math.floor((distance % _day) / _hour),
			minutes = Math.floor((distance % _hour) / _minute),
			seconds = Math.floor((distance % _minute) / _second);

			$(elem).html(days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds');
		}
		timer = setInterval(timeRemaining, 1000);
	};
});