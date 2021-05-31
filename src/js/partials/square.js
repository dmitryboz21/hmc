$(document).ready(function () {
	backgroundColorsForGrad.forEach(function (elem, index) {
		/*background: -webkit-linear-gradient(98.35deg, #006AFE 9.02%, #38B2F1 91.17%);background: -moz-linear-gradient(98.35deg, #006AFE 9.02%, #38B2F1 91.17%);background: -o-linear-gradient(98.35deg, #006AFE 9.02%, #38B2F1 91.17%);background: linear-gradient(351.65deg, #006AFE 9.02%, #38B2F1 91.17%);*/
		$('#block' + (index + 1)).css({
			"background": ("linear-gradient(351.65deg, " + elem[0] + " 9.02%, " + elem[1] + " 91.17%)")
		});
	});
});




let area = area_raw;
//alert(area.length);
var sum = 0;
for (var i = 0; i < area_raw.length; i++) {
	sum = sum + area_raw[i];
}
var x = sum / 100;
for (var i = 0; i < area_raw.length; i++) {
	area[i] = area_raw[i] / x;
}
console.log(area);
var left_col_area = area[0] + area[1];
var left_col_h = 100;
var left_col_w = (left_col_area * left_col_h) / 100;

var block1_w = left_col_w;
var block2_w = left_col_w;

block1_h = (left_col_h / left_col_area) * area[0];
block2_h = (left_col_h / left_col_area) * area[1];

var top_line_area = area[2] + area[3] + area[4];
var top_line_w = 100 - left_col_w;
var top_line_h = (top_line_area / top_line_w) * 100;
//alert(top_line_h);

var block3_h = top_line_h;
var block4_h = top_line_h;
var block5_h = top_line_h;

var block3_w = (area[2] / block3_h) * 100;
var block4_w = (area[3] / block3_h) * 100;
var block5_w = (area[4] / block3_h) * 100;


var block3_left = left_col_w;
var block4_left = block3_left + block3_w;
var block5_left = block4_left + block4_w;


var two_col_area = area[5] + area[6] + area[7];
var two_col_h = 100 - top_line_h;
var two_col_w = (two_col_area / two_col_h) * 100;
var two_col_top = top_line_h;
var two_col_left = left_col_w;

var block6_w = two_col_w;
var block7_w = two_col_w;
var block8_w = two_col_w;

var block6_h = (two_col_h * area[5]) / two_col_area;
var block7_h = (two_col_h * area[6]) / two_col_area;
var block8_h = (two_col_h * area[7]) / two_col_area;

var block6_top = two_col_top;
var block7_top = two_col_top + block6_h;
var block8_top = two_col_top + block6_h + block7_h;

var block6_left = two_col_left;
var block7_left = two_col_left;
var block8_left = two_col_left;

var group_area = area[8] + area[9] + area[10] + area[11];
var group_col_left_area = area[8] + area[9];
var group_col_right_area = area[10] + area[11];
var group_width = 100 - (left_col_w + two_col_w);

var group_col_left_w = group_width / (group_area / (group_col_left_area));
var group_col_right_w = group_width - group_col_left_w;

var block9_w = group_col_left_w;
var block10_w = group_col_left_w;

var block11_w = group_col_right_w;
var block12_w = group_col_right_w;

var block9_h = (area[8] / group_col_left_w) * 100;
var block10_h = (area[9] / group_col_left_w) * 100;

var block11_h = (area[10] / group_col_right_w) * 100;
var block12_h = (area[11] / group_col_right_w) * 100;

var block9_left = left_col_w + two_col_w;
var block10_left = left_col_w + two_col_w;

var block11_left = left_col_w + two_col_w + block10_w;
var block12_left = left_col_w + two_col_w + block10_w;

var block9_top = top_line_h;
var block10_top = top_line_h + block9_h;

var block11_top = top_line_h;
var block12_top = top_line_h + block11_h;
////////////////////////////////////

