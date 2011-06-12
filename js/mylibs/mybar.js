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
    }
    
    o.populated = false;
    
    function updateInventory(myStuff) {
        o.myInventory = {};
        $(myStuff).each(function() { o.myInventory[this] = true });
    }
    
    loadDataForUser(74, function(myStuff) {
        o.picker.addIngredients(myStuff);
        updateInventory(myStuff);
    });
}


function loadDataForUser(userId, callback) {
    callback(["rum", "coke"]);
    return;
    
    $.ajax({
         url: 'http://www.mybar.mobi/getbar.php?uid=' + userId,
         dataType: 'json',
         success: callback
    });
}