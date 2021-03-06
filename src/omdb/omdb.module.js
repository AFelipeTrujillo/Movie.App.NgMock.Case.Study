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
