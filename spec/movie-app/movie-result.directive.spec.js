describe('Movie Result Directive', function(){

  var result = {
    Poster : 'http://localhost/image.jpg',
    Title : 'Star Wars: Episode IV - A New Hope',
    Director : 'George Lucas',
    Actors : 'Mark Hamill',
    Released : '25 May 1977',
    Genre : 'Action, Adventure, Fantasy'
  }

  var expectHtml = [
      '<div class="col-sm-4">',
        '<img ng-src="http://localhost/image.jpg" width="300" src="http://localhost/image.jpg">',
      '</div>',
      '<div class="col-sm-8">',
        '<h3 class="ng-binding">Star Wars: Episode IV - A New Hope</h3>',
        '<p class="ng-binding"><strong>Plot</strong> </p>',
        '<p class="ng-binding"><strong>Director</strong> George Lucas</p>',
        '<p class="ng-binding"><strong>Actors</strong> Mark Hamill</p>',
        '<p class="ng-binding"><strong>Released</strong> 25 May 1977 (39 years ago)</p>',
        '<p class="ng-binding"><strong>Genre</strong> Action, Adventure, Fantasy</p>',
      '</div>'
  ].join('')

  var $compile;
  var $rootScope;

  beforeEach(module('movieApp'));

  beforeEach(inject(
    function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }
  ));


  it('should output movie result to expected HTML format', function(){
    $rootScope.result = result;
    var element = $compile('<movie-result result="result"></movie-result>')($rootScope);
    $rootScope.$digest();
    //expect(element.html()).toBe('<div class="ng-binding">Star Wars: Episode IV - A New Hope</div>');
    //dump(expectHtml)
    //dump(element.html())
    expect(element.html()).toBe(expectHtml);
    expect($rootScope.$countChildScopes()).toBe(1);
    expect($rootScope.$countWatchers()).toBe(9);
  });
})
