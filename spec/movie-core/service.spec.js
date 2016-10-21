describe('MovieCore', function(){
    var PopularMovies;
    var $httpBackend;
    
    beforeEach(module('movieCore'));
    
    beforeEach(inject(function(_PopularMovies_, _$httpBackend_) {
        PopularMovies = _PopularMovies_;
        $httpBackend = _$httpBackend_;
    }));
    
    //Verifies that all of the requests defined via the expect api were made. 
    //If any of the requests were not made, verifyNoOutstandingExpectation throws an exception.
    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
    });
    
    it('shoul create popular movie', function(){
        var popularMovie = new PopularMovies({
            movieId : 'tt0076759',
            description : 'Greate Movie !'
        });
        
        popularMovie.$save();
    })
})