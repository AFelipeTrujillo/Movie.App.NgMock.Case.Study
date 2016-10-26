angular.module('movieApp',['ui.bootstrap','ngRoute','omdb'])
.config(function($routeProvider){
    $routeProvider
    .when('/result',{
        templateUrl : 'result.html',
        controller : 'ResultController'
    })
})
angular.module('movieApp')
.controller('ResultController', function($scope, $location, omdbApi){
    $scope.results = [];
    //$scope.results.push({ data : { Title : 'Star Wars: Episode IV - A New Hope'} });
    
    $query = $location.search().q;
    
    omdbApi.search($query)
    .then(function(data){
        $scope.results = data.Search;
    })
    .catch(function(){
        $scope.errorMessage = 'Something went wrong!';
    })
})
angular.module('movieApp')
.controller('SearchController' , function($scope, $location){
    $scope.multiple = 2;
    
    $scope.search = function(){
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
})
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
                    return { "Title": "Star Wars", "Year": "1983", "Rated": "N/A", "Released": "01 May 1983", "Runtime": "N/A", "Genre": "Action, Adventure, Sci-Fi", "Director": "N/A", "Writer": "N/A", "Actors": "Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones", "Plot": "N/A", "Language": "English", "Country": "USA", "Awards": "N/A", "Poster": "http://ia.media-imdb.com/images/M/MV5BMWJhYWQ3ZTEtYTVkOS00ZmNlLWIxZjYtODZjNTlhMjMzNGM2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SX300.jpg", "Metascore": "N/A", "imdbRating": "7.9", "imdbVotes": "356", "imdbID": "tt0251413", "Type": "game", "Response": "True" }
                }
            }
        });
    }
)()