//websockets
//(function(){var t=function(t,n){return function(){return t.apply(n,arguments)}},n={}.hasOwnProperty,e=function(t,e){function s(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t};this.WebSocketRails=function(){function n(n,e){this.url=n,this.use_websockets=null!=e?e:!0,this.connection_stale=t(this.connection_stale,this),this.pong=t(this.pong,this),this.supports_websockets=t(this.supports_websockets,this),this.dispatch_channel=t(this.dispatch_channel,this),this.unsubscribe=t(this.unsubscribe,this),this.subscribe_private=t(this.subscribe_private,this),this.subscribe=t(this.subscribe,this),this.dispatch=t(this.dispatch,this),this.trigger_event=t(this.trigger_event,this),this.trigger=t(this.trigger,this),this.unbind=t(this.unbind,this),this.bind=t(this.bind,this),this.connection_established=t(this.connection_established,this),this.new_message=t(this.new_message,this),this.reconnect=t(this.reconnect,this),this.callbacks={},this.channels={},this.queue={},this.connect()}return n.prototype.connect=function(){return this.state="connecting",this._conn=this.supports_websockets()&&this.use_websockets?new n.WebSocketConnection(this.url,this):new n.HttpConnection(this.url,this),this._conn.new_message=this.new_message},n.prototype.disconnect=function(){return this._conn&&(this._conn.close(),delete this._conn._conn,delete this._conn),this.state="disconnected"},n.prototype.reconnect=function(){var t,n,e,s,i;e=null!=(s=this._conn)?s.connection_id:void 0,this.disconnect(),this.connect(),i=this.queue;for(n in i)t=i[n],t.connection_id!==e||t.is_result()||this.trigger_event(t);return this.reconnect_channels()},n.prototype.new_message=function(t){var e,s,i,o,c,r;for(r=[],i=0,o=t.length;o>i;i++)s=t[i],e=new n.Event(s),e.is_result()?(null!=(c=this.queue[e.id])&&c.run_callbacks(e.success,e.data),delete this.queue[e.id]):e.is_channel()?this.dispatch_channel(e):e.is_ping()?this.pong():this.dispatch(e),r.push("connecting"===this.state&&"client_connected"===e.name?this.connection_established(e.data):void 0);return r},n.prototype.connection_established=function(t){return this.state="connected",this._conn.setConnectionId(t.connection_id),this._conn.flush_queue(),null!=this.on_open?this.on_open(t):void 0},n.prototype.bind=function(t,n){var e;return null==(e=this.callbacks)[t]&&(e[t]=[]),this.callbacks[t].push(n)},n.prototype.unbind=function(t){return delete this.callbacks[t]},n.prototype.trigger=function(t,e,s,i){var o,c;return o=new n.Event([t,e,null!=(c=this._conn)?c.connection_id:void 0],s,i),this.trigger_event(o)},n.prototype.trigger_event=function(t){var n,e;return null==(n=this.queue)[e=t.id]&&(n[e]=t),this._conn&&this._conn.trigger(t),t},n.prototype.dispatch=function(t){var n,e,s,i,o;if(null!=this.callbacks[t.name]){for(i=this.callbacks[t.name],o=[],e=0,s=i.length;s>e;e++)n=i[e],o.push(n(t.data));return o}},n.prototype.subscribe=function(t,e,s){var i;return null==this.channels[t]?(i=new n.Channel(t,this,!1,e,s),this.channels[t]=i,i):this.channels[t]},n.prototype.subscribe_private=function(t,e,s){var i;return null==this.channels[t]?(i=new n.Channel(t,this,!0,e,s),this.channels[t]=i,i):this.channels[t]},n.prototype.unsubscribe=function(t){return null!=this.channels[t]?(this.channels[t].destroy(),delete this.channels[t]):void 0},n.prototype.dispatch_channel=function(t){return null!=this.channels[t.channel]?this.channels[t.channel].dispatch(t.name,t.data):void 0},n.prototype.supports_websockets=function(){return"function"==typeof WebSocket||"object"==typeof WebSocket},n.prototype.pong=function(){var t,e;return t=new n.Event(["websocket_rails.pong",{},null!=(e=this._conn)?e.connection_id:void 0]),this._conn.trigger(t)},n.prototype.connection_stale=function(){return"connected"!==this.state},n.prototype.reconnect_channels=function(){var t,n,e,s,i;s=this.channels,i=[];for(e in s)n=s[e],t=n._callbacks,n.destroy(),delete this.channels[e],n=n.is_private?this.subscribe_private(e):this.subscribe(e),n._callbacks=t,i.push(n);return i},n}(),WebSocketRails.Event=function(){function t(t,n,e){var s;this.success_callback=n,this.failure_callback=e,this.name=t[0],s=t[1],null!=s&&(this.id=null!=s.id?s.id:65536*(1+Math.random())|0,this.channel=null!=s.channel?s.channel:void 0,this.data=null!=s.data?s.data:s,this.token=null!=s.token?s.token:void 0,this.connection_id=t[2],null!=s.success&&(this.result=!0,this.success=s.success))}return t.prototype.is_channel=function(){return null!=this.channel},t.prototype.is_result=function(){return"undefined"!=typeof this.result},t.prototype.is_ping=function(){return"websocket_rails.ping"===this.name},t.prototype.serialize=function(){return JSON.stringify([this.name,this.attributes()])},t.prototype.attributes=function(){return{id:this.id,channel:this.channel,data:this.data,token:this.token}},t.prototype.run_callbacks=function(t,n){return this.success=t,this.result=n,this.success===!0?"function"==typeof this.success_callback?this.success_callback(this.result):void 0:"function"==typeof this.failure_callback?this.failure_callback(this.result):void 0},t}(),WebSocketRails.AbstractConnection=function(){function t(t,n){this.dispatcher=n,this.message_queue=[]}return t.prototype.close=function(){},t.prototype.trigger=function(t){return"connected"!==this.dispatcher.state?this.message_queue.push(t):this.send_event(t)},t.prototype.send_event=function(t){return null!=this.connection_id?t.connection_id=this.connection_id:void 0},t.prototype.on_close=function(t){var n;return this.dispatcher&&this.dispatcher._conn===this?(n=new WebSocketRails.Event(["connection_closed",t]),this.dispatcher.state="disconnected",this.dispatcher.dispatch(n)):void 0},t.prototype.on_error=function(t){var n;return this.dispatcher&&this.dispatcher._conn===this?(n=new WebSocketRails.Event(["connection_error",t]),this.dispatcher.state="disconnected",this.dispatcher.dispatch(n)):void 0},t.prototype.on_message=function(t){return this.dispatcher&&this.dispatcher._conn===this?this.dispatcher.new_message(t):void 0},t.prototype.setConnectionId=function(t){this.connection_id=t},t.prototype.flush_queue=function(){var t,n,e,s;for(s=this.message_queue,n=0,e=s.length;e>n;n++)t=s[n],this.trigger(t);return this.message_queue=[]},t}(),WebSocketRails.HttpConnection=function(t){function n(t,e){var s;this.dispatcher=e,n.__super__.constructor.apply(this,arguments),this._url="http://"+t,this._conn=this._createXMLHttpObject(),this.last_pos=0;try{this._conn.onreadystatechange=function(t){return function(){return t._parse_stream()}}(this),this._conn.addEventListener("load",this.on_close,!1)}catch(i){s=i,this._conn.onprogress=function(t){return function(){return t._parse_stream()}}(this),this._conn.onload=this.on_close,this._conn.readyState=3}this._conn.open("GET",this._url,!0),this._conn.send()}return e(n,t),n.prototype.connection_type="http",n.prototype._httpFactories=function(){return[function(){return new XDomainRequest},function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}]},n.prototype.close=function(){return this._conn.abort()},n.prototype.send_event=function(t){return n.__super__.send_event.apply(this,arguments),this._post_data(t.serialize())},n.prototype._post_data=function(t){return $.ajax(this._url,{type:"POST",data:{client_id:this.connection_id,data:t},success:function(){}})},n.prototype._createXMLHttpObject=function(){var t,n,e,s,i,o;for(s=!1,n=this._httpFactories(),i=0,o=n.length;o>i;i++){e=n[i];try{s=e()}catch(c){t=c;continue}break}return s},n.prototype._parse_stream=function(){var t,n,e;if(3===this._conn.readyState){t=this._conn.responseText.substring(this.last_pos),this.last_pos=this._conn.responseText.length,t=t.replace(/\]\]\[\[/g,"],[");try{return e=JSON.parse(t),this.on_message(e)}catch(s){n=s}}},n}(WebSocketRails.AbstractConnection),WebSocketRails.WebSocketConnection=function(t){function n(t,e){this.url=t,this.dispatcher=e,n.__super__.constructor.apply(this,arguments),this.url.match(/^wss?:\/\//)||(this.url="https:"===window.location.protocol?"wss://"+this.url:"wss://"+this.url),this._conn=new WebSocket(this.url),this._conn.onmessage=function(t){return function(n){var e;return e=JSON.parse(n.data),t.on_message(e)}}(this),this._conn.onclose=function(t){return function(n){return t.on_close(n)}}(this),this._conn.onerror=function(t){return function(n){return t.on_error(n)}}(this)}return e(n,t),n.prototype.connection_type="websocket",n.prototype.close=function(){return this._conn.close()},n.prototype.send_event=function(t){return n.__super__.send_event.apply(this,arguments),this._conn.send(t.serialize())},n}(WebSocketRails.AbstractConnection),WebSocketRails.Channel=function(){function n(n,e,s,i,o){var c,r,h;this.name=n,this._dispatcher=e,this.is_private=null!=s?s:!1,this.on_success=i,this.on_failure=o,this._failure_launcher=t(this._failure_launcher,this),this._success_launcher=t(this._success_launcher,this),this._callbacks={},this._token=void 0,this._queue=[],r=this.is_private?"websocket_rails.subscribe_private":"websocket_rails.subscribe",this.connection_id=null!=(h=this._dispatcher._conn)?h.connection_id:void 0,c=new WebSocketRails.Event([r,{data:{channel:this.name}},this.connection_id],this._success_launcher,this._failure_launcher),this._dispatcher.trigger_event(c)}return n.prototype.destroy=function(){var t,n,e;return this.connection_id===(null!=(e=this._dispatcher._conn)?e.connection_id:void 0)&&(n="websocket_rails.unsubscribe",t=new WebSocketRails.Event([n,{data:{channel:this.name}},this.connection_id]),this._dispatcher.trigger_event(t)),this._callbacks={}},n.prototype.bind=function(t,n){var e;return null==(e=this._callbacks)[t]&&(e[t]=[]),this._callbacks[t].push(n)},n.prototype.unbind=function(t){return delete this._callbacks[t]},n.prototype.trigger=function(t,n){var e;return e=new WebSocketRails.Event([t,{channel:this.name,data:n,token:this._token},this.connection_id]),this._token?this._dispatcher.trigger_event(e):this._queue.push(e)},n.prototype.dispatch=function(t,n){var e,s,i,o,c,r;if("websocket_rails.channel_token"===t)return this.connection_id=null!=(o=this._dispatcher._conn)?o.connection_id:void 0,this._token=n.token,this.flush_queue();if(null!=this._callbacks[t]){for(c=this._callbacks[t],r=[],s=0,i=c.length;i>s;s++)e=c[s],r.push(e(n));return r}},n.prototype._success_launcher=function(t){return null!=this.on_success?this.on_success(t):void 0},n.prototype._failure_launcher=function(t){return null!=this.on_failure?this.on_failure(t):void 0},n.prototype.flush_queue=function(){var t,n,e,s;for(s=this._queue,n=0,e=s.length;e>n;n++)t=s[n],this._dispatcher.trigger_event(t);return this._queue=[]},n}()}).call(this);

