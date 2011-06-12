function getCocktailDisplay(cocktail) {
	var header = $('<h3>').text(cocktail.name);
	
	var details = $('<div class="directions">');

	if (cocktail.directions) {
		details.html(cocktail.directions);
	} else {
		var ingredients = $('<ul>');
		details.append(ingredients);
		
		var items = $(cocktail.ingredients).map(function(i, ingredient) {
			return $('<li>').text(ingredient.name)[0];
		});
		
		ingredients.append(items);
	}

	return $('<div class="cocktail result">').append(header, details);
}

function swizzlePanel(recipes, myBar) {
	var o = this;
	$("#editBarButton").button().click(function() {
		context.setActivePanel("bar");
	});
	
	$("#lookupButton").button().click(function() {
		context.setActivePanel("search");
	});

	var swizzler = new Swizzler($('#swizzler-result'), function() {
		return CS.searchFuzzy(myBar.getInventory(), recipes);
	});

	function onSwizzle() {
		$('#swizzler-result').empty();
		var cocktail = swizzler.pick.call(swizzler);
		if ( cocktail ) {
			$("#swizzle-button").text("swizzle").addClass('minimized');
			$('#swizzler-result').append(getCocktailDisplay(cocktail.drink));
		} else {
			$('#swizzler-result').append('<div>No cocktails for you</div>');
		}
	}

	$('#swizzle-button').click(onSwizzle);
	shakeDetector(onSwizzle);
}
