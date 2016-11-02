angular.module('movieApp',['ui.bootstrap','ngRoute','omdb', 'movieCore', 'ngMockE2E'])
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
.run(function($httpBackend){
  $httpBackend.whenGET('popular').respond(200, {data : ['tt0133093', 'tt0234215','tt0076759', 'tt0080684', 'tt0086190']});
  $httpBackend.whenGET(/.*/).passThrough();
})
