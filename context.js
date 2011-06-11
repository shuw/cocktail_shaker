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
    
    setActivePanel("search");
}