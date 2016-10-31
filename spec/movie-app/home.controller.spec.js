describe('Home Controller', function(){

    var result = [
        {
            'Title' : 'Star Wars: Episode IV - A New Hope',
            'imdbID' : 'tt0076759'
        },
        {
            'Title' : 'Star Wars: Episode IV - A New Hope',
            'imdbID' : 'tt0088684'
        },
        {
            'Title' : 'Star Wars: Episode IV - A New Hope',
            'imdbID' : 'tt0086190'
        }
    ]
    var $scope;
    var $interval;
    var $controller;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$q_, _PopularMovies_){
        spyOn(_PopularMovies_, 'get').and.callFake(function(){
          var deferred = _$q_.defer();
          deferred.resolve(['tt0076759', 'tt0088684', 'tt0086190']);
          return deferred.promise;
        })
    }))

    beforeEach(inject(function(_$q_, _omdbApi_){
        spyOn(_omdbApi_, 'find').and.callFake(function(){
          var deferred = _$q_.defer();
          var args = _omdbApi_.find.calls.mostRecent().args[0];

          if(args === 'tt0076759'){
            deferred.resolve(result[0])
          }else if(args === 'tt0088684'){
            deferred.resolve(result[0])
          }else if(args === 'tt0086190'){
            deferred.resolve(result[0])
          }else{
            deferred.reject();
          }

          return deferred.promise;
        })
    }))

    beforeEach(inject(function(_$controller_, _$interval_, _$rootScope_ ,_omdbApi_, _PopularMovies_){
        $scope = {};
        $interval = _$interval_;
        $controller = _$controller_;
        $controller('HomeController', {
            $scope : $scope,
            $interval : _$interval_,
            omdbApi : _omdbApi_,
            PopularMovies : _PopularMovies_
        });

        _$rootScope_.$apply();
    }));

    it('should rotate movies every 5 secons', function(){

        expect($scope.result.Title).toBe(result[0].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(result[1].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(result[2].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(result[0].Title);

    })

});
