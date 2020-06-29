$(function() {
	var imgSvgArray = {};

	function imgSvg() {
		$('img.img-svg').each(function() {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');
			var $svg;

			if (typeof imgSvgArray[imgURL] !== 'undefined') {
				$svg = $(imgSvgArray[imgURL]);
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				$img.replaceWith($svg);
			} else {
				$.ajax({
					url: imgURL,
					async: false,
					dataType: 'xml',
					success: function(data) {
						$svg = $(data).find('svg');

						if (typeof imgID !== 'undefined') {
							$svg = $svg.attr('id', imgID);
						}

						$svg = $svg.removeAttr('xmlns:a');

						if (
							!$svg.attr('viewBox') &&
							$svg.attr('height') &&
							$svg.attr('width')
						) {
							$svg.attr(
								'viewBox',
								'0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width')
							);
						}

						imgSvgArray[imgURL] = $svg[0].outerHTML;

						if (typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass + ' replaced-svg');
						}

						$img.replaceWith($svg);
					}
				});
			}
		});
	}

	imgSvg();

	$('.main').on('DOMNodeInserted', function() {
		imgSvg();
	});

	$('.side-bar__burger').on('click', function() {
		$(this).toggleClass('opened');
		$('.side-bar').toggleClass('opened');
	})
});
