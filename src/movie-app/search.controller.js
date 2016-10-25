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