/*
<script>
	window.knowtifyApi = {
		"public_token":"xxx",
		"action":"new_contact",
		"email":"xxx",
		"name":"xxx",
		"data":{
			"data":{}
		}
	}
</script>
<script src="http://js.knowtify.io/api.js" type="text/javascript" defer></script>
*/

function knowtifyApi(action,k){
	if (typeof jQuery == 'undefined') {
		loadjQuery("http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js", function(){
		    knowtifyRequest(action,k);
		});
	}else{
		knowtifyRequest(action,k);
	}
}

function knowtifyRequest(action,k){
	console.log(action);
	console.log(k);
	//Defaults
	if(k.email && k.public_token){
		if(!k.name){ k.name = ""; }
		if(!k.data){ k.data = {}; }
	}
	var data = {
		name:k.name,
		email:k.email
	}
	if(k.data){
		for (var key in k.data) {
		  	if (k.data.hasOwnProperty(key)) {
		  		data[key] = k.data[key];
		  	}
		}
	}
	var json = {
		token:k.public_token,
		data:data
	}

	var contact_added = false;
	if(supports_local_storage() && localStorage['knowtify_contact']){
		contact_added = localStorage['knowtify_contact'];
	}

	if(k.email && action == "add_contact" && !contact_added){
		$.ajax({
		    type: 'POST',
		    dataType: "json",
		    crossDomain: true,
		    processData: false,
		    contentType: 'application/json',
		    data: JSON.stringify(json),
		    url: "http://www.knowtify.io/api/v1/contacts/js_add",
		    success: function (data) {
		    	//console.log(data);
		    }
		});
		if(supports_local_storage()){
    		localStorage.setItem('knowtify_contact',true);
    	}
	}

	if(k.email && action == "update_contact"){
		json.email = k.email;
		if(k.event){
			json.event = k.event;
		}
		$.ajax({
		    type: 'POST',
		    dataType: "json",
		    crossDomain: true,
		    processData: false,
		    contentType: 'application/json',
		    data: JSON.stringify(json),
		    url: "http://www.knowtify.io/api/v1/contacts/js_update",
		    success: function (data) {
		    	console.log(data);
		    }
		});
	}
}

function loadjQuery(src, callback) {
    var script  = document.createElement("script");
    script.setAttribute("src", src);
    script.addEventListener("load", callback);
    document.head.appendChild(script);
};

function supports_local_storage(){
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}