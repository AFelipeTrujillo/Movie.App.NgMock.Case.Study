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
    
    beforeEach(module('movieApp'));
    
    beforeEach(inject(function(_$controller_){
        $scope = {};
        _$controller_('HomeController', {
            $scope : $scope,
            $interval : $interval
        });
    }));
    
    it('should rotate movies every 5 secons', function(){
        expect($scope.result.Title).toBe(result[0].Title);
        expect($scope.result.Title).toBe(result[1].Title);
        expect($scope.result.Title).toBe(result[2].Title);
        expect($scope.result.Title).toBe(result[0].Title);
        
    })
    
});