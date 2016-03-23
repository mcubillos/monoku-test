
var artistRoutes = crossroads.addRoute("artist/{name}",function(name){
	goToArtist(name);
});

var default_routes = crossroads.addRoute("/{source}",function(source){
	goToPage(source);
});

var search = function(name){
	var xmlhttp = new XMLHttpRequest();
	var url = "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+name+"&limit=15&api_key=42f75f939105d2110d6a0daf27db431c&format=json";

	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        var resultsAPI = JSON.parse(xmlhttp.responseText);
	        show(resultsAPI);
	    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
};
var goToArtist = function(artistInfo){
	console.log('hola');
	window.location.href = "artist.html?artist='"+artistInfo+"'";
};
var show = function(resultsAPI){
	var table = document.getElementById("results");
	var i = 0;
	for (i;resultsAPI.results["opensearch:itemsPerPage"]>i;i++){
		var artistName = resultsAPI.results.artistmatches.artist[i].name;
		var row = table.insertRow(0);
	    var cell1 = row.insertCell(0);
	    var cell2 = row.insertCell(1);
	    cell1.innerHTML = "<img src='"+resultsAPI.results.artistmatches.artist[i].image[0]["#text"]+"'/>";
	    cell2.innerHTML = '<li><a href="artist.html?artist='+artistName+'">'+artistName+'</a></li>' ;
	}
};



