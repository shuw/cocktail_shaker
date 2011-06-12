function lookupPanel(recipes) {
    var o = this;
    
    var picker = new ingredientPicker(recipes, {
        addButtonNode: $("#addIngredientButton"),
        pickerNode: $("#ingredientsPicker"),
        selectedNode: $("#selectedIngredients"),
        selectionUpdated: selectionUpdated
    });
    
    function selectionUpdated() {
        var results = CS.searchFuzzy(picker.getSelected(), recipes);
        
        var items = $(results).map(function() {
            var itemText = this.drink.name;
            if (this.missing.length) {
                itemText += " (" + this.missing.map(function(x) { return "-" + x; }).join(", ") + ")";
            }
            
            return $("<li>").text(itemText)[0];
        })
        
        $("#searchResults").empty();
        $("#searchResults").append(items);
    }
}