(function(){
if(window.knowtifyInbox && supports_local_storage()){

	//Vars
	var k = window.knowtifyInbox,
	_body = document.getElementsByTagName('body')[0],
	_messages = document.createElement('div'),
	_content = document.createElement('div'),
	_tooltip = document.createElement('div'),
	_alert_button = document.getElementById(k.alert_button_id),
	_alert_button_count,
	_notification_count,
	screen_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
	screen_height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
	messages_shown = false,
	websocket,
	messages = {};

	//Init
	init_inbox();
	get_messages();
	add_messages();
	//setup_websockets();

	//Events
	//document.getElementById('username_submit').addEventListener("submit", identifyUser);
	_body.addEventListener("click", body_click);
	_alert_button.addEventListener("click", show_hide_messages);
	_messages.addEventListener("click", message_click);
	_content.addEventListener("click", content_click);
}

function setup_websockets(){
	var wsUri = "ws://knowtify-websockets.herokuapp.com/websocket";
	//var wsUri = "ws://localhost:3000/websocket";
	websocket = new WebSocketRails(wsUri);
	websocket.on_open = function(data) {
		//console.log("Socket opened on " + wsUri + " :)");
	};
	websocket.bind('identify', function(data) {
	  	save_messages(data);
	});

	websocket.bind('new_message', function(data) {
	  	console.log(data.message); // would output 'this is a message'
	});
	websocket.bind('chat', addChat);
}

var success = function(response) {
	//console.log("Wow it worked: "+response.message);
}

var failure = function(response) {
	//console.log("That just totally failed: "+response.message);
}

function addChat(message) {
	//console.log('just received new comment: ' + message.text);
}

function identifyUser(e){
	e.preventDefault();
	var message = {
		username: document.getElementById("username").value
	};
	websocket.trigger('identify', message, success, failure);
}

function init_inbox(){
	add_css('http://js.knowtify.io/inbox.css');
	_tooltip.id = 'inbox_tooltip';
	_tooltip.className = 'hide';
	_tooltip.style['display'] = 'none';

	_messages.id = 'inbox_messages';
	_messages.className = 'show';

	_content.id = 'inbox_content';
	_content.className = 'hide';

	var header = document.createElement('div');
	header.id = 'inbox_header';
	var notifications = document.createElement('div');
	notifications.id = "inbox_header_text";
	notifications.innerHTML = "Notifications (<span id='inbox_notifications_count'>0</span>)";
	header.appendChild(notifications);
	var mark_all_read = document.createElement('a');
	mark_all_read.id = "inbox_mark_read";
	mark_all_read.href = "#";
	mark_all_read.innerHTML = "mark all read";
	header.appendChild(mark_all_read);

	mark_all_read.addEventListener("click", mark_all_messages_read);

	var footer = document.createElement('div');
	footer.id = 'inbox_footer';
	footer.innerHTML = "<a target='_blank' href='http://knowtify.io/inbox'>Powered by Knowtify</a>";

	_tooltip.appendChild(header);
	_tooltip.appendChild(_messages);
	_tooltip.appendChild(_content);
	_tooltip.appendChild(footer);

	_body.appendChild(_tooltip);
	_alert_button_count = document.createElement('span');
	_alert_button_count.id = "inbox_message_count";
	_alert_button.appendChild(_alert_button_count);
	_alert_button.style.position = "relative";

	_notification_count = document.getElementById("inbox_notifications_count");

	position_messages();
	add_contact();
}

function supports_local_storage(){
  	try {
    	return 'localStorage' in window && window['localStorage'] !== null;
  	} catch (e) {
    	return false;
  	}
}

function get_messages(){
  	var msg = localStorage.getItem('inbox_messages');
  	if(msg){
  		messages = JSON.parse(msg);
  	}else{
  		localStorage.setItem('inbox_messages', '{}');
  	}

  	var params = "public_token="+k.public_token+"&email="+k.email
  	if(k.contact_id){
  		params += "&contact_id="+k.contact_id
  	}
  	var r = new XMLHttpRequest(); 
	r.open("GET", "https://knowtify-inbox.herokuapp.com/messages?"+params, true);
	r.onreadystatechange = function () {
		if (r.readyState != 4 || r.status != 200) return;
		//console.log(r.requestHeader);
		save_messages(r.responseText);
	};
	r.send("");
}

function save_messages(data){
	var msg = JSON.parse(data).messages || [];
	for(var i=0;i<msg.length;i++){
		var message = msg[i];
		messages[message._id] = message;
		messages[message._id].status = 'unread';
	}

	var count = 0;
	for (var i in messages) {
		if (messages.hasOwnProperty(i)) {
	    	var message = messages[i];
	    	if(message.status == 'unread'){
	    		count++;
	    	}
	    }
	}
	if(count>0){
		_alert_button_count.innerHTML = count;
		_notification_count.innerHTML = count;
	}else{
		_alert_button_count.innerHTML = "0";
		_notification_count.innerHTML = "0";
		_alert_button_count.className = "hide";
	}
	localStorage.setItem('inbox_messages', JSON.stringify(messages));
	//add_messages();
}

function add_messages(){
    var frag = document.createDocumentFragment();
    var unread_count = 0;


    for (var i in messages) {
		if (messages.hasOwnProperty(i)) {
	    	var message = messages[i];
	    	if(message){
	    		var li = document.createElement('li');
	    		li.className = 'message';
	    		li.setAttribute('data-id',i);
	    		if(message.url){
	    			li.setAttribute('data-action','goto');
	    		}else{
	    			li.setAttribute('data-action','content');
	    		}
	    		if(message.status == 'read'){
	    			li.className = 'message read';
	    		}

	    		var a = document.createElement('a');
	    		a.innerHTML = 'x';
	    		a.href = "#";
	    		a.className = "delete";
	    		a.setAttribute('data-action','delete');

	    		var img = document.createElement('img');
	    		img.setAttribute('src',message.image);

	    		var heading = document.createElement('p');
	    		heading.innerHTML = message.heading;
	    		heading.className = "heading";

	    		var description = document.createElement('p');
	    		description.className = "description";
	    		description.innerHTML = message.description;

	    		var timestamp = document.createElement('p');
	    		timestamp.className = 'timestamp';
	    		timestamp.innerHTML = timeSince(message.created_at);

	    		li.appendChild(a);
	    		li.appendChild(img);
	    		li.appendChild(heading);
	    		li.appendChild(description);
	    		li.appendChild(timestamp);
	    		if(message.status == 'unread' && frag.firstChild){
	    			frag.insertBefore(li, frag.firstChild);
	    		}else{
	    			var first_read = frag.querySelector('.message.read');

	    			if(first_read){
	    				frag.insertBefore(li, first_read);
	    			}else{
	    				frag.appendChild(li);
	    			}

	    			/*
	    			var read_list = frag.querySelectorAll('.message.read')
	    			if(read_list.length > 0 && read_list[read_list.length-1].nextSibling){
	    				frag.insertBefore(li, read_list[read_list.length-1].nextSibling);
	    			}else{
	    				frag.appendChild(li);
	    			}
	    			*/
	    		}

	    		if(message.status == 'unread'){
	    			unread_count++;
	    		}
	    	}
		}
	}

	if(unread_count > 0){
		_alert_button_count.className = "show";
		_alert_button_count.innerHTML = unread_count;
	}else{
		_alert_button_count.className = "hide";
	}

	_messages.innerHTML = "";
    _messages.appendChild(frag);
}

function position_messages(){
	var t = _alert_button.offsetTop,
	l = _alert_button.offsetLeft,
	w = _alert_button.offsetWidth,
	h = _alert_button.offsetHeight;

	_tooltip.style['top'] = t+h+10+'px';
	_tooltip.style['height'] = (screen_height-(t+h+35))+'px';
	_messages.style['height'] = (screen_height-(t+h+135))+'px';
	_content.style['height'] = (screen_height-(t+h+135))+'px';

	if((l+520) > screen_width){
		_tooltip.style['left'] = (screen_width - 520)+'px';
	}else{
		_tooltip.style['left'] = l+'px';
	}
}

function show_hide_messages(e){
	//_tooltip.style['display'] = 'block';
	e.preventDefault();
	if(messages_shown){
		_tooltip.className = 'hide';
		messages_shown = false;
	}else{
		_tooltip.className = 'show';
		messages_shown = true;
		//mark_messages_read();
	}
}

function mark_message_read(id){
	messages[id].status = 'read';
	save_messages('{"messages":[]}');
}

function mark_all_messages_read(e){
	var event = e || window.event;
	event.preventDefault();
	for(var i in messages){
		if (messages.hasOwnProperty(i)) {
	    	var message = messages[i];
	    	message.status = 'read';
	    }
	}
	save_messages('{"messages":[]}');
}

function content_click(e){
	var event = e || window.event;
	var target = event.target || event.srcElement;
	var event_action;
	if(target.getAttribute('data-action')){
		event.preventDefault();
		event_action = target.getAttribute('data-action');
	}

	if(event_action == 'back'){
		hide_content();
	}
}

function body_click(e){
	var event = e || window.event;
	var target = event.target || event.srcElement;
	var body_clicked = true;

	var elem = target;
	while(elem.parentNode){
		if(elem.id == 'inbox_tooltip' || elem.id == k.alert_button_id || elem.className == 'delete'){
			body_clicked = false;
		}
		elem = elem.parentNode;
	}

	if(body_clicked && messages_shown){
		_tooltip.className = 'hide';
		messages_shown = false;
	}
}

function message_click(e){
	var event = e || window.event;
	var target = event.target || event.srcElement;
	var event_action;
	event.preventDefault();

	if(target.getAttribute('data-action')){
		event_action = target.getAttribute('data-action');
	}
	
	//walking the dom to get li.message or #inbox_messages
	var message = target;
	while(message.className != 'message' && message.className != 'message read' && message.id != 'inbox_messages'){
		message = message.parentNode;
	}

	if(event_action){
		message_action(event_action,message.getAttribute('data-id'));
	}else{
		message_action(message.getAttribute('data-action'),message.getAttribute('data-id'));
		message.className = 'message read';
	}
}

function message_action(action,id){
	switch (action){
  		case 'delete':
  			delete_message(id);
  			break;
  		case 'content':
  			show_content(id);
  			mark_message_read(id);
  			break;
  		case 'goto':
  			url_redirect(id);
  			mark_message_read(id);
  			break;
	}
}

function delete_message(id){
	delete messages[id];
	add_messages();
	save_messages('{"messages":[]}');
}

function url_redirect(id){
	var message = messages[id];
	window.location.href = message.url;
}

function show_content(id){
	var message = messages[id];
	var content_back = document.createElement('div');
	content_back.id = "content_back";
	var content_back_link = document.createElement('a');
	content_back_link.href = "#";
	content_back_link.setAttribute('data-action','back');
	content_back_link.innerHTML = "Back to messages";
	_content.innerHTML = "";

	content_back.appendChild(content_back_link);
	_content.appendChild(content_back);
	_content.innerHTML += message.content;
	_messages.className = 'hide';
	_content.className = 'show';
}

function hide_content(){
	_messages.className = 'show';
	_content.className = 'hide';
}

function add_css(url){
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('link');
    s.setAttribute('type', 'text/css');
    s.setAttribute('rel', 'stylesheet');
    s.href = url;
    head.appendChild(s);
}

function supports_local_storage(){
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function add_contact(){
	var contact_added = false;
	if(supports_local_storage() && localStorage['inbox_contact']){
		contact_added = localStorage['inbox_contact'];
	}

	if(!contact_added){
		var data = {
			email:k.email
		}
		if(k.contact_id){
			data['id'] = k.contact_id
		}
		var params = {
			token:k.public_token,
			data:data
		}

	    xhr = new XMLHttpRequest();

		xhr.open('POST',
		encodeURI('http://www.knowtify.io/api/v1/contacts/js_add'));
		//xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader("Content-Type","application/json; charset=UTF-8");
		xhr.onload = function() {
		    if (xhr.status === 200 && xhr.responseText !== newName) {
		        alert('Something went wrong.  Name is now ' + xhr.responseText);
		    }
		    else if (xhr.status !== 200) {
		        alert('Request failed.  Returned status of ' + xhr.status);
		    }
		};
		xhr.send(JSON.stringify(params));
		localStorage.setItem('inbox_contact',true);
	}
}

function timeSince(timestamp) {
	if(timestamp){
		var date = new Date(timestamp);
	    var seconds = Math.floor((new Date() - date) / 1000);

	    var interval = Math.floor(seconds / 31536000);

	    if (interval > 1) {
	        return interval + "y ago";
	    }
	    interval = Math.floor(seconds / 2592000);
	    if (interval > 1) {
	        return interval + "mon ago";
	    }
	    interval = Math.floor(seconds / 86400);
	    if (interval > 1) {
	        return interval + "d ago";
	    }
	    interval = Math.floor(seconds / 3600);
	    if (interval > 1) {
	        return interval + "h ago";
	    }
	    interval = Math.floor(seconds / 60);
	    if (interval > 1) {
	        return interval + "m ago";
	    }
	    return Math.floor(seconds) + "s ago";
	}else{
		return "";
	}
}
})();
