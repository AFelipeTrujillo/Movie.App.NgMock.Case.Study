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
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should create popular movie', function(){
        
        /*var expectedData = function(data){
            //dump(angular.mock.dump(data))
            return angular.fromJson(data).movieId === 'tt0076759';
        }*/
        
        // var expectedData = {"movieId":"tt0076759","description":"Greate Movie !"};
        //Regular expression
        var expectedData = /{"movieId":"tt0076759","description":".*"}/;
        
        $httpBackend.expectPOST(/./, expectedData)
        .respond(201);
        
        var popularMovie = new PopularMovies({
            movieId : 'tt0076759',
            description : 'Greate Movie !!!!!'
        });
        
        popularMovie.$save();
        
        expect($httpBackend.flush).not.toThrow();
    });
    
    it('should get popular movie by id', function(){
        $httpBackend.expectGET(function(url){
            //dump(url);
            return true;
        }).respond(200);
        
        PopularMovies.get({ movieId : 'tt0076759'});
        
        expect($httpBackend.flush).not.toThrow();
    });
    
    it('should update popular movie',function(){
        $httpBackend.expectPUT()
        .respond(200);
        
        var popularMovie = new PopularMovies({
            movieId : 'tt0076759',
            description : 'Greate Movie !!!!!'
        });
        
        popularMovie.$update();
        
        expect($httpBackend.flush).not.toThrow();
    });
    
    it('should authenticate requests',function(){
        
        /*var expectedHeaders = function(headers){
            //dump(angular.mock.dump(headers));
            return angular.fromJson(headers).authToken === 'teddybear';
        }*/
        
        var expectedHeaders = {
            "authToken": "teddybear",
            "Accept": "application/json, text/plain, */*"
        }        
        
        $httpBackend.expectGET('popular/tt0076759', expectedHeaders)
        .respond(200);
        
        PopularMovies.get({ movieId : 'tt0076759'});
        
        expect($httpBackend.flush).not.toThrow();
    });
    
    it('should authenticate requests completed way', function(){
        
        var headersData = function(headers){
            return headers.authToken === 'teddybear';
        }
        
        var matchAny = /.*/;
        
        $httpBackend.whenGET(matchAny, headersData)
        .respond(200);
        
        $httpBackend.expectPOST(matchAny, matchAny ,headersData)
        .respond(200);
        
        $httpBackend.expectPUT(matchAny, matchAny, headersData)
        .respond(200);
        
        $httpBackend.expectDELETE(matchAny, headersData)
        .respond(200);
        
        var popularMovie = new PopularMovies({
            movieId : 'tt0076759',
            description : 'Greate Movie !!!!!'
        });
        
        PopularMovies.query();
        PopularMovies.get({ movieId : 'tt0076759'})
        new PopularMovies(popularMovie).$save();
        new PopularMovies(popularMovie).$update();
        new PopularMovies(popularMovie).$remove();
        
        expect($httpBackend.flush).not.toThrow();
    });
})