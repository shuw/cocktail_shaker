(function(CS) {

	function can_make(ingrediants, drink, max_missing) {
		var drink_ingrediants = drink.ingrediants,
			missing = 0,
			have = 0;
		for ( var i = 0; i < drink_ingrediants.length; i++ ) {
			if ( !(drink_ingrediants[i].name.toLowerCase() in ingrediants) ) {
				missing = missing + 1;
				if ( missing > max_missing ) {
					return false;
				}
			}
		}
		return true;
	}

	function search(ingrediants, drinks, max_missing) {
		if ( $.isArray(ingrediants) ) { // need table
			var temp = {}
			for ( var i = 0; i < ingrediants.length; i++ ){
				temp[ingrediants[i]] = true;
			}
			ingrediants[temp];
		}

		if ( max_missing === undefined ) {
			max_missing = 0;
		}

		var results = [];

		for (var i = 0; i < drinks.length; i++) {
			if ( can_make(ingrediants, drinks[i], max_missing) ) {
				results.push(drinks[i]);
			}
		};

		return results;

	}

	CS.can_make = can_make;
	CS.search = search;

})(CS)