var bt_cl_first_area = area[12] + area[13];
var bt_cl_first_h = 100 - (top_line_h + block9_h + block10_h);
var bt_cl_first_w = (bt_cl_first_area / bt_cl_first_h) * 100;

var block13_w = bt_cl_first_w;
var block13_h = (area[12] / block13_w) * 100;

var block14_w = bt_cl_first_w;
var block14_h = (area[13] / block14_w) * 100;

var block13_left = left_col_w + two_col_w;
var block14_left = left_col_w + two_col_w;

var block13_top = top_line_h + block9_h + block10_h;
var block14_top = top_line_h + block9_h + block10_h + block13_h;
//////////////////////////////////////////////

var bt_cl_two_area = area[14] + area[15];
var bt_cl_two_h = 100 - (top_line_h + block9_h + block10_h);
var bt_cl_two_w = (bt_cl_two_area / bt_cl_two_h) * 100;

var block15_w = bt_cl_two_w;
var block15_h = (area[14] / block15_w) * 100;

var block16_w = bt_cl_two_w;
var block16_h = (area[15] / block16_w) * 100;

var block15_top = top_line_h + block9_h + block10_h;
var block16_top = top_line_h + block9_h + block10_h + block15_h;

var block15_left = left_col_w + two_col_w + bt_cl_first_w;
var block16_left = left_col_w + two_col_w + bt_cl_first_w;

///////////////////////////////////////////////////////////////////

var bt_cl_tree_area = area[16] + area[17];
var bt_cl_tree_h = 100 - (top_line_h + block9_h + block10_h);
var bt_cl_tree_w = (bt_cl_tree_area / bt_cl_tree_h) * 100;

var block17_w = bt_cl_tree_w;
var block17_h = (area[16] / block17_w) * 100;

var block18_w = bt_cl_tree_w;
var block18_h = (area[17] / block18_w) * 100;

var block17_top = top_line_h + block9_h + block10_h;
var block18_top = top_line_h + block9_h + block10_h + block17_h;

var block17_left = left_col_w + two_col_w + bt_cl_first_w + bt_cl_two_w;
var block18_left = left_col_w + two_col_w + bt_cl_first_w + bt_cl_two_w;

/////////////////////////////////////////////////////////////////////

block13_w = String(block13_w) + '%';
block13_h = String(block13_h) + '%';
block13_left = String(block13_left) + '%';
block13_top = String(block13_top) + '%';

block14_w = String(block14_w) + '%';
block14_h = String(block14_h) + '%';
block14_left = String(block14_left) + '%';
block14_top = String(block14_top) + '%';

block15_w = String(block15_w) + '%';
block15_h = String(block15_h) + '%';
block15_left = String(block15_left) + '%';
block15_top = String(block15_top) + '%';

block16_w = String(block16_w) + '%';
block16_h = String(block16_h) + '%';
block16_left = String(block16_left) + '%';
block16_top = String(block16_top) + '%';

block17_w = String(block17_w) + '%';
block17_h = String(block17_h) + '%';
block17_left = String(block17_left) + '%';
block17_top = String(block17_top) + '%';

block18_w = String(block18_w) + '%';
block18_h = String(block18_h) + '%';
block18_left = String(block18_left) + '%';
block18_top = String(block18_top) + '%';


$('#block13').css('width', block13_w);
$('#block13').css('height', block13_h);
$('#block13').css('top', block13_top);
$('#block13').css('left', block13_left);

$('#block14').css('width', block14_w);
$('#block14').css('height', block14_h);
$('#block14').css('top', block14_top);
$('#block14').css('left', block14_left);

$('#block15').css('width', block15_w);
$('#block15').css('height', block15_h);
$('#block15').css('top', block15_top);
$('#block15').css('left', block15_left);

$('#block16').css('width', block16_w);
$('#block16').css('height', block16_h);
$('#block16').css('top', block16_top);
$('#block16').css('left', block16_left);

$('#block17').css('width', block17_w);
$('#block17').css('height', block17_h);
$('#block17').css('top', block17_top);
$('#block17').css('left', block17_left);

