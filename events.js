(function(){
function loadScript(src, callback) {
    var script  = document.createElement("script");
    script.setAttribute("src", src);
    script.addEventListener("load", callback);
    document.getElementsByTagName("script")[0].insertBefore(script);
};

//Not happy about making jquery a dependancy but not going native for v1...
if (typeof jQuery == 'undefined') {
	loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js", function(){
	    loadKnowtifyEvents();
	});
}else{
	loadKnowtifyEvents();
}

function loadKnowtifyEvents(){
	if(window.knowtifyEvents){
		k = window.knowtifyEvents;

		if(k.email){
			var url = window.location.href.toString().split(window.location.host)[1];
			//k.email
			//k.public_token

			//get events
			var data = {
				"public_token":k.public_token,
				"url":url
			}
			$.ajax({
			    type: 'POST',
			    dataType: "json",
			    crossDomain: true,
			    processData: false,
			    contentType: 'application/json',
			    data: JSON.stringify(data),
			    url: "http://www.knowtify.io/api/v1/events/listeners",
			    success: function (data) {
			    	//console.log(data);
			    	for(var i=0;i<data.length;i++){
			    		var e = data[i];
			    		(function(e) {
				    		$('body').on(e.listener,e.element,function(ev){
				    			sendKnowtifyEvent(e.datapoint);
				    		});
				    	}(e));
			    	}
			    }
			});
		}
	}
}

function sendKnowtifyEvent(datapoint){
	var data = {
		"public_token":k.public_token,
		"email":k.email,
		"datapoint":datapoint
	}
	$.ajax({
	    type: 'POST',
	    dataType: "json",
	    crossDomain: true,
	    processData: false,
	    contentType: 'application/json',
	    data: JSON.stringify(data),
	    url: "http://www.knowtify.io/api/v1/contacts/js_increment",
	    success: function (data) {
	    	//console.log(data);
	    }
	});
}
})();