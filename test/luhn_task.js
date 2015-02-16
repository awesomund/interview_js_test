// This is an alternative credit card validation case, using the Luhn-formula:
//
// Implement each of the following steps as its own method (using TDD), and then refactor them into one final validator method:

// Some input validation requirements:
// a) The credit card should not be null
// b) The credit card number should only contain digits
// c) The credit card number should contain 13 or more digts
// d) The credit card number should contain 16 or less digts

// Luhn algorithm:
// 1. Drop the last digit from the number. The last digit is what we want to check against
// 2. Reverse the numbers
// 3. Multiply all even-indexed digits (including 0) by 2 and subtract 9 if the result is greater than 9. Positions are 0-indexed.
// 4. Add all the numbers together
// 5. The check digit (the last number of the card) is the amount that you would need to add to get a multiple of 10 (Modulo 10)

var assert = require("assert");

var creditCardNumber = "4556705936228745";

// for less headache during assignment:
var reverseCreditCardNumber = '5478226395076554';
var doubleEvenIndexedDigitsNumber = '8516501966427785';

// input validation methods

var isNotNull = function(creditCardNumber){
	return creditCardNumber !== null;
};

// Luhn methods

//Tests

describe('Credit Card Validation', function(){

	describe('the credit card number', function(){
		it('should not be empty', function(){
			assert.equal(isNotNull(creditCardNumber), true);
		});
	});

});