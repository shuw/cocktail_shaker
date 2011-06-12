function getCocktailDisplay(cocktail) {
	return $('<div class="cocktail result"><h3>'+cocktail.name+'</h3><div class="directions">'+cocktail.directions+'</div></div>');
}

function swizzlePanel(recipes) {
	var o = this;

	var swizzler = new Swizzler($('#swizzler-result'), function() {
		var temp = CS.search([], recipes, 0, 10);
		console.log(temp);
		return temp;
	});

	function onSwizzle() {
		$('#swizzler-result').empty();
		var cocktail = swizzler.pick.call(swizzler);
		if ( cocktail ) {
			$('#swizzler-result').append(getCocktailDisplay(cocktail.drink));
		} else {
			$('#swizzler-result').append('<div>No cocktails for you</div>');
		}
	}

	$('#swizzle-button').click(onSwizzle);
	shakeDetector(onSwizzle);
}
