$(document).ready(function () {


	$('.js-numpurchases-info-item').on('mouseenter',function(){
		$(this).css('color', $(this).attr('data-hover-color'));
	});
	$('.js-numpurchases-info-item').on('mouseleave',function(){
		$(this).css('color', '');
	});


	$('.js-numpurchases-info-item').on('click',function(){
		if(!$(this).hasClass('numpurchases-info-item--active')){
			$(this).addClass('numpurchases-info-item--active').css('border-color', $(this).attr('data-hover-color'));

			$(this).siblings().removeClass('numpurchases-info-item--active').css('border-color', '');
		}
	});


	var ctx = document.getElementById('numpurchases-chart').getContext('2d');



	gradient = ctx.createLinearGradient(50, 50, 0, 150);
	gradient.addColorStop(0, 'blue');
	gradient.addColorStop(0.5, 'green');
	gradient.addColorStop(1, 'red');



	backgroundColors = [gradient, '#4F5566', gradient, '#4F5566', '#4F5566'];




	var myChart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'doughnut',

		// The data for our dataset
		data: {
			labels: ['41,27%', '11,73%', '7,28%', '6,57%', '6,06%'],
			datasets: [{
				label: 'My First dataset',
				backgroundColor: backgroundColors,
				borderColor: '#3B4255',
				borderWidth: 2,
				hoverBackgroundColor: '#5F6576',
				data: [41.27, 11.73, 7.28, 6.57, 6.06],
			}]
		},

		// Configuration options go here
		options: {
			cutoutPercentage: 30,
			legend: {
				display: false
			},
			tooltips: false,
			events: ['mousemove', 'click'],
			onHover: function (evt, activeElements) {

			},
			onClick: function (evt, elements) {
				var datasetIndex;
				var dataset;

				if (elements.length) {
					console.log(elements[0]);
					var index = elements[0]._index;
					datasetIndex = elements[0]._datasetIndex;

					// Reset old state
					dataset = myChart.data.datasets[datasetIndex];
					dataset.backgroundColor = backgroundColors.slice();

					//dataset.hoverBackgroundColor = '#4F5566';

					dataset.backgroundColor[index] = 'red'; // click color
					//dataset.hoverBackgroundColor[index] = 'red';
				}

				myChart.update();
			}
		}
	});












	gradient = ctx.createLinearGradient(50, 50, 0, 150);
	gradient.addColorStop(0, 'blue');
	gradient.addColorStop(0.5, 'green');
	gradient.addColorStop(1, 'red');


	var canvas = document.getElementById("numpurchases-chart-active-level");
	var chart = canvas.getContext("2d");

	function drawdountChart(canvas) {

		this.x, this.y, this.radius, this.lineWidth, this.strockStyle, this.from, this.to = null;
		this.set = function (x, y, radius, from, to, lineWidth, strockStyle) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.from = from;
			this.to = to;
			this.lineWidth = lineWidth;
			this.strockStyle = strockStyle;
		}

		this.draw = function (data) {
			canvas.beginPath();
			canvas.lineWidth = this.lineWidth;
			canvas.strokeStyle = this.strockStyle;
			canvas.arc(this.x, this.y, this.radius, this.from, this.to);
			canvas.stroke();
			var numberOfParts = data.numberOfParts;
			var parts = data.parts.pt;
			var colors = data.colors.cs;
			var df = 0;
			for (var i = 0; i < numberOfParts; i++) {
				if (i % 2 == 1) {

					canvas.beginPath();
					canvas.strokeStyle = colors[i];
					canvas.arc(this.x, this.y, this.radius, df, df + (Math.PI * 2) * (parts[i] / 100));



					canvas.stroke();
				}
				df += (Math.PI * 2) * (parts[i] / 100);
			}
		}
	}
	var data = {
		numberOfParts: 4,
		parts: {
			"pt": [20, 30, 25, 25]
		}, //percentage of each parts
		colors: {
			"cs": ["red", "green", "blue", "yellow"]
		} //color of each part
	};

	var drawDount = new drawdountChart(chart);
	drawDount.set(150, 150, 100, 0, Math.PI * 2, 30, "#fff");
	drawDount.draw(data);
});