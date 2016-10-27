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