angular.module('movieApp')
.controller('HomeController', function($scope, $interval){
    var result = [
        {
            'Title' : 'Star Wars: Episode IV - A New Hope',
            'imdbID' : 'tt0076759'
        },
        {
            'Title' : 'Star Wars: Episode IV - A New Hope',
            'imdbID' : 'tt0088684'
        },
        {
            'Title' : 'Star Wars: Episode IV - A New Hope',
            'imdbID' : 'tt0086190'
        }
    ]
    
    $scope.result = results[0];
})