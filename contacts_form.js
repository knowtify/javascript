(function(){
if(window.knowtifyJS){
	var k = window.knowtifyJS;
	//Not happy about making jquery a dependancy but not going native for v1...
	if (typeof jQuery == 'undefined') {
	    var script = document.createElement('script');
	    script.type = "text/javascript";
	    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js";
	    document.getElementsByTagName('head')[0].appendChild(script);
	}

	//Defaults
	if(!k.subscribe_button_text){ k.subscribe_button_text = "Subscribe to our newsletter"; }
	if(!k.subscribe_button_position){ k.subscribe_button_position = "bottom_right"; }


	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'http://js.knowtify.io/contacts_form.css') );

	var svg = '<svg class="mail_icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 300" enable-background="new 0 0 400 300" xml:space="preserve"><g><path d="M368.8,66.8c-3.2-4.9-7.5-8.9-12.6-11.8c-5.5-3.2-11.9-5-18.7-5h-250c-6.8,0-13.2,1.8-18.7,5c-5.1,2.9-9.4,7-12.6,11.8c-3.9,5.9-6.2,13-6.2,20.7v150c0,20.7,16.8,37.5,37.5,37.5h250c20.7,0,37.5-16.8,37.5-37.5v-150C375,79.9,372.7,72.8,368.8,66.8zM87.5,75h250c0.6,0,1.2,0.1,1.8,0.1L224.9,189.5c-3.3,3.3-7.7,5.1-12.4,5.1s-9.1-1.8-12.4-5.1L85.7,75.1C86.3,75.1,86.9,75,87.5,75z M350,237.5c0,6.9-5.6,12.5-12.5,12.5h-250c-6.9,0-12.5-5.6-12.5-12.5v-150c0-0.6,0.1-1.2,0.1-1.8l114.4,114.4c6.1,6.1,14.3,9.5,23,9.5s16.8-3.4,23-9.5L349.9,85.7c0.1,0.6,0.1,1.2,0.1,1.8V237.5z"/></g></svg>';
	$('body').append('<div id="knowtifyjs_button" class="'+k.subscribe_button_position+'">'+svg+' '+k.subscribe_button_text+'</div>');
}
})();