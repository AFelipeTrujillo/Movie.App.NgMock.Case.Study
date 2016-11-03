#Movie App, Case Study in Unit Testing & NgMock

## Introduction
In these days, AngularJS's become in one of the most popular frameworks in order to create single web applications. In other hand, the great popularity of test driven development (tdd) has increased too. As a consequence, the Angular Team created NgMock and KarmaJS which responds to necessity to create unit testing for front end process.

## Context
In the next project, I am going to introduce all the advantages about NgMock and KarmaJS. Because of, I implemented a simple application that uses an Api called *omdbapi* (Movie Database Api) and checked performance all the components around the AngularJS, such as: controllers, directives, components, filters and simulate _http_ request and response with ngMockE2E.

## Model of Testing Block
The next code describes a

```
describe('General Description',function(){
  //expectation data block
  var result = {};
  var html = '<div></div>';

  //Local vars block
  var $controller;
  var $filter;
  var $q;
  var PopularMovies;

  //inject modules block
  beforeEach(module('movieApp'));

  //Inject and beforeEach block
  beforeEach(inject(function(_$controller_, _PopularMovies_){
    $scope = {}
    $controller = _$controller_;
    PopularMovies = _PopularMovies_;
    $controller('MyController', {
        $scope : $scope,
        PopularMovies : _PopularMovies_
    });
  }));

  // 1 to N Testing Blocks
  it('description of task 1', function(){
    expect($scope.greeting).toBe('Hello Controller');
  })
  .
  .
  .
  it('description of task N', function(){

  })
})
```
