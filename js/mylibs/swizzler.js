function get_cocktail_display(cocktail) {
	return $('<div class="cocktail result"><h3>'+cocktail.name+'</h3><div class="directions">'+cocktail.directions+'</div></div>');
}

function Swizzler(node, search_fun) { 
	this.node = node;
	this.is_active = false;
	this.search_fun = search_fun;
}

Swizzler.prototype.pick = function() {
	var cocktail = this.search_fun();
	if ( cocktail.length > 0 ) {
		// randomly choose a cocktail from the list
		cocktail = cocktail[Math.floor(Math.random()*cocktail.length)];
		this.node.empty();
		this.node.append(get_cocktail_display(cocktail));
	} else {
		this.node.empty();
		this.node.append('<div>No cocktails for you</div>');
	}
	return cocktail;
}
