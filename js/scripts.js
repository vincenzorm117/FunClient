$(function () {
	$('button.trigger').magnificPopup({
	    items: {
	      src: '#statistics'
	    },
	    type: 'inline' // this is default type
	});
    $( "button.trigger" ).click(function() {
    	// years
		var	yeararray = g.user.movieYrs.yList;
		var yeardata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for	(i = 0; i < yeararray.length; i++) {
			if(yeararray[i] < 1930) {
				yeardata[9]++;
			}
			else if(yeararray[i] < 1940) {
				yeardata[8]++;
			}
			else if(yeararray[i] < 1950) {
				yeardata[7]++;
			}
			else if(yeararray[i] < 1960) {
				yeardata[6]++;
			}
			else if(yeararray[i] < 1970) {
				yeardata[5]++;
			}
			else if(yeararray[i] < 1980) {
				yeardata[4]++;
			}
			else if(yeararray[i] < 1990) {
				yeardata[3]++;
			}
			else if(yeararray[i] < 2000) {
				yeardata[2]++;
			}
			else if(yeararray[i] < 2010) {
				yeardata[1]++;
			}
			else {
				yeardata[0]++;
			}
		}
		$('#yearchart').highcharts({
	        chart: {
	            type: 'bar'
	        },
	        title: {
	            text: 'Years'
	        },
	        xAxis: {
	            categories: ['2010s', '2000s', '1990s', '1980s', '1970s', '1960s', '1950s', '1940s', '1930s', '1920s'] /*10*/
	        },
	        yAxis: {
	            title: {
	                text: 'Movies Watched'
	            }
	        },
	        series: [{
	            name: 'You',
	            data: yeardata
	        }]
	    });

		$( ".ul_director" ).empty();
	    // popular directors

	    for(var y in g.user.directors) {
	    	// alert(g.user.posters.pList[y].Director);
	    	$( ".ul_director" ).append( "<p>"+y+"</p>" );
	    }

	    var categories = {};

	    for(var i in g.user.categories){
	    	categories[i] = g.user.categories[i].list.length;
	    }

	    var keys = [];
	    for(var i in categories){
	    	keys.push(i);
	    }

	    keys.sort(function(a,b){ return categories[a] < categories[b]; });


	    $( ".ul_categories" ).empty();

	    // popular genres
	    for(var i in keys) {
	    	// alert(g.user.posters.pList[i].Genre);
	    	// var genrerank = [[][]];
	    	$( ".ul_categories" ).append( "<li>"+keys[i]+"</li>" );

	    }
	});
});