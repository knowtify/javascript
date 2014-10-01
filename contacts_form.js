(function(){
if(window.knowtifyJS){
	//Not happy about making jquery a dependancy but not going native for v1...
	if (typeof jQuery == 'undefined') {
	    var script = document.createElement('script');
	    script.type = "text/javascript";
	    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js";
	    document.getElementsByTagName('head')[0].appendChild(script);
	}
	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'http://js.knowtify.io.s3-website-us-east-1.amazonaws.com/contacts_form.css') );

	$('body').append('<div id="knowtifyjs_button">Subscribe</div>');
}
})();