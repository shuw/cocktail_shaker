if (window.current_user === undefined) {
    window.current_user = getParameterByName('uid');
} else if (window.current_user === 0) {
    window.location = "http://mybar.mobi/user";
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
  
    $("#searchButton").click(function() {
        setActivePanel("search");
    });
    
    setActivePanel("shake");
    $(".homeButton").click(function() {
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
