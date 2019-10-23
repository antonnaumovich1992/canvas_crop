function onFileSelected(event) {
	let selectedFile = event.target.files[0];
	let reader = new FileReader();

	let imgtag = document.getElementById('imgBox');
	imgtag.title = selectedFile.name;

	reader.onload = (event) => {
		imgtag.src = event.target.result;

	};
	reader.readAsDataURL(selectedFile);
};

$(document).ready(function () {

	$('.make_crop').click(function () {
		var img = $('.imgBox');
		var img_w = img.width();
		var img_h = img.height();
		init_image_helper(img_w, img_h, img);

		return false;
	})

})

function init_image_helper(iw, ih, img) {
	var bgcolor = '#000000', // Цвет затемнения
		opacity = 0.7, // Прозрачность затемнения
		bordercolor = 'rgba(155,155,155,0.8)', // Цвет рамок
		cornerColor = 'rgba(155,155,155,0.6)', // Фон управляющих точек
		cornerStrokeColor = 'rgba(100,100,100,1)', // Цвет рамок управляющих точек
		cornerSize = 10, // Размер управляющих очек
		showHelpers = true; // Показывать вспомогательные линии

	var src = img.attr('src');
	img.wrap('<div class="crop_wrap" />');

	// Создаем вспомогательные элементы
	var crop_area = img.parent();
	crop_area.html('<div class="crop_controlls">' +
		'<button class="crop_ok">Готово</button> ' +
		'<button class="crop_cancel">Отмена</button>' +
		'</div>' +
		'<canvas id="c"></canvas>');

	var cw = iw;
	var ch = ih;

	// Создаем холст
	var canvas = new fabric.Canvas('canvas', {
		width: cw,
		height: ch,
		backgroundColor: "#ffffff"
	});
	canvas.uniScaleTransform = true;

	// Добавляем изображение на холст
	var imgInstance;
	var fimg = fabric.Image.fromURL(src, function (imgInstance) {
		imgInstance.set({
			left: 0,
			top: 0,
			width: iw,
			height: ih,
			selectable: false,
			evented: false,
			lockMovementX: true,
			lockMovementY: true,
			lockRotation: true,
			lockScalingX: true,
			lockScalingY: true,
			lockUniScaling: true,
			hasControls: false,
			hasBorders: false
		});
		canvas.add(imgInstance);
		canvas.sendToBack(imgInstance);
	});

	var crop_on = true;


	let crop2 = new fabric.Circle({
		radius: 200,
		fill: '#ffffff',
		top: Math.ceil(ch / 4),
		left: Math.ceil(cw / 4),
		hasRotatingPoint: false,
		borderColor: bordercolor,
		opacity: 0.5,
		borderColor: 'red',
		cornerColor: 'green',
		cornerSize: 6,
		transparentCorners: false
	});

	// canvas.item(1).set({
	// 	borderColor: 'red',
	// 	cornerColor: 'green',
	// 	cornerSize: 6,
	// 	transparentCorners: false
	// });
	// canvas.setActiveObject(canvas.item(1));
	// crop2.push(canvas);

	// var crop2 = new fabric.Rect({
	// 	left: Math.ceil(cw / 4),
	// 	top: Math.ceil(ch / 4),
	// 	fill: '#ffffff',
	// 	width: Math.ceil(cw / 2),
	// 	height: Math.ceil(ch / 2),
	// 	hasRotatingPoint: false,
	// 	opacity: 0,
	// 	strokeWidth: 0,
	// 	transparentCorners: false,
	// 	borderColor: bordercolor,
	// 	borderDashArray: [5, 5],
	// 	cornerColor: cornerColor,
	// 	cornerStrokeColor: cornerStrokeColor,
	// 	cornerSize: cornerSize
	// });

	var p = crop2;
	var x1 = Math.ceil(p.left);
	var x2 = Math.ceil(p.left + p.width);
	var y1 = Math.ceil(p.top);
	var y2 = Math.ceil(p.top + p.height);

	// // Прямоугольники затемнения
	// var crop_l = makecrop({
	// 		left: 0,
	// 		top: 0,
	// 		width: x1,
	// 		height: ch
	// 	}),
	// 	crop_r = makecrop({
	// 		left: x2,
	// 		top: 0,
	// 		width: cw - x2,
	// 		height: ch
	// 	}),
	// 	crop_t = makecrop({
	// 		left: x1,
	// 		top: 0,
	// 		width: x2 - x1,
	// 		height: y1
	// 	}),
	// 	crop_b = makecrop({
	// 		left: x1,
	// 		top: y2,
	// 		width: x2 - x1,
	// 		height: ch - y2
	// 	});

	// // Вспомогательные линии
	// if (showHelpers) {
	// 	var crop_help_1 = make_line({
	// 			x1: Math.ceil((x2 - x1) / 3) + x1,
	// 			y1: y1,
	// 			x2: Math.ceil((x2 - x1) / 3) + x1,
	// 			y2: y2
	// 		}),
	// 		crop_help_2 = make_line({
	// 			x1: Math.ceil((x2 - x1) / 3 * 2) + x1,
	// 			y1: y1,
	// 			x2: Math.ceil((x2 - x1) / 3 * 2) + x1,
	// 			y2: y2
	// 		}),
	// 		crop_help_3 = make_line({
	// 			x1: x1,
	// 			y1: Math.ceil((y2 - y1) / 3) + y1,
	// 			x2: x2,
	// 			y2: Math.ceil((y2 - y1) / 3) + y1
	// 		});
	// 	crop_help_4 = make_line({
	// 		x1: x1,
	// 		y1: Math.ceil((y2 - y1) / 3 * 2) + y1,
	// 		x2: x2,
	// 		y2: Math.ceil((y2 - y1) / 3 * 2) + y1
	// 	});
	// }
	// helper_block;
	$('.crop_controlls').css({
		'top': y2 - $('.crop_controlls').outerHeight() - 10 + 'px',
		'left': x2 - $('.crop_controlls').outerWidth() - 10 + 'px'
	});

	// // Добавляем объекты на холст
	canvas.add(crop2);
	// canvas.add(crop_l);
	// canvas.add(crop_r);
	// canvas.add(crop_t);
	// canvas.add(crop_b);

	// if (showHelpers) {
	// 	canvas.add(crop_help_1);
	// 	canvas.add(crop_help_2);
	// 	canvas.add(crop_help_3);
	// 	canvas.add(crop_help_4);
	// }

	canvas.setActiveObject(crop2);

	canvas.on({
		'object:moving': onCroping,
		'object:scaling': onCroping
	});

	// Пересчитываем при изменении области
	function onCroping(e) {
		var p = e.target,
			wi = Math.ceil(p.width * p.scaleX),
			hi = Math.ceil(p.height * p.scaleY);


		if (p.top < 0) {
			p.set({
				'top': 0
			});
		}
		if (p.left < 0) {
			p.set({
				'left': 0
			});
		}
		if (wi + p.left > cw) {
			p.set({
				'left': cw - wi
			});
		}
		if (hi + p.top > ch) {
			p.set({
				'top': ch - hi
			});
		}
		if (wi > cw) {
			p.set({
				'scaleX': 1,
				'width': cw,
				'left': 0
			});
		}
		if (hi > ch) {
			p.set({
				'scaleY': 1,
				'height': ch,
				'top': 0
			});
		}

		wi = Math.ceil(p.width * p.scaleX),
			hi = Math.ceil(p.height * p.scaleY);

		var x1 = Math.ceil(p.left);
		var x2 = Math.ceil(p.left + wi);
		var y1 = Math.ceil(p.top);
		var y2 = Math.ceil(p.top + hi);

		crop_l.set({
			'width': x1
		});
		crop_r.set({
			'left': x2,
			'width': cw - x2
		});
		crop_t.set({
			'left': x1,
			'width': x2 - x1,
			'height': y1
		});
		crop_b.set({
			'left': x1,
			'width': x2 - x1,
			'top': y2,
			'height': ch - y2
		});

		if (showHelpers) {
			crop_help_1.set({
					x1: Math.ceil((x2 - x1) / 3) + x1,
					y1: y1,
					x2: Math.ceil((x2 - x1) / 3) + x1,
					y2: y2
				}),
				crop_help_2.set({
					x1: Math.ceil((x2 - x1) / 3 * 2) + x1,
					y1: y1,
					x2: Math.ceil((x2 - x1) / 3 * 2) + x1,
					y2: y2
				}),
				crop_help_3.set({
					x1: x1,
					y1: Math.ceil((y2 - y1) / 3) + y1,
					x2: x2,
					y2: Math.ceil((y2 - y1) / 3) + y1
				});
			crop_help_4.set({
				x1: x1,
				y1: Math.ceil((y2 - y1) / 3 * 2) + y1,
				x2: x2,
				y2: Math.ceil((y2 - y1) / 3 * 2) + y1
			});
		}

		canvas.renderAll();

		// helper_block;
		$('.crop_controlls').css({
			'top': y2 - $('.crop_controlls').outerHeight() - 10 + 'px',
			'left': x2 - $('.crop_controlls').outerWidth() - 10 + 'px'
		});
	}

	// Обрезаем
	function makecrop(coords) {
		return new fabric.Circle({
			radius: 100,
			fill: '#f55',
			top: Math.ceil(ch / 4),
			left: Math.ceil(cw / 4),
			hasRotatingPoint: false,
			borderColor: bordercolor,
			opacity: 0.5,
			borderColor: 'red',
			cornerColor: 'green',
			cornerSize: 6,
			transparentCorners: false
		});
		// new fabric.Rect({
		// 	left: coords.left,
		// 	top: coords.top,
		// 	fill: bgcolor,
		// 	width: coords.width,
		// 	height: coords.height,
		// 	selectable: false,
		// 	evented: false,
		// 	lockMovementX: true,
		// 	lockMovementY: true,
		// 	lockRotation: true,
		// 	lockScalingX: true,
		// 	lockScalingY: true,
		// 	lockUniScaling: true,
		// 	hasControls: false,
		// 	hasBorders: false,
		// 	opacity: opacity,
		// 	strokeWidth: 0,
		// 	hasBorder: false
		// });
	}

	// Генерируем вспомогательную линию
	function make_line(coords) {
		return new fabric.Line([coords.x1, coords.y1, coords.x2, coords.y2], {
			selectable: false,
			evented: false,
			lockMovementX: true,
			lockMovementY: true,
			lockRotation: true,
			lockScalingX: true,
			lockScalingY: true,
			lockUniScaling: true,
			hasControls: false,
			strokeDashArray: [5, 5],
			stroke: bordercolor
		});
	}

	// применить
	$('.crop_ok').on('click', function () {

		if (crop_on) {
			var x = crop2.left,
				y = crop2.top,
				width = crop2.width * crop2.scaleX,
				height = crop2.height * crop2.scaleY;

			canvas.remove(crop_t, crop_b, crop_r, crop_l, crop2);
			if (showHelpers) {
				canvas.remove(crop_help_1, crop_help_2, crop_help_3, crop_help_4);
			}
		}

		canvas.deactivateAll();

		if (!fabric.Canvas.supports('toDataURL')) {
			alert('This browser doesn\'t provide means to serialize canvas to an image');
		} else {
			var resultimg = canvas.toDataURL({
				format: 'jpeg',
				left: x,
				top: y,
				width: width,
				height: height
			});

			crop_area.html('<img src="' + resultimg + '" alt="" class="cropd" />');
		}

		return false;
	});

	// Отменить
	$('.crop_cancel').on('click', function () {
		crop_area.html('<img src="' + src + '" alt="" />');
		return false;
	});
}