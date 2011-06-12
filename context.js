if (!window.current_user) {
    window.current_user = 74;
}

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
    
    window.context = {};
    window.context.setActivePanel = setActivePanel;
}

function gotData(recipes) {
    new lookupPanel(recipes);
    var bar = new myBar(recipes);
    new swizzlePanel(recipes, bar);
}
