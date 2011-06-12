function getCocktailDisplay(cocktail, buddies) {
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
	
	var matchedBuddies = buddies[cocktail.name.toLowerCase()];
	
	var drinkingDuddies  = null;
	if (matchedBuddies && matchedBuddies.length) {
		drinkingDuddies = $('<div">');
		drinkingDuddies.append('<br>	')
		drinkingDuddies.append($('<h3>Drinking Buddies</h3>'));
		
		
		var items = $(matchedBuddies).map(function(i, buddy) {
			var holder = $('<div>');
			holder.append($('<img style="width: 40px;" src="' + buddy.pic + '">'));
			
			holder.append($('<span>').text(buddy.name)[0]);
			
			return holder[0];
		});
		
		drinkingDuddies.append(items);
	}
	
	return $('<div class="cocktail result">').append(header, details, drinkingDuddies);
}

function swizzlePanel(recipes, buddies, myBar) {
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
			$('#swizzler-result').append(getCocktailDisplay(cocktail.drink, buddies));
		} else {
			$('#swizzler-result').append('<div>No cocktails for you</div>');
		}
	}

	$('#swizzle-button').click(onSwizzle);
	shakeDetector(onSwizzle);
}
