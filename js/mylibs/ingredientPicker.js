function ingredientPicker(recipes, context) {
    var o = this;
    o.recipes = recipes;
    o.ingredients = [];
 
    o.selectedIngredients = { };
  
  
    o.getSelected = function() {
        return Object.keys(o.selectedIngredients).map(function(obj) { return obj.toLowerCase(); });
    }
      
    o.addIngredients = function(ingredients) {
        $(ingredients).each(function(i,ingredient) {
            if (o.selectedIngredients[ingredient]) {
                return; // already added
            }
            
            o.selectedIngredients[ingredient] = true;
            
            var removeButton = $('<a class="remove" href="javascript:void(0)"></a>').text('X').click(function() {
                delete o.selectedIngredients[ingredient];
                item.remove();
                context.selectionUpdated();
            }).button();
            
            var item = $('<li class="ingredient"></li>').text(ingredient + ' ').prepend(removeButton);
            context.selectedNode.append(item);
        });
        
        context.selectionUpdated();
    }
  
    function init(recipes) {
        var uniqueIngredients = {};
        
        // Find all ingredients and dedupe
        $(recipes).each(function() {
            $(this.ingredients).each(function() {
                uniqueIngredients[this.name.toLowerCase()] = 1;
            });
        });
        
        context.addButtonNode.button().click(function() {
            context.pickerNode.search();
            pushIngredients();
        });
       
        o.ingredients = Object.keys(uniqueIngredients).sort(function(a,b){
           
            return a.length - b.length;
            
        });
        
        initPicker()
    }
    
    function pushIngredients() {
        // Clean up and get user entered ingredients
        var ingredients = context.pickerNode.val().trim().split(",").map(function(item) {
            return item.trim();
        }).filter(function (item) {
            return item != "";
        });
        
        // Clear selected ingredients
        context.pickerNode.val("");
        
        // Pass ingredients to caller
        o.addIngredients(ingredients);
    }
    
    function initPicker(recipes) {
        var picker = context.pickerNode.autocomplete(
            o.ingredients,  {
                autoFill: true,
                matchContains: "word"
            }
        )
        .result(pushIngredients)
        .focus();
    }
    
    init(recipes);
}
