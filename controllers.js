var g;
var yearsarray;

var myApp = angular.module('Movies', []);


myApp.controller('MovieController', function MovieController($scope, $http){


	$scope.string = null;

	$scope.user = {
		time: {
			timeMin:0,
			add: function (time){
				if(typeof(time) === "number"){
					this.timeMin += time;
				}
			},
			sub: function(time){
				if(typeof(time)==="number"){
					this.timeMin -= time;
				}
			},
			Min: function(){
				return this.timeMin % 60;
			},
			Hour: function(){
				return Math.floor(this.timeMin / 60) % 24;
			},
			Day: function(){
				return Math.floor(this.timeMin / 1440);
			}
		},
		categories: {},
		posters: {pList: []},
		movieYrs: {yList: []},
		titles: {},
		directors: {},
		age: {
			ageYears:1,
			setAgeYears: function(age){
				if(isNaN(age) || age === 0 || age < 0 || age > 122){
					this.ageYears = 1;
				}
				else {
					ageYears = age;
				}
			}
		},
		totalPercent: function () {
			return this.time.timeMin / (this.age.ageYears * 525949);
		},
		avegPercent: function () {
			return this.totalPercent() / this.age.ageYears;
		}

	}

	$scope.addMovie = function(movie){

		var id = movie.imdbID;

		if(typeof($scope.user.titles[id]) === 'undefined'){

			$scope.user.titles[id] = id;

			//Extract movie Genres from movie object
			var cats = movie.Genre.replace(/ /g,'').split(',');
			//Add movie to categories
			for(var cat in cats){

				if(typeof($scope.user.categories[cats[cat]]) === "undefined")
					$scope.user.categories[cats[cat]] = {
						title: cats[cat],
						list: []
					};

				$scope.user.categories[cats[cat]].list.push(movie);
			}

			$scope.user.directors[movie.Director] = null;

			$scope.user.posters.pList.push(movie);

			if(movie.Year > 1900) {
				$scope.user.movieYrs.yList.push(movie.Year);
			}

			//Extract runtime from movie
			var num = parseInt(movie.Runtime.replace(/ min/g,''));

			//Add runtime to users total time

			if(!isNaN(num))  {
				$scope.user.time.add(num);
			}

			// $scope.string = null;
			// $scope.result = null;
		}

	}

	$scope.removeMovie = function(movie){
		var id = movie.imdbID;

		if(typeof($scope.user.titles[id]) !== 'undefined'){

			var cats = movie.Genre.replace(/ /g,'').split(',');

			for(var cat in cats){
				if(typeof($scope.user.categories[cats[cat]])!=='undefined'){
					var index = $scope.user.categories[cats[cat]].list.indexOf(movie);
					if(index != -1){
						$scope.user.categories[cats[cat]].list.splice(index,1);
					}
				}
			}

			if(typeof($scope.user.posters.pList) !=='undefined'){
				var indexP = $scope.user.posters.pList.indexOf(movie);
				if(indexP != -1){
					$scope.user.posters.pList.splice(indexP,1);
				}
			}
			if(movie.Year > 1900) {
				var indexY = $scope.user.movieYrs.yList.indexOf(movie.Year);
				$scope.user.movieYrs.yList.splice(indexY, 1);
			}

			//Extract runtime from movie
			var num = parseInt(movie.Runtime.replace(/ min/g,''));

			//Add runtime to users total time

			if(!isNaN(num))  {
				$scope.user.time.sub(num);
			}
			delete $scope.user.titles[id];
		}
	}

	$scope.search = function(string){

		$http.get("http://www.omdbapi.com/?s=" + encodeURIComponent(string) + "&r=JSON").success(function(data){

			var videos = data.Search;
			var resultSet = [];

			for(var video in videos){

				if( $scope.user.titles[videos[video].imdbID])
					continue;


				$http.get("http://www.omdbapi.com/?i=" + encodeURIComponent(videos[video].imdbID)).success(function(data){
					if(data.Type === "movie" || data.Type === "series"){
						// console.log(data);
						resultSet.push(data);
					}
				});
			}

			// g = resultSet;
			g = $scope;

			$scope.result = resultSet;
		});
	};


	g = $scope.user;

});