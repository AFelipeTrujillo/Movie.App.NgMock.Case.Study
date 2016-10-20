describe('calculator',function() {
    it('should add two numbers', function(){
        //Expectation
        expect(add(1,2)).toBe(3);
    })
    
    it('should multiply two numbers', function(){
        //Expectation
        expect(multiply(6,4)).toBe(24);
    })
})