var resize_my_canvas;
var currentIndexOfChart = -1;
var numpurchasesInfoItems;
var sliderActive = false;

var chartChangeInterval = 0;
var stopPercentAnimFlag = false;


$(document).ready(function () {
	numpurchasesInfoItems = $('.numpurchases-info-item').length;

	function changeIcon() {
		$('#numpurchases-chart-icons .numpurchases-chi-item').eq(currentIndexOfChart).addClass('numpurchases-chi-item--active').siblings().removeClass('numpurchases-chi-item--active');
	}


	function chartChangeTime() {
		var elem;
		if (currentIndexOfChart == -1) {
			currentIndexOfChart = 0;
			elem = $('.numpurchases-info-item[data-target="' + (currentIndexOfChart == -1 ? 0 : currentIndexOfChart) + '"] .numpurchases-info-item__progess');
			//elem.parent().click();
			elem.parent().addClass('numpurchases-info-item--active');
			elem.addClass('numpurchases-info-item__progess--anim');

			drawDount.animate('first', currentIndexOfChart);
			changeIcon();

		}
		chartChangeInterval = setInterval(function () {
			newIndex = (currentIndexOfChart + 1) % numpurchasesInfoItems;
			//console.log(newIndex);
			elem = $('.numpurchases-info-item[data-target="' + newIndex + '"] .numpurchases-info-item__progess');
			elem.parent().addClass('numpurchases-info-item--active')
				.siblings('.numpurchases-info-item--active').removeClass('numpurchases-info-item--active')
				.find('.numpurchases-info-item__progess').removeClass('numpurchases-info-item__progess--anim');
			elem.addClass('numpurchases-info-item__progess--anim');
			//elem.parent().click();
			//console.log('change', currentIndexOfChart, newIndex);
			drawDount.animate('change', currentIndexOfChart, newIndex);
			currentIndexOfChart = newIndex;
			changeIcon();

			if (sliderActive) {
				$('.js-numpurchases-info').slick('slickGoTo', currentIndexOfChart);

			}


		}, 3000);
	}


	$flagRunAnim = false;
	$(document).scroll(function () {
		if (!$flagRunAnim) {

			var scrollTop = $(document).scrollTop() + $(window).height();
			var elem = $('#numpurchases-chart');
			var elemTop = elem.offset().top;
			var elemH = elem.height();
			if (scrollTop > elemTop + elemH / 2) {
				flagRunAnim = true;
				setTimeout(function () {
					clearInterval(chartChangeInterval);
					chartChangeTime();
				}, 500);

			}
		}
	});


	function roundEven(d) { //округление до четного
		return Math.round(d / 2) * 2;
	}

	var chartWrap = $('#numpurchases-chart-wrap'),
		chart = $('#numpurchases-chart'),
		topLayer = $('#numpurchases-chart-active-level'),
		numpurchasesInfo = $('.numpurchases-info'),
		chartWrapH,
		chartWrapW;

	resize_my_canvas = function () {
		chartWrapH = roundEven(chartWrap.height() + 6);
		chartWrapW = roundEven(chartWrap.width() + 6);
		chart.attr('height', chartWrapH);
		chart.attr('width', chartWrapW);
		topLayer.attr('height', chartWrapH);
		topLayer.attr('width', chartWrapW);

	}
	resize_my_canvas();
	$(window).resize(function () {
		resize_my_canvas();
	});

	var chartItemSpace = 3;


	var ctx = document.getElementById('numpurchases-chart').getContext('2d');




	function arraySum(array) {
		var sum = 0;
		for (var i = 0; i < array.length; i++) {
			sum += Math.max(array[i], 0.7);
		}
		return (sum);
	}
	/*
		var backgroundColorsForGrad = [
			['rgb(180,246,165)', 'rgb(98,219,70)'],
			['rgb(255,170,86)', 'rgb(255,127,0)'],
			['rgb(180,246,165)', 'rgb(98,219,70)'],
			['rgb(255,170,86)', 'rgb(255,127,0)'],
			['rgb(180,246,165)', 'rgb(98,219,70)']
		]
	*/
	//var chartData = [41.27, 11.73, 7.28, 6.57, 6.06];
	var chartDataInPercent = [];
	var chartDataSum = arraySum(chartData);
	var chartDataPercent = chartDataSum / 100;
	var chartDataLength = chartData.length;


	chartData.forEach(function (item, index, chartData) {
		chartDataInPercent[index] = Math.max(item, 0.7) / chartDataPercent;
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
				canvas.lineWidth = this.lineWidth;
				canvas.shadowBlur = 15;



			},

			this.setGradients = function (data) {

				this.numberOfParts = data.numberOfParts;
				this.parts = data.parts.pt;
				var gradients = data.parts.grad;

				this.gradients = [];
				this.shadows = [];

				//компенсация пробелов между секторами
				this.oneGradInPx = 2 * Math.PI * (chartWrapW / 2) / 360; //пикселей внешней окружности на один градус
				this.skipRadians = angleToRad(chartItemSpace / this.oneGradInPx);
				//end компенсация пробелов между секторами


				var df = -(Math.PI * 2) * (25 / 100);
				for (var i = 0; i < this.numberOfParts; i++) { //numberOfParts

					var startPoint = getPoint(this.x, this.y, this.radius + 0.5 * this.lineWidth, df);
					var endPoint = getPoint(this.x, this.y, this.radius + 0.5 * this.lineWidth, df + (Math.PI * 2) * (this.parts[i] / 100));

					this.gradients[i] = canvas.createLinearGradient(startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
					this.gradients[i].addColorStop(0, gradients[i][0]);
					this.gradients[i].addColorStop(1, gradients[i][1]);

					this.shadows[i] = gradients[i][0];

					df += (Math.PI * 2) * (this.parts[i] / 100);
				}
			},

			//отрисовать целый сектор
			this.drawIndex = function (data, index = 0) {


				var df = -(Math.PI * 2) * (25 / 100);

				for (var i = 0; i < this.numberOfParts; i++) {
					if (i == index) {
						canvas.beginPath();
						canvas.shadowColor = backgroundColorsForGrad[i][0];
						canvas.arc(this.x, this.y, this.radius, df + this.skipRadians / 2, df + (Math.PI * 2) * (this.parts[i] / 100) - this.skipRadians / 2);
						canvas.strokeStyle = this.gradients[i];
						canvas.stroke();
						canvas.closePath();
					}

					df += (Math.PI * 2) * (this.parts[i] / 100);
				}
			},

			//отрисовать часть сектора
			this.drawPart = function (dfStart, dfend, shadowColorIndex, gradIndex, currentSkipRadians = 0) {
				canvas.beginPath();
				canvas.shadowColor = backgroundColorsForGrad[shadowColorIndex][0];
				canvas.arc(this.x, this.y, this.radius, dfStart + currentSkipRadians / 2, dfend - currentSkipRadians / 2);
				canvas.strokeStyle = this.gradients[gradIndex];
				canvas.stroke();
				canvas.closePath();
			},



			this.clear = function () {
				canvas.clearRect(0, 0, canvas.canvas.height + 30, canvas.canvas.height + 30);
			},


			this.animate = function (animType, currentIndex, nextIndex = false) {
				var interface = this,

					time = undefined,
					startTime = null,
					endPos = 100, // процент от необходимой длины сектора
					maxDuration = 1500, //максимальное значение продолжительности анимации
					minDuration = 200,
					duration = 1000, // продожительность в миллисекундах на весь круг
					first_dfStart = undefined,
					first_dfEnd = undefined,
					delta_first = undefined,


					current_dfStart = 0,
					current_dfEnd = 0,

					finish_dfStart = undefined,
					finish_dfEnd = undefined,
					delta_finish = undefined,

					nextLower,
					reverse;

				chart.css('pointer-events', 'none');
				numpurchasesInfo.css('pointer-events', 'none');


				if (animType == 'first') { //отрисовка первого фрагмента
					var df = -(Math.PI * 2) * (25 / 100);

					for (var i = 0; i < this.numberOfParts; i++) {
						if (i == currentIndex) {
							first_dfStart = df + this.skipRadians / 2;
							first_dfEnd = df + (Math.PI * 2) * (this.parts[i] / 100) - this.skipRadians / 2;

							if (first_dfStart >= first_dfEnd) {
								first_dfStart = first_dfStart - this.skipRadians / 2;
								first_dfEnd = first_dfEnd + this.skipRadians / 2;
							}
							break;
						}

						df += (Math.PI * 2) * (this.parts[i] / 100);
					}



					delta_first = first_dfEnd - first_dfStart;

					duration = (duration / (Math.PI * 2) * delta_first);
					duration = duration > maxDuration ? maxDuration : duration;
					duration = duration < minDuration ? minDuration : duration;
					//console.log('----',first_dfStart,first_dfEnd,first_dfEnd, duration,'----');
				} else { //переключение на другой элемент

					var df = -(Math.PI * 2) * (25 / 100);

					nextLower = nextIndex < currentIndex;



					for (var i = 0; i < this.numberOfParts; i++) {
						if (i == currentIndex) {
							first_dfStart = df + this.skipRadians / 2;
							first_dfEnd = df + (Math.PI * 2) * (this.parts[i] / 100) - this.skipRadians / 2;
							/*if (first_dfStart >= first_dfEnd) {
								first_dfStart = first_dfStart - this.skipRadians / 2 ;
								first_dfEnd = first_dfEnd + this.skipRadians / 2  ;
							}*/
						}

						if (i == nextIndex) {
							finish_dfStart = df + this.skipRadians / 2;
							finish_dfEnd = df + (Math.PI * 2) * (this.parts[i] / 100) - this.skipRadians / 2;
							/*if (finish_dfStart >= finish_dfEnd) {
								finish_dfStart = finish_dfStart - this.skipRadians / 2 ;
								finish_dfEnd = finish_dfEnd + this.skipRadians / 2 ;
							}*/
						}
						df += (Math.PI * 2) * (this.parts[i] / 100);
					}

					var center1 = (first_dfStart + first_dfEnd) / 2;
					var center2 = (finish_dfStart + finish_dfEnd) / 2;
					if (nextLower) { //id нового элемента меньше чем id старого
						if (center2 + Math.PI * 2 - center1 > center1 - center2) {
							//console.log('reverse1');
							reverse = true;
						} else {
							finish_dfStart += Math.PI * 2;
							finish_dfEnd += Math.PI * 2;
							//console.log('default1');
							reverse = false;
						}

					} else {
						if (center1 + Math.PI * 2 - center2 < center2 - center1) {
							first_dfStart += Math.PI * 2;
							first_dfEnd += Math.PI * 2;
							//console.log('reverse2');
							reverse = true;
						} else {
							//console.log('default2');
							reverse = false;
						}

					}

					if (reverse) {
						delta_first = Math.abs(finish_dfStart - first_dfStart);
						delta_finish = Math.abs(finish_dfEnd - first_dfEnd);
					} else {
						delta_first = first_dfEnd - first_dfStart;
						delta_finish = finish_dfEnd - first_dfEnd;
					}

					/*	if( delta_first < 0.2 || delta_finish < 0.2 || first_dfStart >= first_dfEnd || finish_dfStart >= finish_dfEnd){
							first_dfStart = first_dfStart - this.skipRadians / 2 - this.skipRadians;
							first_dfEnd = first_dfEnd + this.skipRadians / 2 - this.skipRadians;

							finish_dfStart = finish_dfStart - this.skipRadians / 2 + this.skipRadians;
							finish_dfEnd = finish_dfEnd + this.skipRadians / 2 + this.skipRadians;
							delta_first = first_dfEnd - first_dfStart;
							delta_finish = finish_dfEnd - first_dfEnd;

						}*/


					if (delta_first < 0.2 && delta_finish < 0.2) {

						current_dfStart = finish_dfStart;
						current_dfEnd = finish_dfEnd;
						delta_first = 0.1;
						delta_finish = 0.1;
					} else {
						if (delta_first < 0.2) {
							delta_first = 0.2;

						}
						if (delta_finish < 0.2) {
							delta_finish = 0.2;

						}
					}


					duration = duration / (Math.PI * 2) * (((delta_finish + delta_first) / 2));
					duration = duration > maxDuration ? maxDuration : duration;
					duration = duration < minDuration ? minDuration : duration;
					/*console.log('----', first_dfStart, first_dfEnd, delta_first, duration, '----');
					console.log('----', finish_dfStart, finish_dfEnd, delta_finish, duration, '----');*/
				}



				function render(time) {

					if (time === undefined) {
						time = new Date().getTime();
					}
					if (startTime === null) {
						startTime = time;
					}

					interface.clear();


					if (animType == 'first') { //отрисовка первого фрагмента

						current_dfEnd = (((time - startTime) / duration * delta_first) + first_dfStart);
						current_dfEnd = current_dfEnd < first_dfEnd ? current_dfEnd : first_dfEnd;
						interface.drawPart(first_dfStart, current_dfEnd, currentIndex, currentIndex);
					} else { //переключение


						if (reverse) {

							current_dfStart = first_dfStart - (((time - startTime) / duration * delta_first) + interface.skipRadians);
							current_dfEnd = first_dfEnd - (((time - startTime) / duration * delta_finish) + interface.skipRadians);

							current_dfStart = current_dfStart > finish_dfStart ? current_dfStart : finish_dfStart;
							current_dfEnd = current_dfEnd > finish_dfEnd ? current_dfEnd : finish_dfEnd;


							//console.log(current_dfStart,current_dfEnd);

						} else {

							current_dfStart = (((time - startTime) / duration * delta_first) + first_dfStart + interface.skipRadians);
							current_dfEnd = (((time - startTime) / duration * delta_finish) + first_dfEnd + interface.skipRadians);

							current_dfStart = current_dfStart < finish_dfStart ? current_dfStart : finish_dfStart;
							current_dfEnd = current_dfEnd < finish_dfEnd ? current_dfEnd : finish_dfEnd;

						}




						/*	console.log(current_dfStart, current_dfEnd, nextIndex, nextIndex);*/

						interface.drawPart(current_dfStart, current_dfEnd, nextIndex, nextIndex);

					}


				}

				(function animationLoop() {
					if (animType == 'first') { //отрисовка первого фрагмента
						render();
						if (current_dfEnd < first_dfEnd) {
							requestAnimationFrame(animationLoop); //можно передавать параметры
						} else {
							chart.css('pointer-events', 'all');
							numpurchasesInfo.css('pointer-events', 'all');
						}
					} else { //переключение
						render();
						if (!reverse && (current_dfStart < finish_dfStart || current_dfEnd < finish_dfEnd) || reverse && (current_dfStart > finish_dfStart || current_dfEnd > finish_dfEnd)) {
							requestAnimationFrame(animationLoop); //можно передавать параметры
						} else {
							chart.css('pointer-events', 'all');
							numpurchasesInfo.css('pointer-events', 'all');

							interface.clear();

							if (reverse) {
								current_dfStart = current_dfStart > finish_dfStart ? current_dfStart : finish_dfStart;
								current_dfEnd = current_dfEnd > finish_dfEnd ? current_dfEnd : finish_dfEnd;

							} else {
								current_dfStart = current_dfStart < finish_dfStart ? current_dfStart : finish_dfStart;
								current_dfEnd = current_dfEnd < finish_dfEnd ? current_dfEnd : finish_dfEnd;

							}
							interface.drawPart(current_dfStart, current_dfEnd, nextIndex, nextIndex);

						}
					}

				})();
			}
	}


	///init
	var data = {
		numberOfParts: chartDataInPercent.length,
		parts: {
			"pt": chartDataInPercent,
			'grad': backgroundColorsForGrad
		}
	};

	var drawDount = new drawdountChart(chartTopLevel);
	var chartStrokeW = (chartWrapW - 41) / 2 / 100 * 36; //66

	drawDount.set(chartWrapW / 2, chartWrapW / 2, chartWrapW / 2 - 15 - chartStrokeW / 2, 0, Math.PI * 2, chartStrokeW);
	drawDount.setGradients(data);

	$(window).resize(function () {
		canvasTopLevel = document.getElementById("numpurchases-chart-active-level");
		chartTopLevel = canvasTopLevel.getContext("2d");
		drawDount = new drawdountChart(chartTopLevel);
		chartStrokeW = (chartWrapW - 41) / 2 / 100 * 36; //66
		drawDount.set(chartWrapW / 2, chartWrapW / 2, chartWrapW / 2 - 15 - chartStrokeW / 2, 0, Math.PI * 2, chartStrokeW);
		drawDount.setGradients(data);
		drawDount.animate('first', currentIndexOfChart);
	});


	//console.log(chartDataInPercent);

	//drawDount.drawIndex(data, 0);

	//drawDount.drawPart(0, Math.PI * 2, 1, 1);
	/*
	setTimeout(() => {
		//drawDount.animate('first', 0);

		drawDount.animate('change', 0, 1);
	}, 1000);
	setTimeout(() => {
		//		drawDount.animate('change', 0,1);
		drawDount.animate('change', 1, 4);
	}, 3000);
*/
	///////////////CHART.JS

	var myChart = new Chart(ctx, {
		// The type of chart we want to create
		type: 'doughnut',

		// The data for our dataset
		data: {
			//labels: ['41,27%', '11,73%', '7,28%', '6,57%', '6,06%'],
			datasets: [{
				label: 'My First dataset',
				backgroundColor: '#4F5566',
				borderColor: '#3B4255',
				hoverBorderColor: '#3B4255',
				borderWidth: chartItemSpace,
				hoverBackgroundColor: '#5F6576',
				data: chartDataInPercent,
			}]
		},

		// Configuration options go here
		options: {
			responsive: false,
			cutoutPercentage: 64,
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
					//console.log(elements[0]);

					//var index = elements[0]._index;
					//datasetIndex = elements[0]._datasetIndex;

					if (currentIndexOfChart === -1) {
						currentIndexOfChart = elements[0]._index;
						drawDount.animate('first', currentIndexOfChart);
					} else {

						drawDount.animate('change', currentIndexOfChart, elements[0]._index);
						currentIndexOfChart = elements[0]._index;
					}

				}

				//myChart.update();
			},

			animation: {
				duration: 0 // general animation time
			},
			/*	hover: {
					animationDuration: 0 // duration of animations when hovering an item
				},*/
			responsiveAnimationDuration: 0 // animation duration after a resize
		}
	});

	///////////////events

	function triggerChartHover(idx) {
		var meta = myChart.getDatasetMeta(0),
			rect = myChart.canvas.getBoundingClientRect(),
			point = meta.data[idx].getCenterPoint(),
			evt = new MouseEvent('mousemove', {
				clientX: rect.left + point.x,
				clientY: rect.top + point.y
			}),
			node = myChart.canvas;
		node.dispatchEvent(evt);
	}



	$('.js-numpurchases-info-item').on('mouseenter', function () {
		if (window.matchMedia('(max-width: 710px)').matches) {

			var newIndex = parseInt($(this).attr('data-target'));

			function triggerChartHover(idx) {
				var meta = myChart.getDatasetMeta(0),
					rect = myChart.canvas.getBoundingClientRect(),
					point = meta.data[idx].getCenterPoint(),
					evt = new MouseEvent('mousemove', {
						clientX: rect.left + point.x,
						clientY: rect.top + point.y
					}),
					node = myChart.canvas;
				node.dispatchEvent(evt);
			}
			triggerChartHover(newIndex);
		}
	});

	$('.js-numpurchases-info-item').on('mouseleave', function () {
		var newIndex = parseInt($(this).attr('data-target'));

		function triggerChartHover(idx) {
			var meta = myChart.getDatasetMeta(0),
				rect = myChart.canvas.getBoundingClientRect(),
				point = meta.data[idx].getCenterPoint(),
				evt = new MouseEvent('mousemove', {
					clientX: rect.left - 999,
					clientY: rect.top - 999
				}),
				node = myChart.canvas;
			node.dispatchEvent(evt);
		}
		triggerChartHover(newIndex);
	});


	$('.js-numpurchases-info-item').on('click', function () {

		if (!sliderActive) {
			if (!$(this).hasClass('numpurchases-info-item--active')) {

				/*$(this).addClass('numpurchases-info-item--active').find('.numpurchases-info-item__progess').css('width', '100%');
				$(this).siblings().removeClass('numpurchases-info-item--active').find('.numpurchases-info-item__progess').css('width', '0%');*/

				$(this).addClass('numpurchases-info-item--active')
					.siblings('.numpurchases-info-item--active').removeClass('numpurchases-info-item--active')
					.find('.numpurchases-info-item__progess').removeClass('numpurchases-info-item__progess--anim');
				$(this).find('.numpurchases-info-item__progess').addClass('numpurchases-info-item__progess--anim');

				var newIndex = parseInt($(this).attr('data-target'));
				if (currentIndexOfChart === -1) {
					currentIndexOfChart = newIndex;
					drawDount.animate('first', currentIndexOfChart);
				} else {

					drawDount.animate('change', currentIndexOfChart, newIndex);
					currentIndexOfChart = newIndex;
				}

				clearInterval(chartChangeInterval);
				chartChangeTime();
				changeIcon();
			}
		}
	});



	$('.js-numpurchases-info').on('afterChange', function (event, slick, currentSlide) {


		/*$(this).addClass('numpurchases-info-item--active')
			.siblings('.numpurchases-info-item--active').removeClass('numpurchases-info-item--active')
			.find('.numpurchases-info-item__progess').removeClass('numpurchases-info-item__progess--anim');
		$(this).find('.numpurchases-info-item__progess').addClass('numpurchases-info-item__progess--anim');
*/
		var newIndex = currentSlide;
		if (currentIndexOfChart === -1) {
			currentIndexOfChart = newIndex;
			drawDount.animate('first', currentIndexOfChart);
		} else {

			drawDount.animate('change', currentIndexOfChart, newIndex);
			currentIndexOfChart = newIndex;
		}

		clearInterval(chartChangeInterval);
		chartChangeTime();
		changeIcon();
	});

	function initNumpurSlider() {
		sliderActive = true;
		$('.js-numpurchases-info').slick({
			dots: true,
			infinite: false,
			speed: 300,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
	}


	function killNumpurSlider() {
		sliderActive = false;
		$('.js-numpurchases-info').slick('unslick');
	}

	if (window.matchMedia('(max-width: 710px)').matches) {
		initNumpurSlider();
	}


	$(window).resize(function () {

		myChart.resize();
		console.log($('body').width())
		if (window.matchMedia('(max-width: 710px)').matches) {
			if (!sliderActive) {
				initNumpurSlider();

			}
		} else {
			if (sliderActive) {
				killNumpurSlider();

			}
		}
	});
});