function ingredientPicker(recipes) {
    var o = this;
    o.recipes = recipes;
    o.ingredients = [];
    o.selectedIngredients = { };
    
    o.getSelected = function() {
        return Object.keys(o.selectedIngredients).map(function(obj) { return obj.toLowerCase(); });
    }
    
    function init(recipes) {
        var uniqueIngredients = {};
        
        // Find all ingredients and dedupe
        $(recipes).each(function() {
            $(this.ingredients).each(function() {
                uniqueIngredients[this.name] = 1;
            });
        });
        
        $("#addIngredientButton").button().click(pushIngredients);
       
        o.ingredients = Object.keys(uniqueIngredients).sort(function(a,b){
            if (a.length == b.length) {
                return a - b;
            }
            else {
                return a.length - b.length;
            }
        });
        
        initPicker()
    }
    
    function pushIngredients() {
        // Clean up and get user entered ingredients
        var ingredients = $("#ingredientsPicker").val().trim().split(",").map(function(item) {
            return item.trim();
        }).filter(function (item) {
            return item != "";
        });
        
        // Clear ingredients
        $("#ingredientsPicker").val("");
        
        
        $(ingredients).each(function(i,ingredient) {
            if (o.selectedIngredients[ingredient]) {
                return; // already added
            }
            
            o.selectedIngredients[ingredient] = true;
            
            var removeButton = $("<a href='#'>").text("X").click(function() {
                delete o.selectedIngredients[ingredient];
                item.remove();
                updateSearchResults();
            });
            
            var item = $("<li>").text(ingredient + " ").append(removeButton);
            $("#selectedIngredients").append(item);
        });
        
        updateSearchResults();
    }
    
    function updateSearchResults() {
        var results = CS.search(o.getSelected(), o.recipes);
        
        var items = $(results).map(function() {
            return $("<li>").text(this.name)[0];
        })
        
        $("#searchResults").empty();
        $("#searchResults").append(items);
    }
    
    function initPicker(recipes) {
        var picker = $("#ingredientsPicker").autocomplete(
            o.ingredients,  {
                autoFill: true,
                matchContains: "word"
            }
        ).result(pushIngredients);
    }
    
    init(recipes);
}

$.ajax({
     url: 'data/recipes.json',
     dataType: 'json',
     success: function(recipes) {
        new ingredientPicker(recipes);
		swizzler = new Swizzler($('#swizzler-result'), function() {
			return CS.search([], recipes, 10);
		});
		$('#swizzle-button').click(function() { swizzler.pick.call(swizzler); });
		shakeDetector(function() { swizzler.pick.call(swizzler) });
     }
 });
