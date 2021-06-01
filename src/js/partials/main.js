var resize_my_canvas;
var currentIndexOfChart = -1;
var numpurchasesInfoItemsLen;
var sliderActive = false;
var myChart;
var chartChangeInterval = 0;
var stopPercentAnimFlag = false;
var $flagRunAnim;
var width;
var $flagBodyScrolled;

$(document).ready(function () {
	AOS.init({
		duration: 1200,
		once: true
	});

	function setSquare(id) {
		$('#block' + (id + 1)).addClass('square-chart-item--active').siblings('.square-chart-item').removeClass('square-chart-item--active')
	}

	numpurchasesInfoItemsLen = $('.numpurchases-info-item').length;


	/**
	 * изменяем старый элемент на новый
	 *
	 * @param  {} inpNewIndex приравниваем -1 если нам нужно автоматически сменить на следующий, а не выбрать другой
	 */
	function chartChangeTime() {
		var elem;
		if (currentIndexOfChart == -1) {//первичная инициализация
			currentIndexOfChart = 0;
			elem = $('.numpurchases-info-item[data-target="' + currentIndexOfChart + '"]');

			elem.addClass('numpurchases-info-item--active');
			//тут вызови функцию отрисовки квадрата(currentIndexOfChart - его id)
			setSquare(currentIndexOfChart);
		}
		chartChangeInterval = setInterval(function () {
			var newIndex;
			newIndex = (currentIndexOfChart + 1) % numpurchasesInfoItemsLen;


			elem = $('.numpurchases-info-item[data-target="' + newIndex + '"]');
			elem.addClass('numpurchases-info-item--active')
				.siblings('.numpurchases-info-item--active').removeClass('numpurchases-info-item--active');


			//тут вызови функцию отрисовки квадрата(newIndex - его id)
			setSquare(newIndex);
			currentIndexOfChart = newIndex;
		}, 3000);
	}





	$('.js-numpurchases-info-item').click(function () {//тут обрабатываю клик по элементам списка
		$(this).addClass('numpurchases-info-item--active')
			.siblings('.numpurchases-info-item--active').removeClass('numpurchases-info-item--active')

		currentIndexOfChart = parseInt($(this).attr('data-target'));
		setSquare(currentIndexOfChart);
		clearInterval(chartChangeInterval);
		chartChangeTime();
	});


	$('.js-square-chart-item').click(function () {//тут обрабатывай клик по квадрату
		var newId = $(this).index();//сюда запиши id квадрата
		elem = $('.numpurchases-info-item[data-target="' + newId + '"]');
		elem.addClass('numpurchases-info-item--active')
			.siblings('.numpurchases-info-item--active').removeClass('numpurchases-info-item--active');

		setSquare(newId);
		currentIndexOfChart = newId;
		clearInterval(chartChangeInterval);
		chartChangeTime();
	});



	///////////////events



	$flagRunAnim = false;
	$flagBodyScrolled = false;
/*
	if (window.matchMedia("(min-width: 1341px)").matches) {
		$('body').addClass('preventscroll');

		setTimeout(function () {
			$('body').removeClass('preventscroll');
		}, 2600);

	}*/




	$(document).scroll(function () {
		if (!$flagRunAnim) {//когда доскроллим до блока с chart - начинаем поочерёдно сменять элементы
			var scrollTop = $(document).scrollTop() + $(window).height();
			var elem = $('#numpurchases-chart-wrap');
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

		/*if (!$flagBodyScrolled) {
			$('body').addClass('removeTrDelay');
			$flagBodyScrolled = true;
		}*/

	});


});