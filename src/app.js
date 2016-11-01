(
    function(){
        angular.module('omdb',[])
        .factory('omdbApi',function($http){
            var baseURL = 'http://www.omdbapi.com/?v=1&';
            var service = {};

            return {
                search : function(query){
                    return $http.get(baseURL + 's=' + encodeURIComponent(query))
                    .then(function(response){
                        return response.data;
                    })
                },

                find : function(id){
                    return $http.get(baseURL + 'i=' + encodeURIComponent(id))
                    .then(function(response){
                      return response.data;
                    })
                    //return { "Title": "Star Wars", "Year": "1983", "Rated": "N/A", "Released": "01 May 1983", "Runtime": "N/A", "Genre": "Action, Adventure, Sci-Fi", "Director": "N/A", "Writer": "N/A", "Actors": "Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones", "Plot": "N/A", "Language": "English", "Country": "USA", "Awards": "N/A", "Poster": "http://ia.media-imdb.com/images/M/MV5BMWJhYWQ3ZTEtYTVkOS00ZmNlLWIxZjYtODZjNTlhMjMzNGM2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg", "Metascore": "N/A", "imdbRating": "7.9", "imdbVotes": "356", "imdbID": "tt0251413", "Type": "game", "Response": "True" }
                }
            }
        });
    }
)();

(
  function(){
    angular.module('movieCore',['ngResource'])
    .factory('PopularMovies',function($resource){
        var token = 'teddybear';
        return $resource('popular/:movieId', { movieId : '@id' },{
            update : {
                method : 'PUT',
                headers : { 'authToken' : token}
            },
            get : {
                method : 'GET',
                headers : { 'authToken' : token}
            },
            query : {
                method : 'GET',
                headers : { 'authToken' : token}
            },
            save : {
                method : 'POST',
                headers : { 'authToken' : token}
            },
            remove : {
                method : 'DELETE',
                headers : { 'authToken' : token}
            }
        })
    });

  }
)();

angular.module('movieApp',['ui.bootstrap','ngRoute','omdb', 'movieCore'])
.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl : '/movie-app/home.html',
        controller : 'HomeController'
    })
    .when('/result',{
        templateUrl : 'result.html',
        controller : 'ResultController'
    })
})

angular.module('movieApp')
.directive('movieResult', function(){
  return {
    restrict : 'E',
    replace : true,
    scope : {
      result : '=result'
    },
    template :[
      '<div class="row">',
        '<div class="col-sm-4">',
          '<img ng-src="{{result.Poster}}" width="300">',
        '</div>',
        '<div class="col-sm-8">',
          '<h3>{{result.Title}}</h3>',
          '<p><strong>Plot</strong> {{result.Plot}}</p>',
          '<p><strong>Director</strong> {{result.Director}}</p>',
          '<p><strong>Actors</strong> {{result.Actors}}</p>',
          '<p><strong>Released</strong> {{result.Released}}</p>',
          '<p><strong>Genre</strong> {{result.Genre}}</p>',
        '</div>',
      '</div>'
    ].join('')
  }
})

angular.module('movieApp')
.controller('ResultController', function($scope, $location, omdbApi){
    $scope.results = [];
    //$scope.results.push({ data : { Title : 'Star Wars: Episode IV - A New Hope'} });

    $query = $location.search().q;

    $scope.expand = function(index, id){
      omdbApi.find(id)
      .then(function(data){
          $scope.results[index].data = data;
      });
    }

    omdbApi.search($query)
    .then(function(data){
        $scope.results = data.Search;
    })
    .catch(function(){
        $scope.errorMessage = 'Something went wrong!';
    })
})

angular.module('movieApp')
.controller('SearchController' , function($scope, $location, $timeout){
    $scope.multiple = 2;
    var timeout;
    
    $scope.search = function(){
        $timeout.cancel(timeout);
        if($scope.query){
            $location.path('/result').search('q', $scope.query);
        }
    }
    
    $scope.add = function(x,y){
        return x + y;
    }
    
    $scope.isMultipleOf = function(x){
        return x % this.multiple === 0;
    }
    
    $scope.keyup = function(){
        //$location.path('/result').search('q', $scope.query);
        timeout = $timeout($scope.search, 1000);
    }
    
    $scope.keydown = function(){
        $timeout.cancel(timeout);
    }
})
angular.module('movieApp')
.controller('HomeController', function($scope, $interval, omdbApi, PopularMovies){
     var results = [];
     var idx = 0;
     var findMovie = function(id){
       omdbApi.find(id)
       .then(function(data){
         $scope.result = data;
       })
     }

     //PopularMovies.get()
     //.then(function(data){
       var data = ['tt0076759', 'tt0251413', 'tt0086190'];
       results = data;
       findMovie(results[0]);
       $interval(function(){
         ++idx;
         findMovie(results[idx % results.length]);
       },5000)
     //});
})
