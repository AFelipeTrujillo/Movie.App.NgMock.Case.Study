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