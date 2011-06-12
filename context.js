if (!window.current_user) {
    window.current_user = getParameterByName('uid');
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

function gotData(recipes, buddies) {
    new lookupPanel(recipes);
    var bar = new myBar(recipes);
    new swizzlePanel(recipes, buddies, bar);
}


function getParameterByName( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
