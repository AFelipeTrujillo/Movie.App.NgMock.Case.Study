angular.module('movieApp')
.controller('ResultController', function($scope, $location, $exceptionHandler, $log, omdbApi){
    $scope.results = [];
    //$scope.results.push({ data : { Title : 'Star Wars: Episode IV - A New Hope'} });
    $log.info('Info Log');
    $log.error('Error Log');

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
        $log.info('Data returns','star wars',data);
    })
    .catch(function(e){
      $exceptionHandler(e);
      $exceptionHandler('other else !!');
    });
})
