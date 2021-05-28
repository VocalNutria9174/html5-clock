/*global window, jQuery*/
(function () {
	'use strict';

	var $ = jQuery,
		PI_2 = Math.PI * 2,
		PI_05 = Math.PI * 0.5,
		canvas = $('#clock')[0],
		context,
		clock = {};

	function drawClockFrame() {
		var min,
			radius,
			rotate_arg = (1 / 60) * PI_2,
			radius_large = clock.size.half * 0.02,
			radius_small = clock.size.half * 0.01;

		context.save();
		context.translate(clock.center.x, clock.center.y);
		context.rotate(-PI_05);

		context.lineWidth = 0;
		context.strokeStyle = '';
		context.fillStyle = 'rgba(0, 0, 0, 0.7)';

		for (min = 0; min < 60; min++) {
			radius = (min % 5 === 0) ? radius_large : radius_small;

			context.beginPath();
			context.arc(clock.size.half, 0, radius, 0, PI_2);
			context.fill();

			context.rotate(rotate_arg);
		}

		context.restore();
	}

	function drawMinute() {
		var now = new Date(),
			arg = (now.getMinutes() / 60 + now.getSeconds() / 3600) * PI_2 - PI_05,
			size = 0.9;

		context.save();
		context.translate(clock.center.x, clock.center.y);
		context.rotate(arg);

		context.lineWidth = clock.size.half * 0.06;
		context.strokeStyle = 'rgba(0, 0, 0, 0.7)';

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(clock.size.half * size, 0);
		context.stroke();

		context.restore();
	}

	function drawHour() {
		var now = new Date(),
			arg = ((now.getHours() % 12) / 12 + now.getMinutes() / 720) * PI_2 - PI_05,
			size = 0.65;

		context.save();
		context.translate(clock.center.x, clock.center.y);
		context.rotate(arg);

		context.lineWidth = clock.size.half * 0.1;
		context.strokeStyle = 'rgba(0, 0, 0, 0.7)';

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(clock.size.half * size, 0);
		context.stroke();

		context.restore();
	}

	function refresh() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawClockFrame();
		drawHour();
		drawMinute();
	}

	$(window).resize(function () {
		var $window = $(window);

		$('#clock').attr({
			width: $window.width() - 10,
			height: $window.height() - 10
		});

		clock.center = {
			x: Math.floor($window.width() / 2),
			y: Math.floor($window.height() / 2)
		};
		clock.size = {
			half: Math.floor(Math.min(canvas.width, canvas.height) * 0.45)
		};
		clock.size.full = clock.size.half * 2;

		context = canvas.getContext('2d');
		context.lineCap = 'round';
		context.lineJoin = 'round';

		refresh();
	}).resize();

	window.setInterval(refresh, 1000);
}());