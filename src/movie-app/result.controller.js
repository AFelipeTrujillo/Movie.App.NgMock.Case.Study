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
