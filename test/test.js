var assert = require("assert");

var creditCardNumber = "1111222233334444";

describe('Credit Card', function(){

  describe('the credit card number', function(){
    it('should not be empty', function(){
      assert.notEqual(null, creditCardNumber);
    });

    it('should contain only digits', function(){
      //
    });

  });

});