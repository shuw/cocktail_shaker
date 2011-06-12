function getCocktailDisplay(cocktail) {
	header = $('h3').text(cocktail.name);
	
	var details = $('<div class="directions">');

	if (cocktail.directions) {
		details.text(cocktail.directions);
	} else {
		var ingredients = $('ul');
		details.append(ingredients);
		
		$(cocktail.ingredients).each(function() {
			ingredients.append( $('li').text(this.name) );
		});
		debugger
	}

	return $('<div class="cocktail result">').append(header, details);
}

function swizzlePanel(recipes, myBar) {
	var o = this;
	$("#editBarButton").button().click(function() {
		context.setActivePanel("bar");
	});
	
	$("#lookupButton").button().click(function() {
		context.setActivePanel("bar");
	});

	var swizzler = new Swizzler($('#swizzler-result'), function() {
		return CS.searchFuzzy(myBar.getInventory(), recipes);
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