$('#block18').css('width', block18_w);
$('#block18').css('height', block18_h);
$('#block18').css('top', block18_top);
$('#block18').css('left', block18_left);



/*console.log(block9_h);
console.log(block10_h);
console.log(block11_h);
console.log(block12_h);*/

block1_h = String(block1_h) + '%';
block2_h = String(block2_h) + '%';
block1_w = String(block1_w) + '%';
block2_w = String(block2_w) + '%';
//alert(block2_h);

$('#block1').css('width', block1_w);
$('#block1').css('height', block1_h);
$('#block1').css('top', 0);
$('#block1').css('left', 0);

$('#block2').css('width', block2_w);
$('#block2').css('height', block2_h);
$('#block2').css('top', block1_h);
$('#block2').css('left', 0);

block3_h = String(block3_h) + '%';
block4_h = String(block4_h) + '%';
block5_h = String(block5_h) + '%';

block3_w = String(block3_w) + '%';
block4_w = String(block4_w) + '%';
block5_w = String(block5_w) + '%';

block3_left = String(block3_left) + '%';
block4_left = String(block4_left) + '%';
block5_left = String(block5_left) + '%';

$('#block3').css('width', block3_w);
$('#block3').css('height', block3_h);
$('#block3').css('top', 0);
$('#block3').css('left', block3_left);

//alert(block4_h);
$('#block4').css('width', block4_w);
$('#block4').css('height', block4_h);
$('#block4').css('top', 0);
$('#block4').css('left', block4_left);

$('#block5').css('width', block5_w);
$('#block5').css('height', block5_h);
$('#block5').css('top', 0);
$('#block5').css('left', block5_left);

block6_w = String(block6_w) + '%';
block7_w = String(block7_w) + '%';
block8_w = String(block8_w) + '%';

block6_h = String(block6_h) + '%';
block7_h = String(block7_h) + '%';
block8_h = String(block8_h) + '%';

block6_top = String(block6_top) + '%';
block7_top = String(block7_top) + '%';
block8_top = String(block8_top) + '%';

block6_left = String(block6_left) + '%';
block7_left = String(block7_left) + '%';
block8_left = String(block8_left) + '%';


$('#block6').css('width', block6_w);
$('#block6').css('height', block6_h);
$('#block6').css('top', block6_top);
$('#block6').css('left', block6_left);

$('#block7').css('width', block7_w);
$('#block7').css('height', block7_h);
$('#block7').css('top', block7_top);
$('#block7').css('left', block7_left);

$('#block8').css('width', block8_w);
$('#block8').css('height', block8_h);
$('#block8').css('top', block8_top);
$('#block8').css('left', block8_left);


block9_w = String(block9_w) + '%';
block9_h = String(block9_h) + '%';
block9_top = String(block9_top) + '%';
block9_left = String(block9_left) + '%';

block10_w = String(block10_w) + '%';
block10_h = String(block10_h) + '%';
block10_top = String(block10_top) + '%';
block10_left = String(block10_left) + '%';

block11_w = String(block11_w) + '%';
block11_h = String(block11_h) + '%';
block11_top = String(block11_top) + '%';
block11_left = String(block11_left) + '%';

block12_w = String(block12_w) + '%';
block12_h = String(block12_h) + '%';
block12_top = String(block12_top) + '%';
block12_left = String(block12_left) + '%';


$('#block9').css('width', block9_w);
$('#block9').css('height', block9_h);
$('#block9').css('top', block9_top);
$('#block9').css('left', block9_left);

$('#block10').css('width', block10_w);
$('#block10').css('height', block10_h);
$('#block10').css('top', block10_top);
$('#block10').css('left', block10_left);

$('#block11').css('width', block11_w);
$('#block11').css('height', block11_h);
$('#block11').css('top', block11_top);
$('#block11').css('left', block11_left);

$('#block12').css('width', block12_w);
$('#block12').css('height', block12_h);
$('#block12').css('top', block12_top);
$('#block12').css('left', block12_left);