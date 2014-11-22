



function search(string){

	var http;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
	  http = new XMLHttpRequest();
	}
	else {// code for IE6, IE5
	  http = new ActiveXObject("Microsoft.XMLHTTP");
	}


	http.open("GET", "http://www.omdbapi.com/?s=" + encodeURIComponent(string) + "&r=JSON", false);
	http.send(null);


	var omdbData = http.responseText;
	var resultSet = JSON.parse(omdbData).Search;

	var videos = [];


	for(var video in resultSet){
		http.open("GET", "http://www.omdbapi.com/?i=" + encodeURIComponent(resultSet[video].imdbID), false);
		http.send(null);

		videos.push(JSON.parse(http.responseText));
	}	

	return videos;

}