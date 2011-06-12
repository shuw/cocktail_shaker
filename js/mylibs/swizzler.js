function Swizzler(node, search_fun) { 
	this.search_fun = search_fun;
}

Swizzler.prototype.pick = function() {
	var cocktail = this.search_fun();
	if ( cocktail.length > 0 ) {
		// randomly choose a cocktail from the list
		cocktail = cocktail[Math.floor(Math.random()*cocktail.length)];
	} else {
		cocktail = null;
	}
	return cocktail;
}