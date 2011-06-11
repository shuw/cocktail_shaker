$.ajax({
     url: 'data/recipes.json',
     dataType: 'json',
     success: function(recipes) {
        new ingredientPicker(recipes);
     }
 });


function ingredientPicker(recipes) {
    var o = this;
    o.recipes = recipes;
    o.ingredients = [];
    
    
    
    function init(recipes) {
        var uniqueIngredients = {};
        
        // Find all ingredients and dedupe
        $(recipes).each(function() {
            $(this).each(function() {
                uniqueIngredients[this.name] = 1;
                
            });
        });
        
        for (key in uniqueIngredients) {
            o.ingredients.push(key);
        }
        
        initPicker()
    }
    
    function initPicker(recipes) {
        $("#ingredientsPicker").autocomplete({
                source: o.ingredients
        });
    }
    
    init(recipes);
}