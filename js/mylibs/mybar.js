function myBar(recipes) {
    var o = this;
    o.myInventory = {};
    
    o.getInventory = function() {
        return Object.keys(o.myInventory);
    }
    
    o.picker = new ingredientPicker(recipes, {
        addButtonNode: $("#addToMyBarButton"),
        pickerNode: $("#myBarPicker"),
        selectedNode: $("#myBarSelected"),
        selectionUpdated: selectionUpdated
    });
 
    var selectedItems = [];
    
    function selectionUpdated() {
        if (!o.populated) {
            o.populated = true;
            return; // skip initial sync event since we just added stuff
        }
        
        var added = [];
        var removed = [];
        
        $(o.picker.getSelected()).each(function(i, item) {
            if (!o.myInventory[item]) {
                added.push(item);   
            }
            o.myInventory[item] = true;
        });
        
        var oldInventory = o.getInventory();
        
        updateInventory(o.picker.getSelected());
        
        $(oldInventory).each(function(i, item) {
           if (!o.myInventory[item]) {
                removed.push(item);
           }
        });
        
        SwizzleApi.addItems(current_user, added);
        $(removed).each(function(i, item) {
            SwizzleApi.removeItem(current_user, item);
        })
        
    }
    
    o.populated = false;
    
    function updateInventory(myStuff) {
        o.myInventory = {};
        $(myStuff).each(function() { o.myInventory[this] = true });
    }
    
    SwizzleApi.getItems(current_user, function(myStuff) {
        o.picker.addIngredients(myStuff);
        updateInventory(myStuff);
    });
}

SwizzleApi = new function() {
    this.getItems = function(userId, callback) {
        $.ajax({
             url: 'http://mybar.mobi/cocktail_shaker/getbar.php?uid=' + userId,
             dataType: 'json',
             success: callback
        });
    }
    
    this.addItems = function(userId, items, callback) {
        var ingredients = items.join(',');

        $.ajax({
             url: 'http://mybar.mobi/cocktail_shaker/addingredient.php?uid=' + userId + "&ingredients=" + encodeURIComponent(ingredients),
             dataType: 'json',
             success: callback
        });
    }
    
     this.removeItem = function(userId, item, callback) {
        $.ajax({
             url: 'http://mybar.mobi/cocktail_shaker/removeingredient.php?uid=' + userId + "&ingredient=" + encodeURIComponent(item),
             dataType: 'json',
             success: callback
        });
    }
};