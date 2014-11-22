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
		titles: [],
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

			$scope.string = null;
			$scope.result = null;
		}

	}

	$scope.search = function(string){

		$http.get("http://www.omdbapi.com/?s=" + encodeURIComponent(string) + "&r=JSON").success(function(data){

			var videos = data.Search;
			var resultSet = [];

			for(var video in videos){

				$http.get("http://www.omdbapi.com/?i=" + encodeURIComponent(videos[video].imdbID)).success(function(data){
					if(data.Type === "movie" || data.Type === "series")
						resultSet.push(data);
				});
			}

			g = resultSet;

			$scope.result = resultSet;
		});
	};


	g = $scope.user;

});