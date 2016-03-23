var getVariable = function()
{
    var query = window.location.search.substring(1);
    var name = query.split('=')[1];
    name = name.replace(/[%20]/g, '&nbsp');
    var xmlhttp = new XMLHttpRequest();
	var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+name+"&limit=15&api_key=42f75f939105d2110d6a0daf27db431c&format=json";

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var resultsAPI = JSON.parse(xmlhttp.responseText);
	        show(resultsAPI,name);
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
};

var show = function(resultsAPI,artist){
	var div = document.getElementById('artist');
	if(resultsAPI.artist!==undefined){
		div.innerHTML = div.innerHTML + "<img src='"+resultsAPI.artist.image[4]["#text"]+"'/>";
		div.innerHTML = div.innerHTML + "<h1>"+artist+"</h1>";
		div.innerHTML = div.innerHTML + "<h3>"+resultsAPI.artist.bio.content+"</h3>";
		var i = 0;
		if(resultsAPI.artist.similar.artist.length>0){
			div.innerHTML = div.innerHTML + "<h3>Artistas Similares</h3>";
			for(i;resultsAPI.artist.similar.artist.length>i;i++){
				var artistName = resultsAPI.artist.similar.artist[i].name;
				div.innerHTML = div.innerHTML + "<li><a href='artist.html?artist="+artistName+"'>"+artistName+"</a></li>";
			}
		}
	}else{
		alert('No se encontro informacion del artista');
	}	
};

getVariable();
