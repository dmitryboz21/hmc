var resize_my_canvas;
var currentIndexOfChart = -1;
var numpurchasesInfoItemsLen;
var sliderActive = false;
var myChart;
var chartChangeInterval = 0;
var stopPercentAnimFlag = false;
var $flagRunAnim;
var width;


$(document).ready(function () {
	AOS.init({
		duration: 1200,
		once: true
	});


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

		}
		chartChangeInterval = setInterval(function () {
			var newIndex;
			newIndex = (currentIndexOfChart + 1) % numpurchasesInfoItemsLen;


			elem = $('.numpurchases-info-item[data-target="' + newIndex + '"]');
			elem.addClass('numpurchases-info-item--active')
				.siblings('.numpurchases-info-item--active').removeClass('numpurchases-info-item--active');


			//тут вызови функцию отрисовки квадрата(newIndex - его id)
			currentIndexOfChart = newIndex;
		}, 3000);
	}





	$('.js-numpurchases-info-item').click(function () {//тут обрабатываю клик по элементам списка
		$(this).addClass('numpurchases-info-item--active')
			.siblings('.numpurchases-info-item--active').removeClass('numpurchases-info-item--active')

		//тут вызови функцию отрисовки квадрата(newIndex - его id)

		currentIndexOfChart = parseInt($(this).attr('data-target'));
		clearInterval(chartChangeInterval);
		chartChangeTime();
	});


	$('.js-square').click(function () {//тут обрабатывай клик по квадрату
		var newId;//сюда запиши id квадрата
		elem = $('.numpurchases-info-item[data-target="' + newId + '"]');
		elem.addClass('numpurchases-info-item--active')
			.siblings('.numpurchases-info-item--active').removeClass('numpurchases-info-item--active');

		//тут вызови функцию отрисовки квадрата(newIndex - его id)

		currentIndexOfChart = newIndex;
		clearInterval(chartChangeInterval);
		chartChangeTime();
	});



	///////////////events



	$flagRunAnim = false;
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
	});


});