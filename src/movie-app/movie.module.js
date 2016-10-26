angular.module('movieApp',['ui.bootstrap','ngRoute','omdb'])
.config(function($routeProvider){
    $routeProvider
    .when('/result',{
        templateUrl : 'result.html',
        controller : 'ResultController'
    })
})