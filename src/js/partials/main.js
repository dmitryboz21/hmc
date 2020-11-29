var resize_my_canvas;
$(document).ready(function () {

	function roundEven(d) { //округление до четного
		return Math.round(d / 2) * 2;
	}

	var chartWrap = $('#numpurchases-chart-wrap'),
		chart = $('#numpurchases-chart'),
		topLayer = $('#numpurchases-chart-active-level'),
		chartWrapH,
		chartWrapW;

	resize_my_canvas = function () {
		chartWrapH = roundEven(chartWrap.height());
		chartWrapW = roundEven(chartWrap.width());
		chart.attr('height', chartWrapH);
		chart.attr('width', chartWrapW);
		topLayer.attr('height', chartWrapH);
		topLayer.attr('width', chartWrapW);

	}
	resize_my_canvas();;
	$(document).resize(function () {
		resize_my_canvas();
	});

	var chartItemSpace = 3;


	var ctx = document.getElementById('numpurchases-chart').getContext('2d');




	function arraySum(array) {
		var sum = 0;
		for (var i = 0; i < array.length; i++) {
			sum += array[i];
		}
		return (sum);
	}

	var backgroundColorsForGrad = [
		['rgb(180,246,165)', 'rgb(98,219,70)'],
		['rgb(255,170,86)', 'rgb(255,127,0)'],
		['rgb(180,246,165)', 'rgb(98,219,70)'],
		['rgb(255,170,86)', 'rgb(255,127,0)'],
		['rgb(180,246,165)', 'rgb(98,219,70)']
	]

	var chartData = [41.27, 11.73, 7.28, 6.57, 6.06];
	var chartDataInPercent = [];
	var chartDataSum = arraySum(chartData);
	var chartDataPercent = chartDataSum / 100;
	var chartDataLength = chartData.length;


	chartData.forEach(function (item, index, chartData) {
		chartDataInPercent[index] = item / chartDataPercent;
	});








	function getPoint(c1, c2, radius, angle) { //смещение точки по окружности
		return [c1 + Math.cos(angle) * radius, c2 + Math.sin(angle) * radius];
	}

	function radToAngle(rad) {
		return (rad * 180 / Math.PI);
	}

	function angleToRad(angle) {
		return (angle * Math.PI / 180);
	}


	/////////////////CUSTOM active chart


	var canvasTopLevel = document.getElementById("numpurchases-chart-active-level");
	var chartTopLevel = canvasTopLevel.getContext("2d");

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
			},



			this.drawIndex = function (data, index = 0, start = 0, end = 100) {
				canvas.lineWidth = this.lineWidth;
				canvas.strokeStyle = this.strockStyle;

				var numberOfParts = data.numberOfParts;
				var parts = data.parts.pt;

				var df = -(Math.PI * 2) * (25 / 100);

				var oneGradInPx = 2 * Math.PI * (chartWrapW / 2) / 360;
				var skipRadians = angleToRad(chartItemSpace / oneGradInPx);
				console.log(skipRadians);

				for (var i = 0; i < numberOfParts; i++) { //numberOfParts
					if (i == index) {
						canvas.lineWidth = this.lineWidth;
						canvas.beginPath();

						canvas.shadowColor = backgroundColorsForGrad[i][0];
						canvas.shadowBlur = 15;
						canvas.arc(this.x, this.y, this.radius, df + skipRadians / 2, df + (Math.PI * 2) * (parts[i] / 100) - skipRadians / 2);

						var startPoint = getPoint(this.x, this.y, this.radius + 0.5 * this.lineWidth, df);
						var endPoint = getPoint(this.x, this.y, this.radius + 0.5 * this.lineWidth, df + (Math.PI * 2) * (parts[i] / 100));



						var gradient = ctx.createLinearGradient(startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
						gradient.addColorStop(0, backgroundColorsForGrad[i][0]);
						gradient.addColorStop(1, backgroundColorsForGrad[i][1]);
						canvas.strokeStyle = gradient;
						canvas.stroke();

						canvas.closePath();

					}

					df += (Math.PI * 2) * (parts[i] / 100);
				}
			},

			this.clear = function () {
				console.log(this.radius*2, this.radius*2);
				canvas.clearRect(0, 0, canvas.canvas.height+30, canvas.canvas.height+30);
			}
	}
	var data = {
		numberOfParts: chartDataInPercent.length,
		parts: {
			"pt": chartDataInPercent
		} //percentage of each parts
	};

	var drawDount = new drawdountChart(chartTopLevel);
	var chartStrokeW = 33.7 * chartWrapW / 100 / 2; //66

	console.log(chartStrokeW);
	drawDount.set(chartWrapW / 2, chartWrapW / 2, chartWrapW / 2 - 15 - chartStrokeW / 2, 0, Math.PI * 2, chartStrokeW, "rgba(255,255,255,0)");
	console.log(chartDataInPercent);
	//drawDount.draw(data);
	drawDount.drawIndexA(data, 0);




	///////////////CHART.JS
/*
	var myChart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'doughnut',

		// The data for our dataset
		data: {
			labels: ['41,27%', '11,73%', '7,28%', '6,57%', '6,06%'],
			datasets: [{
				label: 'My First dataset',
				backgroundColor: '#4F5566',
				borderColor: '#3B4255',
				hoverBorderColor :  '#3B4255',
				borderWidth: chartItemSpace,
				hoverBackgroundColor: '#5F6576',
				data: chartDataInPercent,
			}]
		},

		// Configuration options go here
		options: {
			responsive: false,
			cutoutPercentage: 63.7,
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

					//var index = elements[0]._index;
					//datasetIndex = elements[0]._datasetIndex;


				}

				myChart.update();
			}
		}
	});
*/

	///////////////events


	$('.js-numpurchases-info-item').on('mouseenter', function () {
		$(this).css('color', $(this).attr('data-hover-color'));
	});
	$('.js-numpurchases-info-item').on('mouseleave', function () {
		$(this).css('color', '');
	});


	$('.js-numpurchases-info-item').on('click', function () {
		if (!$(this).hasClass('numpurchases-info-item--active')) {
			$(this).addClass('numpurchases-info-item--active').css('border-color', $(this).attr('data-hover-color'));

			$(this).siblings().removeClass('numpurchases-info-item--active').css('border-color', '');
		}
	});

















});