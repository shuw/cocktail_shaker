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
		$("#result-chart").empty();
		$('#swizzler-result').empty();
		var cocktail = swizzler.pick.call(swizzler);
		$('#swizzler-result-title').text('');
		if ( cocktail ) {
			$("#swizzle-button").text("swizzle").addClass('minimized');
			$('#swizzler-result').append(getCocktailDisplay(cocktail, buddies));
		} else {
			$('#swizzler-result').append('<div>No cocktails for you</div>');
		}
	}

	$('#swizzle-button').click(onSwizzle);
	shakeDetector(onSwizzle);
}

function getCocktailDisplay(result, buddies) {
	var cocktail = result.drink;
	var itemText = cocktail.name;
	if (result.missing.length) {
	    itemText += " (" + result.missing.map(function(x) { return "-" + x; }).join(", ") + ")";
	}
	
	$('#swizzler-result-title').text(itemText);
	
	var details = $('<div class="directions">');

	var visual = getVisualDisplay(cocktail.ingredients);
	if (visual) {
		details.append(visual);
	}

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
	
	var matchedBuddies = matchBuddes(cocktail, buddies);
	
	var matchedBuddies = $(matchedBuddies).filter(function() {
		return this.uid != current_user;
	})
	
	var drinkingDuddies  = null;
	if (matchedBuddies && matchedBuddies.length) {
		drinkingDuddies = $('<div">');
		drinkingDuddies.append('<br>	')
		drinkingDuddies.append($('<h3>Drinking Buddies</h3>'));
		
		var items = $(matchedBuddies).map(function(i, buddy) {
			var holder = $('<span>');
			holder.append($('<img style="width: 50px; height: 50px; padding-right: 8px; padding-top:4px;" src="' + buddy.pic + '">'));
			
			return holder[0];
		});
		
		drinkingDuddies.append(items);
	}
	
	return $('<div class="cocktail result">').append(details, drinkingDuddies);
}

function matchBuddes(cocktail, buddies) {
	var matched = $(buddies).map(function() {
		if (Math.random() < 0.25) {
			return this;
		}
		return null;
	});
	
	return matched;
}

function getVisualDisplay(ingredients) {
	var amounts = [];
	var totalAmount = 0;
	var parts = [];
	
	
	$(ingredients).each(function() {
		var comps = this.amount.split(" ").map(function(o) {return o.trim().toLowerCase(); });
		
		if (comps.length != 2) {
			return;
		}
		
		
		var amount = parseFloat(comps[0]);
		var unit = comps[1];
		if (unit == "gill") {
			amount = amount * 4;	
		}
		else if (unit != "oz") {
			return;
		}
		
		parts.push({
			amount: amount,
			ingredient: this
		});
		
		totalAmount += amount;
	});

	
	$(parts).map(function() {
		return this.portion = this.amount / totalAmount;
	});
	

	if (parts.length == 0) {
		return null;
	}
	
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Ingredient');
	data.addColumn('number', 'Amount');
	$(parts).each(function() {
		data.addRows([[this.ingredient.name, this.amount]]);
	});
	
	var chartContainer = $("#result-chart");
	var chart = new google.visualization.PieChart(chartContainer[0]);
	chart.draw(data, {
		width: 280,
		height: 150,
		is3D: true,
		chartArea: {
			left: 0,
			right: 0,
			height: 140
		},
		legend: 'right'
	});
}
