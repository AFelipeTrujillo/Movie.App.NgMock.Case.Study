describe('Search Controller', function() {
    
    var $scope;
    var $location;
    var $timeout;

    beforeEach(module('movieApp'));
    
    beforeEach(inject(
        function(_$controller_, _$location_, _$timeout_){
            $scope = {};
            $location = _$location_;
            $timeout = _$timeout_;
            _$controller_('SearchController', {
                $scope : $scope, 
                $location: $location,
                $timeout : _$timeout_
            });
        }
    ));
    
    it('should add two numbers', function(){
        var result = $scope.add(2,3);
        expect(result).toBe(5);
    });
    
    it('should redirect to the query result page for non-empty query', function(){
        $scope.query = 'star wars';
        $scope.search();
        dump($location.url());
        expect($location.url()).toBe('/result?q=star%20wars');      
    })
    
    it('should be multiple of three',function(){
        $scope.multiple = 3;
        expect($scope.isMultipleOf(9)).toBe(true)
        expect($scope.isMultipleOf(25)).toBe(false)
    })
    
    it('should redirect after 1 second of keyboard inactivity', function(){
        $scope.query = 'star wars';
        $scope.keyup();
        $timeout.flush();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
        expect($location.url()).toBe('/result?q=star%20wars');
    });
    
    it('should cancel timeout in keydown', function(){
        $scope.query = 'star wars';
        $scope.keyup();
        $scope.keydown();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });
    
    it('should cancel timeout in keydown', function(){
        $scope.query = 'star wars';
        $scope.keyup();
        $scope.search();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });
    
});
    