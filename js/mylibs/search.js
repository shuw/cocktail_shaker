(function(CS) {

	function makeDrink(ingrediants, drink, min_matching, max_missing) {
		var drink_ingrediants = drink.ingredients,
			missing = 0,
			have = 0;
		var matched = 0;
		
		var missingIngredients = [];
		for ( var i = 0; i < drink_ingrediants.length; i++ ) {
			var requiredIngredient = drink_ingrediants[i].name.toLowerCase() ;
			if ( !(requiredIngredient in ingrediants) ) {
				missing = missing + 1;
				missingIngredients.push(requiredIngredient);
				if ( missing > max_missing ) {
					break;
				}
			} else {
				matched++;
			}
		}
		
		var isMatched = missing <= max_missing  &&
			matched >= min_matching;
			
		return {
			isMatched: isMatched,
			missing: missingIngredients,
			drink: drink
		}
	}

	function search(ingrediants, drinks, min_matching, max_missing) {
		if ( max_missing === undefined ) {
			max_missing = 0;
		}
		if ( min_matching === undefined ) {
			min_matching = ingrediants.length;
		}
		
		if ( $.isArray(ingrediants) ) { // need table
			var temp = {}
			for ( var i = 0; i < ingrediants.length; i++ ){
				temp[ingrediants[i]] = true;
			}
			ingrediants = temp;
		}

		var results = [];

		for (var i = 0; i < drinks.length; i++) {
			var result = makeDrink(ingrediants, drinks[i], min_matching, max_missing);
			if ( result.isMatched ) {
				results.push(result);
			}
		};

		return results;
	}
	
	function searchFuzzy(ingredients, drinks) {
		var results = search(ingredients, drinks);
		if (results.length) {
			return results;
		}
		
		results = search(ingredients, drinks, 2, 1);
		return results;
	}

	CS.searchFuzzy = searchFuzzy;
	CS.makeDrink = makeDrink;
	CS.search = search;

})(CS)
