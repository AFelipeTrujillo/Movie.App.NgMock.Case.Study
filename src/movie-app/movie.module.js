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
