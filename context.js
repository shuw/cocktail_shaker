function index_context() {
    var panels = [
        $("#shakePanel"),
        $("#searchPanel"),
        $("#barPanel")
    ];
    
    function setActivePanel(panelName) {
        $(panels).each(function() { this.hide() });
        $("#" + panelName + "Panel").show();
    }
  
    $("#searchButton").button().click(function() {
        setActivePanel("search");
    });
    
    setActivePanel("shake");
    $(".homeButton").button().click(function() {
        setActivePanel("shake");
    });
}

function gotData(recipes) {
    new lookupPanel(recipes);
	new swizzlePanel(recipes);
}

$.ajax({
     url: 'data/recipes.json',
     dataType: 'json',
     success: function(recipes) {
        gotData(recipes);
     }
 });
