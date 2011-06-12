function Swizzler(node, search_fun) { 
	this.search_fun = search_fun;
}

var disappointment = {
	"name": "Disappointment",
	"directions": "<div class=\"recipeDirection\">No cocktails can be made with your current bar. To get delicious drinks, add to your bar with the My Bar section</div>",
	"container": {
		"name": "empty glass"
	},
	"link": "http://www.cocktaildb.com/recipe_detail?id=1000",
	"ingredients": []
}

Swizzler.prototype.pick = function() {
	var cocktail = this.search_fun();
	if ( cocktail.length > 0 ) {
		// randomly choose a cocktail from the list
		cocktail = cocktail[Math.floor(Math.random()*cocktail.length)];
	} else {
		cocktail = {
			"drink": disappointment,
			"missing": []
		};
	}
	return cocktail;
}
