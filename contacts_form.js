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
	if(!k.subscribe_button_color){ k.subscribe_button_color = "#60b6e2"; }
	if(!k.subscribe_button_font_color){ k.subscribe_button_font_color = "#fff"; }
	if(!k.subscribe_button_font){ k.subscribe_button_font = "helvetica neue"; }
	if(!k.subscribe_button_font_weight){ k.subscribe_button_font_weight = "200"; }
	if(!k.subscribe_button_letter_spacing){ k.subscribe_button_letter_spacing = "1px"; }
	if(!k.popup_font_color){ k.popup_font_color = "#444"; }
	if(!k.popup_font){ k.popup_font = "helvetica neue"; }
	if(!k.popup_font_weight){ k.popup_font_weight = "500"; }
	if(!k.popup_letter_spacing){ k.popup_letter_spacing = "1px"; }


	$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'http://js.knowtify.io/contacts_form.css') );

	//var svg = '<svg class="mail_icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 300" enable-background="new 0 0 400 300" xml:space="preserve"><g><path d="M368.8,66.8c-3.2-4.9-7.5-8.9-12.6-11.8c-5.5-3.2-11.9-5-18.7-5h-250c-6.8,0-13.2,1.8-18.7,5c-5.1,2.9-9.4,7-12.6,11.8c-3.9,5.9-6.2,13-6.2,20.7v150c0,20.7,16.8,37.5,37.5,37.5h250c20.7,0,37.5-16.8,37.5-37.5v-150C375,79.9,372.7,72.8,368.8,66.8zM87.5,75h250c0.6,0,1.2,0.1,1.8,0.1L224.9,189.5c-3.3,3.3-7.7,5.1-12.4,5.1s-9.1-1.8-12.4-5.1L85.7,75.1C86.3,75.1,86.9,75,87.5,75z M350,237.5c0,6.9-5.6,12.5-12.5,12.5h-250c-6.9,0-12.5-5.6-12.5-12.5v-150c0-0.6,0.1-1.2,0.1-1.8l114.4,114.4c6.1,6.1,14.3,9.5,23,9.5s16.8-3.4,23-9.5L349.9,85.7c0.1,0.6,0.1,1.2,0.1,1.8V237.5z"/></g></svg>';
	var svg = '<svg class="mail_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve"><path style="fill:'+k.subscribe_button_color+'" d="M138 40H62c-12.1 0-22 9.9-22 22v76c0 12.1 9.9 22 22 22h76c12.1 0 22-9.9 22-22V62C160 49.9 150.1 40 138 40z M62 60h76 c1.1 0 2 0.9 2 2v9.2l-29.4 29.4c-5.8 5.8-15.4 5.8-21.2 0L60 71.2V62C60 60.9 60.9 60 62 60z M138 140H62c-1.1 0-2-0.9-2-2V99.5 l15.3 15.3C82.1 121.6 91 125 100 125s17.9-3.4 24.7-10.2L140 99.5V138C140 139.1 139.1 140 138 140z"/></svg>'
	var button = $('<div id="knowtifyjs_button" class="'+k.subscribe_button_position+'">'+svg+' '+k.subscribe_button_text+'</div>');
	button.css({
		background:k.subscribe_button_color,
		color:k.subscribe_button_font_color,
		'font-family':k.subscribe_button_font,
		'font-weight':k.subscribe_button_font_weight,
		'letter-spacing':k.subscribe_button_letter_spacing
	});
	$('body').append(button);
	setTimeout(function(){
		if(k.subscribe_button_position == "top" || k.subscribe_button_position == "top_right" || k.subscribe_button_position == "top_left"){
			button.animate({top:0},300,function(){
				var icon = $('#knowtifyjs_button .mail_icon');
				if(k.subscribe_button_position == "top_right"){
					icon.animate({right:-33},300);
				}
				if(k.subscribe_button_position == "top_left"){
					icon.animate({left:-33},300);
				}
				if(k.subscribe_button_position == "top"){
					icon.find('path').css({fill:k.subscribe_button_font_color,opacity:0});
					icon.find('path').animate({opacity:.35},300);
				}
			});
		}else{
			button.animate({bottom:0},300,function(){
				var icon = $('#knowtifyjs_button .mail_icon');
				if(k.subscribe_button_position == "bottom_right"){
					icon.animate({right:-33},300);
				}
				if(k.subscribe_button_position == "bottom_left"){
					icon.animate({left:-33},300);
				}
				if(k.subscribe_button_position == "bottom"){
					icon.find('path').css({fill:k.subscribe_button_font_color,opacity:0});
					icon.find('path').animate({opacity:.35},300);
				}
			});
		}
	},1500);
	button.on('mouseover',function(){
		$(this).find('.mail_icon').attr('class','mail_icon knowtifyjs_animation');
	});

	var signup_screen = $('<div id="knowtifyjs_screen"></div>');
	var signup_box = $('<div id="knowtifyjs_signup">\
			<h1>Signup for our weekly digest</h1>\
		</div>');
	signup_box.css({
		color:k.popup_font_color,
		'font-family':k.popup_font,
		'font-weight':k.popup_font_weight,
		'letter-spacing':k.popup_letter_spacing
	});


	button.on('click',function(){
		var window_height = $(window).height();
		if(window_height > 500){
			signup_box.css({
				opacity:0,
				height:(window_height-200),
				'margin-top':-((window_height-100)/2)
			});
		}else{
			signup_box.css({
				opacity:0,
				height:(window_height-100),
				'margin-top':0,
				top:0
			});
		}

		$('body').append(signup_screen);
		$('body').append(signup_box);
		signup_box.addClass('knowtifyjs_bounce');
		signup_box.css({opacity:1});
	});
}
})();