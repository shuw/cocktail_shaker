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
    
    setActivePanel("bar");
    $(".homeButton").button().click(function() {
        setActivePanel("shake");
    });
}

function gotData(recipes) {
    new lookupPanel(recipes);
}

$.ajax({
     url: 'data/recipes.json',
     dataType: 'json',
     success: function(recipes) {
        gotData(recipes);
     }
 });