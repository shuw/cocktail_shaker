function ingredientPicker(recipes) {
    var o = this;
    o.recipes = recipes;
    o.ingredients = [];
    o.selectedIngredients = { };
    
    o.getSelected = function() {
        return Object.keys(o.selectedIngredients);
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
       
        o.ingredients = Object.keys(uniqueIngredients);
        
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
            });
            
            var item = $("<li>").text(ingredient + " ").append(removeButton);
            $("#results").append(item);
        });
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
     }
 });